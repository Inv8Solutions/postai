// AI provider abstraction for PostAI (M2).
//
// Vendors for text (caption) and image generation are undecided, so the
// generation pipeline talks to these interfaces rather than to any concrete
// SDK. A config-selected factory (see ./index.ts) picks the implementation at
// runtime; the default is the vendor-free PlaceholderProvider so the whole
// pipeline is testable end-to-end today.
//
// To add a real vendor, implement one (or both) of these interfaces and
// register it in the factory — no call site changes. See docs/ai.md.

/** Supported caption languages. Mirrors the client's language selector. */
export type Language = "Filipino" | "Taglish" | "English";

/**
 * Content theme driving both caption tone and image mood. Mirrors the theme
 * options offered on the client's /generate flow.
 */
export type Theme =
  | "promo"
  | "announcement"
  | "holiday"
  | "tips"
  | "general"
  | "product";

/** Everything a TextProvider needs to write a caption. */
export interface CaptionInput {
  /** Language to write the caption in. */
  language: Language;
  /** Content theme (promo, announcement, …). */
  theme: Theme;
  /** Business name, used for personalization. Optional. */
  businessName?: string;
  /** Business category (e.g. "Resto-Bar"). Optional. */
  businessCategory?: string;
  /** Brand voice from the brand kit (e.g. "Friendly", "Professional"). Optional. */
  brandTone?: string;
  /** Free-form details the user wants included (e.g. "10% off until Sunday"). */
  context?: string;
}

/** The shaped caption a TextProvider returns. */
export interface CaptionResult {
  /** Full post caption/body, ready to publish. */
  caption: string;
  /** Short headline for the post image/preview. */
  headline: string;
  /** Supporting subtext line under the headline. */
  subtext: string;
}

/**
 * Generates post captions. Implementations must return the full {@link
 * CaptionResult} shape; callers depend on all three fields being present.
 */
export interface TextProvider {
  /** Stable id used for provider selection/logging (e.g. "placeholder"). */
  readonly id: string;
  generateCaption(input: CaptionInput): Promise<CaptionResult>;
}

/** Everything an ImageProvider needs to produce an image. */
export interface ImageInput {
  /** Content theme, used to pick mood/subject. */
  theme: Theme;
  /** Headline to render prominently on the art. Optional. */
  headline?: string;
  /** Supporting subtext rendered under the headline. Optional. */
  subtext?: string;
  /** Business name, rendered onto placeholder art / used in prompts. Optional. */
  businessName?: string;
  /** Business category. Optional. */
  businessCategory?: string;
  /** Free-form art-direction prompt. Optional. */
  prompt?: string;
}

/**
 * The shaped image an ImageProvider returns: the raw bytes plus enough metadata
 * to persist them. The provider only *renders* the image — uploading it to
 * storage and minting a URL is the caller's job (see functions/src/storage.ts),
 * so the same storage/URL policy applies no matter which vendor produced the
 * bytes.
 */
export interface ImageResult {
  /** Raw image bytes to persist. */
  data: Buffer;
  /** MIME type of {@link data}, e.g. "image/svg+xml" or "image/png". */
  contentType: string;
  /** File extension (no dot) matching {@link contentType}, e.g. "svg", "png". */
  extension: string;
}

/**
 * Renders post images. Implementations return the raw image bytes; a real vendor
 * would call its API and return the downloaded bytes, while the placeholder
 * renders a self-contained SVG. Persistence (upload + URL) happens at the call
 * site, not here.
 */
export interface ImageProvider {
  /** Stable id used for provider selection/logging (e.g. "placeholder"). */
  readonly id: string;
  generateImage(input: ImageInput): Promise<ImageResult>;
}
