import { test } from "node:test";
import assert from "node:assert/strict";
import {
  CaptionValidationError,
  MAX_CONTEXT_LENGTH,
  resolveCaptionInput,
} from "./captionRequest.js";

test("merges selections with the brand kit into a caption input", () => {
  const input = resolveCaptionInput(
    { theme: "promo", language: "English", context: "  10% off until Sunday  " },
    {
      businessName: "Aling Nena",
      businessCategory: "Sari-Sari Store",
      brandTone: "Friendly",
      language: "Filipino",
    },
  );

  assert.equal(input.theme, "promo");
  assert.equal(input.language, "English"); // explicit selection wins
  assert.equal(input.businessName, "Aling Nena");
  assert.equal(input.businessCategory, "Sari-Sari Store");
  assert.equal(input.brandTone, "Friendly");
  assert.equal(input.context, "10% off until Sunday"); // trimmed
});

test("falls back to the brand kit's default language when none is selected", () => {
  const input = resolveCaptionInput({ theme: "general" }, { language: "Taglish" });
  assert.equal(input.language, "Taglish");
});

test("defaults to Filipino when neither request nor brand kit sets a language", () => {
  const input = resolveCaptionInput({ theme: "general" }, {});
  assert.equal(input.language, "Filipino");
});

test("treats a blank language selection as unset", () => {
  const input = resolveCaptionInput(
    { theme: "promo", language: "   " },
    { language: "English" },
  );
  assert.equal(input.language, "English");
});

test("rejects a missing or invalid theme", () => {
  assert.throws(() => resolveCaptionInput({}, {}), CaptionValidationError);
  assert.throws(
    () => resolveCaptionInput({ theme: "nope" }, {}),
    CaptionValidationError,
  );
});

test("rejects an explicit but unsupported language", () => {
  assert.throws(
    () => resolveCaptionInput({ theme: "promo", language: "Spanish" }, {}),
    CaptionValidationError,
  );
});

test("rejects over-long or non-string context", () => {
  assert.throws(
    () =>
      resolveCaptionInput(
        { theme: "promo", context: "x".repeat(MAX_CONTEXT_LENGTH + 1) },
        {},
      ),
    CaptionValidationError,
  );
  assert.throws(
    () => resolveCaptionInput({ theme: "promo", context: 42 }, {}),
    CaptionValidationError,
  );
});

test("omits empty/whitespace-only brand-kit fields and context", () => {
  const input = resolveCaptionInput(
    { theme: "promo", context: "   " },
    { businessName: "  ", businessCategory: "", brandTone: "  " },
  );
  assert.equal(input.context, undefined);
  assert.equal(input.businessName, undefined);
  assert.equal(input.businessCategory, undefined);
  assert.equal(input.brandTone, undefined);
});
