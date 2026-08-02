import { test } from "node:test";
import assert from "node:assert/strict";
import { RateLimiter } from "./rateLimiter.js";

test("allows requests up to the limit, then blocks within the window", () => {
  const limiter = new RateLimiter({ maxRequests: 3, windowMs: 1000 });
  assert.equal(limiter.tryConsume("u1", 0), true);
  assert.equal(limiter.tryConsume("u1", 100), true);
  assert.equal(limiter.tryConsume("u1", 200), true);
  assert.equal(limiter.tryConsume("u1", 300), false); // 4th within the window
});

test("frees capacity as the window slides", () => {
  const limiter = new RateLimiter({ maxRequests: 2, windowMs: 1000 });
  assert.equal(limiter.tryConsume("u1", 0), true);
  assert.equal(limiter.tryConsume("u1", 500), true);
  assert.equal(limiter.tryConsume("u1", 900), false);
  // The first hit (t=0) has aged out of the 1000ms window by t=1600.
  assert.equal(limiter.tryConsume("u1", 1600), true);
});

test("a blocked request does not extend the cooldown", () => {
  const limiter = new RateLimiter({ maxRequests: 1, windowMs: 1000 });
  assert.equal(limiter.tryConsume("u1", 0), true);
  assert.equal(limiter.tryConsume("u1", 500), false); // blocked, not recorded
  // Capacity frees 1000ms after the allowed hit (t=0), not the blocked one.
  assert.equal(limiter.tryConsume("u1", 1001), true);
});

test("tracks callers independently", () => {
  const limiter = new RateLimiter({ maxRequests: 1, windowMs: 1000 });
  assert.equal(limiter.tryConsume("u1", 0), true);
  assert.equal(limiter.tryConsume("u2", 0), true);
  assert.equal(limiter.tryConsume("u1", 0), false);
});
