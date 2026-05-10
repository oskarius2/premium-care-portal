# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Novum Estetik is a React + Vite SPA (TypeScript, TailwindCSS, shadcn/ui) for a Swedish medical aesthetics clinic. It includes a booking system with Supabase backend (auth, database, edge functions).

### Running the app

- **Dev server:** `npm run dev` — starts Vite on port 8080
- **Build:** `npm run build`
- **Lint:** `npm run lint` (ESLint flat config)
- **Tests:** `npm run test` (Vitest with jsdom)

### Environment variables

Copy `.env.example` to `.env` and fill in valid Supabase credentials. The required variables are:
- `VITE_SUPABASE_PROJECT_ID`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

The app renders its UI even without valid Supabase credentials; API calls (bookings, slots) will fail but the frontend is fully navigable.

### Notable caveats

- The lockfile is `package-lock.json` (use `npm install`, not bun/pnpm/yarn).
- Vite binds to `::` (IPv6 wildcard) so `localhost:8080` works for testing.
- The `lovable-tagger` plugin runs in dev mode only; it's safe to ignore in builds.
- Supabase edge functions (in `supabase/functions/`) are Deno and deployed to the remote Supabase project — they are not run locally.
- ESLint uses flat config (`eslint.config.js`) — no `.eslintrc` file exists.
