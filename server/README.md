# Intern Portal — API scaffold (Node.js + Supabase)

A small Express API to sit behind the React app for two things it currently
mocks in-memory: **authentication** and the **leaderboard/rank system**.

## Setup

1. Create a Supabase project, then run `supabase/schema.sql` (one folder up)
   in the SQL editor. It creates:
   - `profiles`, `colleges`, `companies` — auth/role data, plus a trigger
     that auto-fills `profiles` whenever someone signs up.
   - `students`, `skills`, `student_skills`, `certifications`, `projects`,
     `jobs`, `job_required_skills`, `applications` — the same data the
     frontend keeps in React state today.
   - `student_points` / `student_leaderboard` views — live rank, computed
     with the exact same formula as `computePoints()` in `InternPortal.jsx`
     (10 pts/technical skill, 5/soft skill, 15/certification, 20/project,
     10 for a resume, 25 for college verification).
2. `cp .env.example .env` and fill in your Supabase URL + keys.
3. `npm install && npm run dev`

## Endpoints

| Method | Path                     | Purpose                                    |
|--------|--------------------------|---------------------------------------------|
| POST   | `/api/auth/signup`       | Create a student/college/company account   |
| POST   | `/api/auth/login`        | Sign in, returns a session `access_token`  |
| POST   | `/api/auth/logout`       | Sign out                                   |
| GET    | `/api/leaderboard`       | Ranked list (`?scope=global\|college`)     |
| GET    | `/api/leaderboard/me`    | The logged-in student's own rank + points  |

All `/api/leaderboard/*` routes expect `Authorization: Bearer <access_token>`
from the login response.

## Wiring it to the frontend

This is intentionally a thin starting point, not a full rewrite. To connect
it to `InternPortal.jsx`, the main swap is: replace the local `useState`
calls for students/applications with calls to these endpoints (or straight
to `@supabase/supabase-js` from the browser using the anon key), and replace
`computePoints()` / `rankStudents()` with a fetch to `GET /api/leaderboard`.
