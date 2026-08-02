// Pure validation + brand-kit resolution for the generateCaption callable.
//
// This is deliberately free of Firestore and firebase-functions so it can be
// unit-tested directly: given the raw client request and the user's brand kit,
// it produces the fully-shaped CaptionInput the TextProvider needs — or throws
// a CaptionValidationError the callable maps to an "invalid-argument" error.

import type { CaptionInput, Language, Theme } from "./types.js";

/** Supported caption languages (runtime mirror of the {@link Language} union). */
export const SUPPORTED_LANGUAGES: readonly Language[] = [
  "Filipino",
  "Taglish",
  "English",
];

/** Supported content themes (runtime mirror of the {@link Theme} union). */
export const SUPPORTED_THEMES: readonly Theme[] = [
  "promo",
  "announcement",
  "holiday",
  "tips",
  "general",
  "product",
];

/** Language used when neither the request nor the brand kit specifies one. */
export const DEFAULT_LANGUAGE: Language = "Filipino";

/** Upper bound on the optional free-text context, in characters. */
export const MAX_CONTEXT_LENGTH = 600;

/**
 * The brand-kit fields read from `users/{uid}` that drive a caption. All
 * optional — a caller with an incomplete profile still gets a caption.
 */
export interface BrandKit {
  businessName?: string;
  businessCategory?: string;
  brandTone?: string;
  /** The user's default caption language, chosen at sign-up. */
  language?: string;
}

/** The untrusted callable payload, before validation. */
export interface RawCaptionRequest {
  theme?: unknown;
  language?: unknown;
  context?: unknown;
}

/** Thrown when the client request fails validation. Mapped to invalid-argument. */
export class CaptionValidationError extends Error {
  /** @param {string} message user-facing reason the request was rejected. */
  constructor(message: string) {
    super(message);
    this.name = "CaptionValidationError";
  }
}

/**
 * Validates the client request and merges it with the user's brand kit into the
 * CaptionInput the TextProvider consumes.
 *
 * - `theme` is required and must be a supported theme.
 * - `language` is optional: an explicit valid selection wins; otherwise the
 *   brand kit's default language is used; otherwise {@link DEFAULT_LANGUAGE}.
 *   An explicit but unsupported language is rejected.
 * - `context` is optional free text, trimmed and length-capped.
 * - business name / category / tone come from the brand kit.
 *
 * @param {RawCaptionRequest} raw untrusted client payload.
 * @param {BrandKit} brandKit brand-kit fields loaded from Firestore.
 * @return {CaptionInput} the validated, provider-ready input.
 */
export function resolveCaptionInput(
  raw: RawCaptionRequest,
  brandKit: BrandKit,
): CaptionInput {
  const theme = SUPPORTED_THEMES.find((t) => t === raw.theme);
  if (!theme) {
    throw new CaptionValidationError(
      `A valid theme is required (${SUPPORTED_THEMES.join(", ")}).`,
    );
  }

  const language = resolveLanguage(raw.language, brandKit.language);
  const context = resolveContext(raw.context);

  return {
    theme,
    language,
    businessName: brandKit.businessName?.trim() || undefined,
    businessCategory: brandKit.businessCategory?.trim() || undefined,
    brandTone: brandKit.brandTone?.trim() || undefined,
    context,
  };
}

/**
 * @param {unknown} requested explicit language from the request, if any.
 * @param {string | undefined} brandKitLanguage the brand kit's default language.
 * @return {Language} the resolved language.
 */
function resolveLanguage(
  requested: unknown,
  brandKitLanguage: string | undefined,
): Language {
  // No explicit selection: fall back to the brand kit's default, then the
  // global default. A blank/whitespace selection is treated as "none".
  if (
    requested === undefined ||
    requested === null ||
    (typeof requested === "string" && requested.trim() === "")
  ) {
    return (
      SUPPORTED_LANGUAGES.find((l) => l === brandKitLanguage) ?? DEFAULT_LANGUAGE
    );
  }

  const selected = SUPPORTED_LANGUAGES.find((l) => l === requested);
  if (!selected) {
    throw new CaptionValidationError(
      `Unsupported language. Choose one of: ${SUPPORTED_LANGUAGES.join(", ")}.`,
    );
  }
  return selected;
}

/**
 * @param {unknown} raw the request's context field, if any.
 * @return {string | undefined} trimmed context, or undefined when empty.
 */
function resolveContext(raw: unknown): string | undefined {
  if (raw === undefined || raw === null) return undefined;
  if (typeof raw !== "string") {
    throw new CaptionValidationError("Context must be text.");
  }
  const trimmed = raw.trim();
  if (trimmed.length > MAX_CONTEXT_LENGTH) {
    throw new CaptionValidationError(
      `Context must be ${MAX_CONTEXT_LENGTH} characters or fewer.`,
    );
  }
  return trimmed || undefined;
}
