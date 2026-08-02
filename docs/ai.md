# AI generation providers

How PostAI generates a post's **caption** and **image** (M2). Vendors are
undecided, so generation runs against two small interfaces rather than any
concrete SDK. A config-selected factory picks the implementation at runtime; the
default is a vendor-free **placeholder** so the whole pipeline is testable
end-to-end today.

All of this lives in the Functions workspace under
[`functions/src/ai/`](../functions/src/ai/) and runs server-side.

## Overview

```
generatePost (callable)
      │
      ├─ getTextProvider()  ──▶ TextProvider.generateCaption(input)  ──▶ { caption, headline, subtext }
      └─ getImageProvider() ──▶ ImageProvider.generateImage(input)   ──▶ { imageUrl }
```

- **`TextProvider.generateCaption(input)`** → `Promise<{ caption, headline, subtext }>`
- **`ImageProvider.generateImage(input)`** → `Promise<{ imageUrl }>`

The interfaces and their input/output shapes are defined in
[`functions/src/ai/types.ts`](../functions/src/ai/types.ts). Call sites depend
only on those shapes — never on a specific vendor.

## Files

| File | Purpose |
| ---- | ------- |
| [`ai/types.ts`](../functions/src/ai/types.ts) | `TextProvider` / `ImageProvider` interfaces and the `CaptionInput` / `CaptionResult` / `ImageInput` / `ImageResult` shapes. |
| [`ai/contentBank.ts`](../functions/src/ai/contentBank.ts) | Pre-written copy keyed by language → theme. Mirror of the client's offline preview bank. |
| [`ai/placeholderProvider.ts`](../functions/src/ai/placeholderProvider.ts) | `PlaceholderTextProvider` (serves the content bank) and `PlaceholderImageProvider` (renders a self-contained SVG `data:` URI). |
| [`ai/index.ts`](../functions/src/ai/index.ts) | The config-selected factory: `getTextProvider()` / `getImageProvider()` and the provider registries. |

## Configuration

Provider choice is a deploy-time config value — **not** a code change:

| Param | Selects | Default |
| ----- | ------- | ------- |
| `AI_TEXT_PROVIDER` | the `TextProvider` | `placeholder` |
| `AI_IMAGE_PROVIDER` | the `ImageProvider` | `placeholder` |

Set them like any other Functions param, e.g. in `functions/.env` (see
[`functions/.env.example`](../functions/.env.example)):

```
AI_TEXT_PROVIDER=placeholder
AI_IMAGE_PROVIDER=placeholder
```

An unrecognized id throws at generation time with the list of known ids, so a
typo fails loudly rather than silently degrading.

## Callables

Two callables drive generation; both require an authenticated caller and pick
their providers from the config above.

- **`generatePost`** — caption **and** image in one call. Business fields
  (`businessName`, `businessCategory`) come from the request. Validates
  `language` + `theme`; does not persist a post or spend credits.
- **`generateCaption`** — caption only, returning `{ caption, headline,
  subtext }`. Takes `{ theme, language?, context? }` from the request and reads
  the caller's **brand kit** (`businessName`, `businessCategory`, `brandTone`,
  default `language`) from `users/{uid}` — the tone/category/name that drive the
  copy come from the profile saved at sign-up, not the request. `language`
  falls back to the brand kit's default, then Filipino. Input validation and a
  basic per-user rate limit live in
  [`ai/captionRequest.ts`](../functions/src/ai/captionRequest.ts) /
  [`rateLimiter.ts`](../functions/src/rateLimiter.ts); both are covered by
  `node --test` unit tests (`npm test` in `functions/`).

## The placeholder provider

The default, and what makes the pipeline runnable with **no vendor keys**:

- **Text** — `PlaceholderTextProvider` returns human-reviewed copy from the
  content bank, keyed by the requested `language` and `theme` (falling back to
  Filipino / general). Any `context` the caller passes is folded into the
  caption so you can see input flow through to output.
- **Image** — `PlaceholderImageProvider` renders a 1080×1080 SVG (theme-tinted
  gradient, business name, theme label) and returns it as a
  `data:image/svg+xml;base64,…` URI. No network, no storage bucket, no key.

Both return the full, valid interface shape, so downstream code (and the
`generatePost` callable) behaves identically no matter which provider is active.

## Adding a real provider

1. **Implement the interface.** Create e.g. `ai/openaiTextProvider.ts`
   exporting a class that implements `TextProvider` (or `ImageProvider`). Give
   it a stable `id` and implement the `generate*` method to call your vendor's
   SDK and return the exact `{ caption, headline, subtext }` /
   `{ imageUrl }` shape. An image provider should upload the result somewhere
   durable (e.g. Cloud Storage) and return the hosted URL.

2. **Keep secrets server-side.** API keys are Secret Manager secrets, never
   client env vars — mirror the Meta App Secret pattern in
   [`docs/facebook.md`](./facebook.md):

   ```
   firebase functions:secrets:set OPENAI_API_KEY
   ```

   Read the secret inside the provider via `defineSecret(...)`, and add it to
   the `secrets: [...]` option of any function that may call the provider.

3. **Register it in the factory.** Add one line to the appropriate registry in
   [`ai/index.ts`](../functions/src/ai/index.ts):

   ```ts
   const textProviders: Record<string, () => TextProvider> = {
     placeholder: () => new PlaceholderTextProvider(),
     openai: () => new OpenAITextProvider(),
   };
   ```

   Entries are factories, so a vendor client only initializes when it's the
   selected provider.

4. **Flip the config.** Set `AI_TEXT_PROVIDER=openai` (or `AI_IMAGE_PROVIDER=…`)
   and redeploy. No call-site changes.

## Notes

- The content bank in `ai/contentBank.ts` duplicates the client-side preview
  bank in [`src/pages/Generate.vue`](../src/pages/Generate.vue). Keep the two in
  sync until a real `TextProvider` replaces the placeholder. `functions/` is a
  separate TypeScript workspace, so the copy is mirrored rather than imported
  across the workspace boundary (same convention as
  [`docs/data-model.md`](./data-model.md)).
- `generatePost` validates `language` and `theme` against the supported unions
  and requires an authenticated caller. It does not persist a post or spend
  credits — those are separate concerns.
