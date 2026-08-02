// Pure validation for the generateImage callable.
//
// Like captionRequest, this is free of Firestore, Storage, and
// firebase-functions so it can be unit-tested directly: it turns the untrusted
// client payload into the ImageInput the ImageProvider needs, or throws an
// ImageValidationError the callable maps to "invalid-argument".

import type { ImageInput } from "./types.js";
import { SUPPORTED_THEMES } from "./captionRequest.js";

/** Upper bounds on the rendered text fields, in characters. */
export const MAX_HEADLINE_LENGTH = 120;
export const MAX_SUBTEXT_LENGTH = 200;

/** Brand-kit fields the image composition uses. Passed in the request. */
export interface ImageBrandKit {
  businessName?: string;
  businessCategory?: string;
}

/** The untrusted generateImage payload, before validation. */
export interface RawImageRequest {
  theme?: unknown;
  headline?: unknown;
  subtext?: unknown;
  brandKit?: unknown;
}

/** Thrown when the request fails validation. Mapped to invalid-argument. */
export class ImageValidationError extends Error {
  /** @param {string} message user-facing reason the request was rejected. */
  constructor(message: string) {
    super(message);
    this.name = "ImageValidationError";
  }
}

/**
 * Validates the request and shapes it into the provider's {@link ImageInput}.
 * `theme` is required and must be supported; `headline`/`subtext` are optional
 * length-capped text; the brand kit contributes business name/category.
 * @param {RawImageRequest} raw untrusted client payload.
 * @return {ImageInput} the validated, provider-ready input.
 */
export function resolveImageInput(raw: RawImageRequest): ImageInput {
  const theme = SUPPORTED_THEMES.find((t) => t === raw.theme);
  if (!theme) {
    throw new ImageValidationError(
      `A valid theme is required (${SUPPORTED_THEMES.join(", ")}).`,
    );
  }

  const headline = optionalText(raw.headline, MAX_HEADLINE_LENGTH, "Headline");
  const subtext = optionalText(raw.subtext, MAX_SUBTEXT_LENGTH, "Subtext");
  const brand = normalizeBrandKit(raw.brandKit);

  return {
    theme,
    headline,
    subtext,
    businessName: brand.businessName,
    businessCategory: brand.businessCategory,
  };
}

/**
 * @param {unknown} value candidate text field.
 * @param {number} maxLength maximum allowed length.
 * @param {string} label human-readable field name for error messages.
 * @return {string | undefined} trimmed text, or undefined when empty/missing.
 */
function optionalText(
  value: unknown,
  maxLength: number,
  label: string,
): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "string") {
    throw new ImageValidationError(`${label} must be text.`);
  }
  const trimmed = value.trim();
  if (trimmed.length > maxLength) {
    throw new ImageValidationError(
      `${label} must be ${maxLength} characters or fewer.`,
    );
  }
  return trimmed || undefined;
}

/**
 * Extracts the string brand-kit fields the image uses, ignoring anything else
 * on the (untrusted) object.
 * @param {unknown} raw the request's brandKit field, if any.
 * @return {ImageBrandKit} normalized brand-kit fields.
 */
function normalizeBrandKit(raw: unknown): ImageBrandKit {
  if (typeof raw !== "object" || raw === null) return {};
  const source = raw as Record<string, unknown>;
  return {
    businessName: trimmedString(source.businessName),
    businessCategory: trimmedString(source.businessCategory),
  };
}

/**
 * @param {unknown} value candidate value.
 * @return {string | undefined} trimmed non-empty string, else undefined.
 */
function trimmedString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}
