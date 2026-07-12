# Vue 3 + TypeScript + Vite

### Dependencies Applied to Codebase

- TailwindCSS
- Pinia (state management)
- oxc (typescript compiler)
- lucide `@lucide/vue`
- vue-router
- date-fns

## Contributing

Before you start coding, read the setup and branching/PR workflow in [CONTRIBUTING.md](./CONTRIBUTING.md).

## Local dev

> [!IMPORTANT]
> **No emulators.** As of this milestone, the Firebase Emulator Suite is no
> longer used anywhere in development. All development and testing — Auth,
> Firestore, and Functions — runs against the **live Firebase project**. Deploy
> Cloud Functions (see below) and exercise flows end-to-end on the real project;
> do not start, wire up, or point config at any emulator.

The dev server talks directly to the **real Firebase project** — Auth, Firestore, and Functions all point at production ([`src/firebase.ts`](./src/firebase.ts)). No emulators.

### Env config

- `.env` (repo root) — `VITE_META_APP_ID` and your `VITE_FIREBASE_*` values.

### Setup & run

```bash
npm install
npm run dev
```

## Cloud Functions

The `functions/` workspace holds the Cloud Functions (TypeScript, 2nd gen), including `connectFacebookPage` (the Facebook token exchange). Because dev uses the real project, the callable must be **deployed** for the connect flow to work locally.

### Config

- `functions/.env` — `META_APP_ID` (same value as `VITE_META_APP_ID`; public, git-ignored).
- `META_APP_SECRET` — set as a Secret Manager secret, never in a file:
  ```bash
  firebase functions:secrets:set META_APP_SECRET --project prod
  ```
  See [docs/facebook.md](./docs/facebook.md).

### Deploy

```bash
cd functions && npm install && cd ..
npm run deploy:functions        # firebase deploy --only functions
# or target the real project explicitly:
firebase deploy --only functions --project prod
```

### Healthcheck

`https://us-central1-<project-id>.cloudfunctions.net/healthcheck`
Returns `{ "status": "ok", "timestamp": ... }`

## Testing the Facebook Page connection

End-to-end check for the Facebook login → page-picker → server-side token exchange flow (Step 2 of `/generate`).

**One-time setup:**

- Deploy the functions (above) with `META_APP_SECRET`/`META_APP_ID` configured.
- In the Meta dashboard (see [docs/facebook.md](./docs/facebook.md)): add the scopes `pages_show_list`, `pages_read_engagement`, `pages_manage_posts` to your app's use case, add your Facebook account as an app tester, and make sure it admins at least one Facebook Page.

**Run the flow:**

1. `npm run dev`, then register/sign in.
2. Go to `/generate` → **Step 2** → **Continue with Facebook** and grant the requested permissions.
3. If you manage more than one Page, pick one in the page picker. The connected card shows the real page name, photo, and follower count.

**Verify the acceptance criteria** in the Firebase console (Firestore):

- `users/{uid}/facebookConnection/{pageId}` exists, with `pageName`, `scopes`, `connectedAt`, and a **`pageAccessToken`** (server-only — written by the `connectFacebookPage` Function, never exposed to the client).
- The Function verifies the token with a live `GET /{page-id}` before writing, so a persisted document means that Graph call succeeded.

If connecting fails, check the function logs (`firebase functions:log` or the console) — `connectFacebookPage` logs Graph API errors (status/code/message, never tokens). A `failed-precondition` error means `META_APP_SECRET`/`META_APP_ID` aren't configured.
