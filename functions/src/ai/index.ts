// Config-selected factory for the AI providers.
//
// Provider choice is a deploy-time config value, not a code change:
//
//   AI_TEXT_PROVIDER   selects the TextProvider  (default "placeholder")
//   AI_IMAGE_PROVIDER  selects the ImageProvider (default "placeholder")
//
// Set them like any other Functions param, e.g. in functions/.env:
//   AI_TEXT_PROVIDER=placeholder
//   AI_IMAGE_PROVIDER=placeholder
//
// To add a real vendor: implement TextProvider/ImageProvider and register it in
// the maps below. Nothing at the call sites changes. See docs/ai.md.

import { defineString } from "firebase-functions/params";
import {
  PlaceholderImageProvider,
  PlaceholderTextProvider,
} from "./placeholderProvider.js";
import type { ImageProvider, TextProvider } from "./types.js";

export * from "./types.js";
export {
  PlaceholderImageProvider,
  PlaceholderTextProvider,
} from "./placeholderProvider.js";

const textProviderId = defineString("AI_TEXT_PROVIDER", {
  default: "placeholder",
});
const imageProviderId = defineString("AI_IMAGE_PROVIDER", {
  default: "placeholder",
});

// Registries. Each entry is a factory so providers are only constructed when
// selected — a real vendor's client (with its API key wiring) never initializes
// unless it's the configured choice.
const textProviders: Record<string, () => TextProvider> = {
  placeholder: () => new PlaceholderTextProvider(),
};

const imageProviders: Record<string, () => ImageProvider> = {
  placeholder: () => new PlaceholderImageProvider(),
};

/**
 * Returns the configured TextProvider, defaulting to the placeholder.
 * @return {TextProvider} the provider selected by AI_TEXT_PROVIDER.
 */
export function getTextProvider(): TextProvider {
  const id = textProviderId.value() || "placeholder";
  const factory = textProviders[id];
  if (!factory) {
    throw new Error(
      `Unknown AI_TEXT_PROVIDER "${id}". Known: ${Object.keys(textProviders).join(", ")}.`,
    );
  }
  return factory();
}

/**
 * Returns the configured ImageProvider, defaulting to the placeholder.
 * @return {ImageProvider} the provider selected by AI_IMAGE_PROVIDER.
 */
export function getImageProvider(): ImageProvider {
  const id = imageProviderId.value() || "placeholder";
  const factory = imageProviders[id];
  if (!factory) {
    throw new Error(
      `Unknown AI_IMAGE_PROVIDER "${id}". Known: ${Object.keys(imageProviders).join(", ")}.`,
    );
  }
  return factory();
}
