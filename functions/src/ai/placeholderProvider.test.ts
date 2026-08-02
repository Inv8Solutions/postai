import { test } from "node:test";
import assert from "node:assert/strict";
import { applyBrandKit, PlaceholderTextProvider } from "./placeholderProvider.js";
import { contentBank } from "./contentBank.js";

test("returns fully shaped caption content for the selected language/theme", async () => {
  const provider = new PlaceholderTextProvider();
  const result = await provider.generateCaption({
    language: "English",
    theme: "promo",
    businessName: "Nanay's Carinderia",
    businessCategory: "Food & Carinderia",
    brandTone: "Friendly",
  });

  // All three fields are present and non-empty.
  assert.ok(result.caption.length > 0);
  assert.ok(result.headline.length > 0);
  assert.ok(result.subtext.length > 0);

  // Content is driven by the language + theme selection (reviewed copy).
  const promo = contentBank.English.promo[0];
  assert.equal(result.headline, promo.h);
  assert.equal(result.subtext, promo.s);
  assert.equal(result.caption, promo.c);
});

test("folds user-supplied context into the caption body", async () => {
  const provider = new PlaceholderTextProvider();
  const detail = "Opening at 9am today";
  const result = await provider.generateCaption({
    language: "English",
    theme: "general",
    context: detail,
  });

  const general = contentBank.English.general[0];
  assert.equal(result.caption, `${general.c}\n\n${detail}`);
  // Headline/subtext stay as the reviewed copy.
  assert.equal(result.headline, general.h);
});

test("falls back to Filipino/general copy for unknown language & theme", async () => {
  const provider = new PlaceholderTextProvider();
  const result = await provider.generateCaption({
    // Cast around the compile-time union to exercise the runtime fallback.
    language: "Klingon" as never,
    theme: "unknown" as never,
  });

  const fallback = contentBank.Filipino.general[0];
  assert.equal(result.headline, fallback.h);
  assert.equal(result.caption, fallback.c);
});

test("applyBrandKit fills brand-kit tokens in reviewed copy", () => {
  assert.equal(
    applyBrandKit("Welcome to [BizName]!", { businessName: "Aling Nena" }),
    "Welcome to Aling Nena!",
  );
  assert.equal(
    applyBrandKit("A [Category] you can trust", { businessCategory: "Resto-Bar" }),
    "A Resto-Bar you can trust",
  );
  // Missing brand-kit values leave the token untouched rather than blanking it.
  assert.equal(applyBrandKit("Hi [BizName]", {}), "Hi [BizName]");
});
