# Intern Portal — Vite project

Ready-to-run Vite + React setup wrapping `InternPortal.jsx`, plus the
`supabase/` schema and `server/` (Node/Express) API from before.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`).

## What's inside

- `src/InternPortal.jsx` — the app (auth, dashboards, apply page with the
  red/green skill match chips, leaderboard).
- `src/main.jsx`, `index.html`, `tailwind.config.js`, `postcss.config.js` —
  Vite + Tailwind wiring so the component's classes render correctly.
- `supabase/schema.sql` — auth + leaderboard/rank tables & views for Supabase.
- `server/` — Node.js/Express API (signup/login + leaderboard endpoints).
  See `server/README.md` for its own setup.

## Build for production

```bash
npm run build
npm run preview
```
