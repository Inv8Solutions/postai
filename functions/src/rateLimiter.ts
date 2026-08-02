// A small, dependency-free rate limiter for callable functions.

/** Configuration for a {@link RateLimiter}. */
export interface RateLimiterOptions {
  /** Max requests allowed per key within the window. */
  maxRequests: number;
  /** Sliding window length, in milliseconds. */
  windowMs: number;
}

/**
 * Best-effort in-memory sliding-window rate limiter, keyed by an arbitrary
 * string (e.g. a uid).
 *
 * State lives in the Function instance's memory, so limits are per-instance and
 * reset on cold start — adequate as a basic abuse guard, not a global quota.
 * For a hard, cross-instance limit, back it with Firestore/Redis instead.
 */
export class RateLimiter {
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private readonly hits = new Map<string, number[]>();

  /** @param {RateLimiterOptions} options limit and window. */
  constructor(options: RateLimiterOptions) {
    this.maxRequests = options.maxRequests;
    this.windowMs = options.windowMs;
  }

  /**
   * Records a request for `key` and reports whether it is within the limit.
   * A blocked request is not counted, so it doesn't extend the cooldown.
   * @param {string} key caller identity to throttle on.
   * @param {number} now current epoch ms; injectable for tests.
   * @return {boolean} true if allowed, false if the window is exhausted.
   */
  tryConsume(key: string, now: number = Date.now()): boolean {
    const windowStart = now - this.windowMs;
    // Drop timestamps that have aged out of the window.
    const recent = (this.hits.get(key) ?? []).filter((t) => t > windowStart);

    if (recent.length >= this.maxRequests) {
      this.hits.set(key, recent);
      return false;
    }

    recent.push(now);
    this.hits.set(key, recent);
    return true;
  }
}
