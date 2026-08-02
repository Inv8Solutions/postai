import { test } from "node:test";
import assert from "node:assert/strict";
import { isOwnedPostImagePath, postImagePath } from "./storage.js";

test("postImagePath namespaces images per user, kind, and extension", () => {
  assert.equal(
    postImagePath("u1", { kind: "generated", id: "abc", extension: "svg" }),
    "postImages/u1/generated/abc.svg",
  );
  assert.equal(
    postImagePath("u1", { kind: "uploaded", id: "xyz", extension: "png" }),
    "postImages/u1/uploaded/xyz.png",
  );
});

test("isOwnedPostImagePath accepts only the caller's own well-formed paths", () => {
  assert.equal(
    isOwnedPostImagePath("u1", "postImages/u1/uploaded/xyz.png"),
    true,
  );
  // Another user's object.
  assert.equal(
    isOwnedPostImagePath("u1", "postImages/u2/uploaded/xyz.png"),
    false,
  );
  // Traversal / malformed / empty.
  assert.equal(
    isOwnedPostImagePath("u1", "postImages/u1/../u2/secret.png"),
    false,
  );
  assert.equal(isOwnedPostImagePath("u1", "secrets/u1/thing.png"), false);
  assert.equal(isOwnedPostImagePath("u1", ""), false);
});
