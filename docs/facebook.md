# Facebook / Meta app setup

How PostAI connects to Facebook Pages for publishing (M1). The Meta app itself
is configured in the [Meta for Developers](https://developers.facebook.com/apps/)
console; this document records the settings that must match the code and the
requirements for going live.

## Overview

- **App type:** Business
- **Product:** Facebook Login (for the OAuth grant that yields a User token,
  which we exchange server-side for long-lived **Page** access tokens).
- **Token handling:** the OAuth *code → token* exchange runs in a Cloud Function.
  Page access tokens are written to
  `users/{uid}/facebookConnection/{pageId}.pageAccessToken` and are
  **server-only** — never exposed to the client (see
  [`docs/data-model.md`](./data-model.md)). Publishing runs server-side.

## Credentials

Two values come from **App settings → Basic** in the Meta console:

| Value            | Where it lives                                   | Secret? |
| ---------------- | ------------------------------------------------ | ------- |
| **App ID**       | Client env var `VITE_META_APP_ID` (in `.env`)    | No — public, ships in the frontend bundle. |
| **App Secret**   | Firebase Functions secret `META_APP_SECRET`      | **Yes — never commit, never expose to the client.** |

### App ID (client)

Add it to `.env` (already listed in `.env.example`):

```bash
VITE_META_APP_ID="<your app id>"
```

### App Secret (Cloud Functions secret)

Store it with Firebase Secret Manager — **not** in any `.env` file. Set it
interactively so the value never lands in shell history or the repo:

```bash
firebase functions:secrets:set META_APP_SECRET --project prod
# paste the App Secret when prompted
```

> **Use `--project prod`, not the default.** The `.firebaserc` default project is
> `demo-postai`, a Firebase *demo* project id that exists only for the offline
> emulator — it has no Google Cloud backing, so Secret Manager (and any deploy)
> fails against it with `Project 'projects/demo-postai' not found`. The `prod`
> alias points at the real project `postai-7a018`. Requires Secret Manager API
> enabled (`gcloud services enable secretmanager.googleapis.com --project
> postai-7a018`) and `firebase login`.

Bind it to the function that performs the token exchange (in `functions/`):

```ts
import { defineSecret } from "firebase-functions/params";
const metaAppSecret = defineSecret("META_APP_SECRET");

export const facebookOAuthCallback = onRequest(
  { secrets: [metaAppSecret] },
  (req, res) => {
    const secret = metaAppSecret.value();
    // ... exchange `code` for a user token, then for long-lived Page tokens
  }
);
```

To rotate: re-run `functions:secrets:set` and redeploy the functions.

## OAuth redirect URIs

Set these under **Facebook Login → Settings → Valid OAuth Redirect URIs**. The
redirect target is the Cloud Function callback (server-side exchange), not a
frontend route.

> The callback function name below (`facebookOAuthCallback`) is provisional and
> is created in M1 — until it exists, hitting the callback URL returns
> "not found". Functions region is `us-central1`.
>
> **Project id differs by environment.** The local emulator runs under the
> `.firebaserc` default project `demo-postai` (see the healthcheck URL in the
> README), while deployed functions run under the real project `postai-7a018`.
> The project segment in the URL must match, or the request 404s.

| Environment | Redirect URI |
| ----------- | ------------ |
| Local (emulator) | `http://localhost:5001/demo-postai/us-central1/facebookOAuthCallback` |
| Production | `https://us-central1-postai-7a018.cloudfunctions.net/facebookOAuthCallback` |

Also set, under **App settings → Basic**:

- **App domains** (bare domains, no protocol): `localhost` for dev and
  `postai-one.vercel.app` for production.
- **Site URL / Allowed domains** (full origins that initiate login):
  `http://localhost:5173` and `https://postai-one.vercel.app/`.

`localhost` is permitted over plain HTTP; every other redirect URI must be HTTPS.

## Scopes (permissions)

Requested at login and reviewed by Meta before public use:

| Scope | Purpose |
| ----- | ------- |
| `pages_show_list` | List the Pages the user manages, so they can pick one to connect. |
| `pages_read_engagement` | Read Page metadata/engagement needed to manage content. |
| `pages_manage_posts` | Create and publish/schedule posts on the connected Page. |
| `business_management` | Only if Pages are managed through Business Manager. |

### Where to configure them: Use Cases

Meta's dashboard no longer has a standalone "App Review → Permissions and
Features" menu — permissions now live inside a **use case**. To add these scopes:

1. Left sidebar → **Use cases**.
2. **Customize** the use case tied to Facebook Login / Pages (or add one).
3. Open its **Permissions** tab and add `pages_show_list`,
   `pages_read_engagement`, `pages_manage_posts`.
4. Each row shows its access level and a **Request / Get advanced access** button
   (that button *is* the App Review submission — see below).

For dev-mode testing, just confirm the three permissions are present with
**Standard Access**. Don't request advanced access until go-live.

## App Review (advanced access) — required before going live

`pages_show_list`, `pages_read_engagement`, `pages_manage_posts`, and
`business_management` are **advanced-access** permissions. Meta grants only
**standard access** by default, which limits a permission to users who have a
**role on the app**. To let arbitrary end users authorize PostAI in production,
each scope needs **advanced access**, requested via the **Request advanced
access** button on the permission's row in its use case's Permissions tab.

Advanced-access checklist (Meta requirements):

- Business verification completed for the associated business.
- A **privacy policy URL** and a **data deletion** URL/callback set in App
  settings → Basic.
- A valid app **category** and app icon.
- A **screencast** demonstrating each requested permission in the real login and
  publishing flow, plus written use-case justifications.
- App switched from **Development** to **Live** mode (toggle in the top bar).

Until review passes, keep the app usable by adding testers (below).

## Dev mode — testing without App Review

While the app is in **Development mode**, the requested scopes work **only** for
users who have a role on the app or are added as test users. No App Review is
needed for this.

Add testers via either:

- **App roles → Roles (preferred):** add real Facebook accounts as Admin /
  Developer / Tester. They must accept the invite at
  [developers.facebook.com/requests](https://developers.facebook.com/requests).
  The tester needs to admin a real Facebook Page (a free throwaway Page works) to
  exercise `pages_show_list` and publishing. **or**
- **App roles → Test Users:** synthetic test users that can authorize the app and
  manage test Pages. Note: Meta sometimes **temporarily disables test-user
  creation** — if so, use the Roles path above instead.

Acceptance check: a test user can complete the Facebook Login flow, grant the
four scopes, and land back on the callback with an authorization `code` —
confirming the App ID, redirect URIs, and scope configuration are correct.
