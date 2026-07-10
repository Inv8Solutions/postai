
// Canonical Firestore document shapes for PostAI.
// See docs/data-model.md for the full narrative, ownership, and security notes.
//
// Conventions
// - Each interface describes the *stored* document data (the fields inside the
//   document), not the document id. Use `WithId<T>` when you hydrate a doc and
//   want its id alongside the data.
// - Timestamp fields are Firestore `Timestamp` on read. When writing, prefer
//   `serverTimestamp()` so the server clock is authoritative.
// - Fields marked "server-only" are written by Cloud Functions and must never
//   be exposed to the client via security rules (see docs/data-model.md).

import type { Timestamp } from 'firebase/firestore'

/** A document's data paired with its Firestore document id. */
export type WithId<T> = T & { id: string }

// ---------------------------------------------------------------------------
// Enums / string unions
// ---------------------------------------------------------------------------

/** Lifecycle of a generated post. */
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed'

/**
 * Where the post image came from.
 * `upload` — user-supplied image; `ai_generated` — produced by the generator.
 * Provisional — extend as generation sources are finalized.
 */
export type ImageType = 'upload' | 'ai_generated'

/** Why a credit ledger entry exists. Drives balance math and audit trails. */
export type CreditReason =
  | 'signup_bonus'
  | 'post_published'
  | 'topup'
  | 'referral'

/** Payment provider. Only PayMongo is supported today. */
export type PaymentProvider = 'paymongo'

/** Coarse payment lifecycle mapped from the provider's own statuses. */
export type PaymentStatus = 'pending' | 'paid' | 'failed'

// ---------------------------------------------------------------------------
// users/{uid}
// ---------------------------------------------------------------------------

/**
 * `users/{uid}` — the user profile. Document id is the Firebase Auth uid.
 * Extends the profile already written at sign-up (see authService.ts) with the
 * credits + referral fields the rest of the plan depends on.
 */
export interface User {
  /** Firebase Auth uid, duplicated into the doc for convenience. */
  uid: string
  email: string
  name: string

  // Onboarding / brand fields (written at registration).
  businessName: string
  businessCategory: string
  businessTagline: string
  brandTone: string
  language: string

  /**
   * Current spendable credit balance. Source of truth for reads; every change
   * is mirrored by a `creditLedger` entry whose `balanceAfter` should agree.
   * Mutated only server-side (Cloud Functions) to keep it in sync.
   */
  credits: number

  /** This user's own referral code, shared to invite others. Unique. */
  referralCode: string

  /** Referral code the user signed up with, if any. Set once, at sign-up. */
  referredBy?: string

  createdAt: Timestamp
}

// ---------------------------------------------------------------------------
// users/{uid}/facebookConnection/{pageId}
// ---------------------------------------------------------------------------

/**
 * `users/{uid}/facebookConnection/{pageId}` — a connected Facebook Page.
 * Subcollection so a user can connect multiple pages; document id is the
 * Facebook `pageId`.
 *
 * SERVER-ONLY: `pageAccessToken` must never be readable by the client.
 * Security rules should deny client reads of this subcollection (or at least of
 * the token field). Use `FacebookConnectionClient` for anything sent to the UI.
 */
export interface FacebookConnection {
  pageId: string
  pageName: string
  /** Long-lived Page access token. Server-only — never expose to the client. */
  pageAccessToken: string
  /** Granted OAuth scopes at connection time. */
  scopes: string[]
  connectedAt: Timestamp
}

/** Client-safe projection of a Facebook connection (token stripped). */
export type FacebookConnectionClient = Omit<FacebookConnection, 'pageAccessToken'>

// ---------------------------------------------------------------------------
// posts/{postId}
// ---------------------------------------------------------------------------

/**
 * `posts/{postId}` — a generated post and its publishing state.
 * Top-level collection keyed by an auto-id; owner is `uid`.
 */
export interface Post {
  uid: string
  caption: string
  imageUrl: string
  imageType: ImageType
  /** Visual/content theme used for generation. */
  theme: string
  /** Caption language (mirrors the user's language at generation time). */
  language: string
  status: PostStatus
  /** When to publish. Required once `status === 'scheduled'`; absent for drafts. */
  scheduledFor?: Timestamp
  /** Facebook post id, set after a successful publish. */
  fbPostId?: string
  createdAt: Timestamp
}

// ---------------------------------------------------------------------------
// creditLedger/{entryId}
// ---------------------------------------------------------------------------

/**
 * `creditLedger/{entryId}` — an append-only record of every credit change.
 * Top-level collection keyed by an auto-id. Entries are immutable once written.
 * The running total (`balanceAfter`) must equal `users/{uid}.credits` after the
 * most recent entry for that user.
 */
export interface CreditLedgerEntry {
  uid: string
  /** Signed change: positive for grants/top-ups, negative for spend. */
  delta: number
  reason: CreditReason
  /** User's credit balance immediately after applying `delta`. */
  balanceAfter: number
  /**
   * Id of the related document that caused this entry:
   * - `post_published` → posts/{postId}
   * - `topup`          → payments/{paymentId}
   * - `referral`       → users/{uid} of the referred user
   */
  refId?: string
  createdAt: Timestamp
}

// ---------------------------------------------------------------------------
// payments/{paymentId}
// ---------------------------------------------------------------------------

/**
 * `payments/{paymentId}` — a credit purchase via PayMongo.
 * Top-level collection keyed by an auto-id. Written/updated server-side from
 * the checkout flow and the provider webhook.
 */
export interface Payment {
  uid: string
  provider: PaymentProvider
  /** Amount charged, in PHP . */
  amountPhp: number
  /** Credits granted when the payment succeeds. */
  credits: number
  status: PaymentStatus
  /** Provider-side reference (e.g. PayMongo payment/checkout id). */
  providerRef: string
  createdAt: Timestamp
}
