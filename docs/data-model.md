# Data model

Firestore collections PostAI depends on. Canonical TypeScript interfaces live in
[`src/types/models.ts`](../src/types/models.ts) — this document is the narrative:
ownership, doc-id conventions, invariants, and security notes. When you change a
shape, change both.

## Conventions

- **Document ids.** Where the id carries meaning (a uid, a Facebook page id) the
  collection is keyed by it. Otherwise Firestore auto-ids are used and the owner
  is stored in a `uid` field.
- **Timestamps.** Stored as Firestore `Timestamp`. On write, prefer
  `serverTimestamp()` so the server clock is authoritative. (The existing sign-up
  code writes `new Date()`, which Firestore stores as a `Timestamp` — reads are
  consistent either way.)
- **Server-only fields.** Some fields (access tokens, credit balances, ledger
  entries, payments) must only be written by Cloud Functions. Security rules
  should enforce this; the client treats them as read-only or hidden.
- **TS sharing.** `src/types/models.ts` is the canonical source for the frontend.
  `functions/` is a separate TypeScript workspace and deploy artifact; when server
  code needs these shapes, mirror the relevant interfaces there rather than
  reaching across `rootDir`. Keep the two in sync (they are small and rarely
  change).

## Collections

### `users/{uid}` — user profile

Extends the profile already written at registration
(see [`authService.ts`](../src/services/authService.ts)). Document id is the
Firebase Auth uid.

| Field              | Type        | Notes |
| ------------------ | ----------- | ----- |
| `uid`              | string      | Auth uid, duplicated into the doc. |
| `email`            | string      | |
| `name`            | string      | |
| `businessName`     | string      | Onboarding. |
| `businessCategory` | string      | Onboarding. |
| `businessTagline`  | string      | Onboarding; defaults to `""`. |
| `brandTone`        | string      | Onboarding. |
| `language`         | string      | Onboarding; default caption language. |
| `credits`          | number      | Spendable balance. **Server-mutated.** |
| `referralCode`     | string      | This user's own code to invite others. Unique. |
| `referredBy`       | string?     | Referral code used at sign-up, if any. Set once. |
| `createdAt`        | Timestamp   | |

**Invariants**

- `credits` is the read source of truth and must equal the `balanceAfter` of the
  user's most recent `creditLedger` entry.
- `credits` is only ever changed by Cloud Functions, atomically with writing the
  matching ledger entry (transaction/batch).
- `referralCode` must be unique across users. A dedicated lookup (e.g. a
  `referralCodes/{code}` doc, or a Function that checks uniqueness on assignment)
  is recommended when the referral feature lands — out of scope for this model.

### `users/{uid}/facebookConnection/{pageId}` — connected Facebook Page

Subcollection so one user can connect multiple Pages. Document id is the Facebook
`pageId`.

| Field             | Type      | Notes |
| ----------------- | --------- | ----- |
| `pageId`          | string    | Facebook Page id (also the doc id). |
| `pageName`        | string    | Display name. |
| `pageAccessToken` | string    | **Server-only.** Long-lived Page token. |
| `scopes`          | string[]  | Granted OAuth scopes at connection time. |
| `connectedAt`     | Timestamp | |

**Security**

- `pageAccessToken` must never be readable by the client. Rules should deny
  client reads of this subcollection (or of the token field specifically).
  Publishing runs server-side; the client uses `FacebookConnectionClient` (token
  stripped) for display.

### `posts/{postId}` — generated post

Top-level collection, auto-id. Owner is `uid`.

| Field          | Type       | Notes |
| -------------- | ---------- | ----- |
| `uid`          | string     | Owner. |
| `caption`      | string     | Generated caption. |
| `imageUrl`     | string     | |
| `imageType`    | ImageType  | `upload` \| `ai_generated` (provisional). |
| `theme`        | string     | Content/visual theme used for generation. |
| `language`     | string     | Caption language at generation time. |
| `status`       | PostStatus | `draft` \| `scheduled` \| `published` \| `failed`. |
| `scheduledFor` | Timestamp? | Required when `status === 'scheduled'`; absent for drafts. |
| `fbPostId`     | string?    | Set after a successful publish. |
| `createdAt`    | Timestamp  | |

**Invariants**

- `scheduledFor` is present iff the post is (or was) scheduled.
- `fbPostId` is set only once `status === 'published'`.

### `creditLedger/{entryId}` — append-only credit history

Top-level collection, auto-id. Entries are immutable once written.

| Field         | Type         | Notes |
| ------------- | ------------ | ----- |
| `uid`         | string       | Owner. |
| `delta`       | number       | Signed change (+grant / −spend). |
| `reason`      | CreditReason | `signup_bonus` \| `post_published` \| `topup` \| `referral`. |
| `balanceAfter`| number       | Balance immediately after applying `delta`. |
| `refId`       | string?      | Related doc id (see mapping below). |
| `createdAt`   | Timestamp    | |

`refId` mapping by reason:

- `post_published` → `posts/{postId}`
- `topup` → `payments/{paymentId}`
- `referral` → `users/{uid}` of the referred user
- `signup_bonus` → none

**Invariants**

- Append-only and server-written; entries are never edited or deleted.
- Written atomically with the `users/{uid}.credits` update it represents.

### `payments/{paymentId}` — credit purchase

Top-level collection, auto-id. Written/updated server-side from the checkout flow
and the PayMongo webhook.

| Field         | Type            | Notes |
| ------------- | --------------- | ----- |
| `uid`         | string          | Buyer. |
| `provider`    | PaymentProvider | `paymongo`. |
| `amountPhp`   | number          | Amount charged, in PHP (whole pesos). |
| `credits`     | number          | Credits granted on success. |
| `status`      | PaymentStatus   | `pending` \| `paid` \| `failed`. |
| `providerRef` | string          | PayMongo payment/checkout id. |
| `createdAt`   | Timestamp       | |

**Flow**

- Created `pending` at checkout. On the provider webhook, transitions to `paid`
  (grant `credits`, write a `topup` ledger entry, bump `users/{uid}.credits`) or
  `failed`. All state changes are server-side.

## Open items (out of scope here)

- Referral-code uniqueness enforcement (lookup collection or Function).
- Firestore security rules (`firestore.rules`) implementing the server-only
  constraints above — not yet in the repo.
- Finalizing the `ImageType` union as generation sources are added.
