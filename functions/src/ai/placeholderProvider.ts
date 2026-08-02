// Vendor-free provider implementations used as the default while real text/image
// vendors are undecided. The text provider serves human-reviewed copy from the
// content bank; the image provider renders a self-contained SVG placeholder as a
// `data:` URI (no network, no storage bucket, no vendor key). Together they let
// the generation pipeline run end-to-end today.

import { contentBank } from "./contentBank.js";
import type {
  CaptionInput,
  CaptionResult,
  ImageInput,
  ImageProvider,
  ImageResult,
  Language,
  TextProvider,
  Theme,
} from "./types.js";

const DEFAULT_LANGUAGE: Language = "Filipino";
const DEFAULT_THEME: Theme = "general";

/**
 * Personalizes reviewed copy with the caller's brand kit. `[BizName]` and
 * `[Category]` tokens are replaced with the business name/category (mirroring the
 * client's `[BizName]` convention in Generate.vue). Tokens whose brand-kit value
 * is absent are left untouched rather than replaced with a blank.
 * @param {string} text reviewed copy that may contain brand-kit tokens.
 * @param {object} brand brand-kit fields (businessName, businessCategory).
 * @return {string} the copy with any known tokens filled in.
 */
export function applyBrandKit(
  text: string,
  brand: { businessName?: string; businessCategory?: string },
): string {
  let out = text;
  if (brand.businessName) out = out.replace(/\[BizName\]/g, brand.businessName);
  if (brand.businessCategory) {
    out = out.replace(/\[Category\]/g, brand.businessCategory);
  }
  return out;
}

/** Serves pre-written captions from the content bank. */
export class PlaceholderTextProvider implements TextProvider {
  readonly id = "placeholder";

  /**
   * @param {CaptionInput} input caption request.
   * @return {Promise<CaptionResult>} pre-written copy for the language/theme,
   *   personalized with the brand kit and folding in any user context.
   */
  async generateCaption(input: CaptionInput): Promise<CaptionResult> {
    const byLang = contentBank[input.language] ?? contentBank[DEFAULT_LANGUAGE];
    const variants = byLang[input.theme] ?? byLang[DEFAULT_THEME];
    const base = variants[0];

    // Personalize the reviewed copy with the brand kit (name/category). The
    // canned bank is generic today, so this is a no-op until branded copy with
    // tokens exists — but it keeps the brand kit flowing through to output.
    const brand = {
      businessName: input.businessName,
      businessCategory: input.businessCategory,
    };
    const headline = applyBrandKit(base.h, brand);
    const subtext = applyBrandKit(base.s, brand);
    const body = applyBrandKit(base.c, brand);

    // Fold any user-supplied context into the caption so callers can see their
    // input flow through the pipeline. Headline/subtext stay as the reviewed copy.
    const detail = input.context?.trim();
    const caption = detail ? `${body}\n\n${detail}` : body;

    return { caption, headline, subtext };
  }
}

// Per-theme background gradient for the placeholder art, so different themes are
// visually distinguishable at a glance.
const THEME_GRADIENT: Record<Theme, [string, string]> = {
  promo: ["#f97316", "#db2777"],
  announcement: ["#2563eb", "#7c3aed"],
  holiday: ["#dc2626", "#16a34a"],
  tips: ["#0891b2", "#2563eb"],
  general: ["#6366f1", "#8b5cf6"],
  product: ["#f59e0b", "#ef4444"],
};

/**
 * Escapes text for safe inclusion in SVG markup.
 * @param {string} value raw text.
 * @return {string} XML-escaped text.
 */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Renders a 1080×1080 SVG placeholder and returns it as a base64 `data:` URI —
 * a self-contained, valid image URL with no external dependency.
 */
export class PlaceholderImageProvider implements ImageProvider {
  readonly id = "placeholder";

  /**
   * @param {ImageInput} input image request.
   * @return {Promise<ImageResult>} an SVG placeholder as a base64 data URI.
   */
  async generateImage(input: ImageInput): Promise<ImageResult> {
    const [from, to] = THEME_GRADIENT[input.theme] ?? THEME_GRADIENT[DEFAULT_THEME];
    const title = escapeXml(input.businessName?.trim() || "Your Business");
    const subtitle = escapeXml(input.businessCategory?.trim() || "PostAI");
    const themeLabel = escapeXml(input.theme.toUpperCase());

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  <text x="540" y="470" fill="#ffffff" font-family="Arial, sans-serif" font-size="72" font-weight="bold" text-anchor="middle">${title}</text>
  <text x="540" y="560" fill="#ffffffcc" font-family="Arial, sans-serif" font-size="40" text-anchor="middle">${subtitle}</text>
  <text x="540" y="960" fill="#ffffffaa" font-family="Arial, sans-serif" font-size="28" letter-spacing="4" text-anchor="middle">${themeLabel} · PLACEHOLDER IMAGE</text>
</svg>`;

    const base64 = Buffer.from(svg, "utf8").toString("base64");
    return { imageUrl: `data:image/svg+xml;base64,${base64}` };
  }
}
