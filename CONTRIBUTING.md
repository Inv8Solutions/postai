# PostAI V2 — Contributing & Development Workflow

> Paste this section into `README.md`. It describes how to set up the project locally and the branching/PR rules everyone must follow.

## Tech stack

- **Frontend:** Vue 3 + Vite + TypeScript, Pinia (state), Vue Router, Tailwind CSS v4
- **Backend:** Firebase — Auth, Firestore, Cloud Functions, Storage
- **Payments:** Maya Business (PHP)
- **Publishing:** Facebook Graph API (native scheduling)
- **Hosting:** Frontend on Vercel, backend on Firebase

## Prerequisites

- **Node.js 20+** and npm
- **Git**
- **Firebase CLI** (`npm install -g firebase-tools`) — for the backend/emulators

## Getting started

Clone the repository and install dependencies **before** you start coding:

```bash
git clone https://github.com/Inv8Solutions/postaiV2.git
cd postaiV2
npm install
```

Run the app locally:

```bash
npm run dev        # start the Vite dev server
npm run build      # type-check + production build (vue-tsc + vite build)
npm run preview    # preview the production build
```

> Copy `.env.example` to `.env` and fill in the values before running the app (Firebase web config, etc.). Never commit real `.env` files or secrets.

## Branching & pull request rules

**Do NOT push directly to `main`.** `main` is protected and only receives changes through reviewed Pull Requests.

1. **One branch per milestone.** Create your branch off the latest `main`:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b milestone/m1-facebook-page-connection
   ```

2. **Do your work on that milestone branch**, committing as you go. Use clear, conventional commit messages:

   ```
   feat: connect real Facebook Login flow
   fix: correct auth return shape in login
   chore: add Firebase emulator config
   ```

   Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`.

3. **Push the branch and open a Pull Request** (a.k.a. Merge Request) into `main`:

   ```bash
   git push -u origin milestone/m1-facebook-page-connection
   ```

   Then open a PR on GitHub targeting `main`. Link the milestone and its issues in the PR description.

4. **Get it reviewed and merged.** All checks must pass and the branch must be up to date with `main` before merging. Do not self-merge without review.

### Milestone branches

Create one branch per milestone using this naming convention:

| Milestone | Branch name |
|---|---|
| M0 — Backend Foundation & Auth Hardening *(prerequisite)* | `milestone/m0-backend-foundation` |
| M1 — Facebook Page Connection | `milestone/m1-facebook-page-connection` |
| M2 — AI Generation (Text + Image) | `milestone/m2-ai-generation` |
| M3 — Scheduling & Publishing | `milestone/m3-scheduling-publishing` |
| M4 — Credits & Maya Payments | `milestone/m4-credits-maya-payments` |
| M5 — Dashboard Wiring & Referrals | `milestone/m5-dashboard-referrals` |
| M6 — Deployment (Vercel + Firebase) | `milestone/m6-deployment` |

## Execution order

Build the milestones in this order:

```
M0 (foundation) → M1 → M2 → M3 → M4 → M5 → M6
```

- **M0 is the required foundation** (Firebase Functions setup, env vars, data model, security rules, auth fixes). Complete it before starting M1.
- Then follow **M1 → M2 → M3 → M4 → M5 → M6** in sequence.
- Each milestone should be fully merged into `main` (via its PR) before the next one begins.

## Summary — every task, every time

1. `git pull origin main` to get the latest.
2. Create/switch to the correct **milestone branch**.
3. Code — never on `main` directly.
4. Commit with conventional messages.
5. Push the branch and open a **Pull Request** into `main`.
6. Review → merge → move to the next milestone.
