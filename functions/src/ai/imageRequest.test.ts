import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ImageValidationError,
  MAX_HEADLINE_LENGTH,
  MAX_SUBTEXT_LENGTH,
  resolveImageInput,
} from "./imageRequest.js";

test("shapes a valid request into an image input", () => {
  const input = resolveImageInput({
    theme: "promo",
    headline: "  50% Off Today  ",
    subtext: "  Ends Sunday  ",
    brandKit: {
      businessName: "Aling Nena",
      businessCategory: "Sari-Sari Store",
      brandTone: "Friendly", // extra fields are ignored
    },
  });

  assert.equal(input.theme, "promo");
  assert.equal(input.headline, "50% Off Today"); // trimmed
  assert.equal(input.subtext, "Ends Sunday");
  assert.equal(input.businessName, "Aling Nena");
  assert.equal(input.businessCategory, "Sari-Sari Store");
});

test("allows a bare theme with no text or brand kit", () => {
  const input = resolveImageInput({ theme: "general" });
  assert.equal(input.theme, "general");
  assert.equal(input.headline, undefined);
  assert.equal(input.subtext, undefined);
  assert.equal(input.businessName, undefined);
  assert.equal(input.businessCategory, undefined);
});

test("rejects a missing or invalid theme", () => {
  assert.throws(() => resolveImageInput({}), ImageValidationError);
  assert.throws(
    () => resolveImageInput({ theme: "nope" }),
    ImageValidationError,
  );
});

test("rejects over-long headline/subtext", () => {
  assert.throws(
    () =>
      resolveImageInput({
        theme: "promo",
        headline: "x".repeat(MAX_HEADLINE_LENGTH + 1),
      }),
    ImageValidationError,
  );
  assert.throws(
    () =>
      resolveImageInput({
        theme: "promo",
        subtext: "x".repeat(MAX_SUBTEXT_LENGTH + 1),
      }),
    ImageValidationError,
  );
});

test("rejects non-string text fields", () => {
  assert.throws(
    () => resolveImageInput({ theme: "promo", headline: 42 }),
    ImageValidationError,
  );
});

test("tolerates a non-object or empty brand kit", () => {
  assert.deepEqual(resolveImageInput({ theme: "promo", brandKit: "nope" }), {
    theme: "promo",
    headline: undefined,
    subtext: undefined,
    businessName: undefined,
    businessCategory: undefined,
  });
  const empty = resolveImageInput({
    theme: "promo",
    brandKit: { businessName: "   ", businessCategory: "" },
  });
  assert.equal(empty.businessName, undefined);
  assert.equal(empty.businessCategory, undefined);
});
