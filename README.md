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

## Local dev — Functions & Emulators

The `functions/` workspace contains Cloud Functions (TypeScript, 2nd gen). Use the Firebase Emulator Suite to run Auth, Firestore, and Functions locally without touching production.

### Setup

```bash
cd functions
npm install
```

### Run

```bash
npm run emulators
```

Starts Auth, Firestore, and Functions emulators. UI: http://127.0.0.1:4000

### Healthcheck

http://127.0.0.1:5001/demo-postai/us-central1/healthcheck
Returns `{ "status": "ok", "timestamp": ... }`
