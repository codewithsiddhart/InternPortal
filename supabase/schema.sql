-- ============================================================================
-- Intern Portal — Supabase schema (starter)
-- Covers: authentication profiles (student/college/company) and the
-- points-based leaderboard/rank system used by the app.
-- This is a lightweight scaffold to pair with the existing React mock data —
-- adapt table/column names if you wire it up to the real app state.
-- Run in the Supabase SQL editor, top to bottom.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. AUTHENTICATION: profiles table linked to Supabase Auth (auth.users)
-- ---------------------------------------------------------------------------
-- Supabase Auth already creates rows in auth.users on signup. We extend that
-- with a `profiles` row that carries the app-specific role and links out to
-- a students/colleges/companies row depending on that role.

create type user_role as enum ('student', 'college', 'company');

create table if not exists colleges (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  code        text not null unique,           -- e.g. 'NITJ' — used to build student login IDs
  created_at  timestamptz not null default now()
);

create table if not exists companies (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  created_at  timestamptz not null default now()
);

create table if not exists profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  role        user_role not null,
  full_name   text,
  college_id  uuid references colleges (id),
  company_id  uuid references companies (id),
  created_at  timestamptz not null default now()
);

-- Auto-create a profile row whenever someone signs up via Supabase Auth.
-- Pass role / full_name / college_id / company_id in the signup call's
-- `options.data` (raw_user_meta_data) — see server/routes/auth.js.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, role, full_name, college_id, company_id)
  values (
    new.id,
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'student'),
    new.raw_user_meta_data->>'full_name',
    nullif(new.raw_user_meta_data->>'college_id', '')::uuid,
    nullif(new.raw_user_meta_data->>'company_id', '')::uuid
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 2. STUDENT PROFILE DATA (skills, certifications, projects) — the inputs
--    that feed the points/leaderboard formula
-- ---------------------------------------------------------------------------

create table if not exists students (
  id           uuid primary key references profiles (id) on delete cascade,
  college_id   uuid references colleges (id),
  branch       text,
  year         text,
  verified     boolean not null default false,
  resume_url   text,
  created_at   timestamptz not null default now()
);

create table if not exists skills (
  id    serial primary key,
  name  text not null unique,
  type  text not null check (type in ('technical', 'soft'))
);

create table if not exists student_skills (
  student_id  uuid references students (id) on delete cascade,
  skill_id    int references skills (id) on delete cascade,
  primary key (student_id, skill_id)
);

create table if not exists certifications (
  id          serial primary key,
  student_id  uuid references students (id) on delete cascade,
  name        text not null,
  issuer      text
);

create table if not exists projects (
  id          serial primary key,
  student_id  uuid references students (id) on delete cascade,
  title       text not null,
  description text
);

-- ---------------------------------------------------------------------------
-- 3. JOBS / APPLICATIONS (so the leaderboard can sit next to match scoring)
-- ---------------------------------------------------------------------------

create table if not exists jobs (
  id             uuid primary key default gen_random_uuid(),
  company_id     uuid references companies (id) on delete cascade,
  title          text not null,
  type           text not null check (type in ('Internship', 'Job')),
  location       text,
  pay            text,
  description    text,
  posted_date    date not null default current_date
);

create table if not exists job_required_skills (
  job_id    uuid references jobs (id) on delete cascade,
  skill_id  int references skills (id) on delete cascade,
  weight    int not null default 1,
  primary key (job_id, skill_id)
);

create table if not exists applications (
  id              uuid primary key default gen_random_uuid(),
  student_id      uuid references students (id) on delete cascade,
  job_id          uuid references jobs (id) on delete cascade,
  status          text not null default 'Applied'
                  check (status in ('Applied','Shortlisted','Interview','Selected','Rejected')),
  applied_date    date not null default current_date,
  match_at_apply  int
);

-- ---------------------------------------------------------------------------
-- 4. LEADERBOARD / RANK SYSTEM
-- ---------------------------------------------------------------------------
-- Mirrors the frontend's computePoints() formula:
--   +10 per technical skill, +5 per soft skill, +15 per certification,
--   +20 per project, +10 for a resume, +25 for college verification.
-- Implemented as a view so rank always reflects live data — no separate
-- job/cron needed to keep it in sync.

create or replace view student_points as
select
  s.id                                                            as student_id,
  s.college_id,
  coalesce(count(*) filter (where sk.type = 'technical'), 0) * 10
    + coalesce(count(*) filter (where sk.type = 'soft'), 0) * 5
    + coalesce((select count(*) from certifications c where c.student_id = s.id), 0) * 15
    + coalesce((select count(*) from projects p where p.student_id = s.id), 0) * 20
    + (case when s.resume_url is not null then 10 else 0 end)
    + (case when s.verified then 25 else 0 end)                    as points
from students s
left join student_skills ss on ss.student_id = s.id
left join skills sk on sk.id = ss.skill_id
group by s.id, s.college_id, s.resume_url, s.verified;

create or replace view student_leaderboard as
select
  student_id,
  college_id,
  points,
  rank() over (order by points desc)                     as global_rank,
  rank() over (partition by college_id order by points desc) as college_rank
from student_points;

-- ---------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (baseline — tighten per your rules)
-- ---------------------------------------------------------------------------

alter table profiles enable row level security;
alter table students enable row level security;
alter table applications enable row level security;

-- Everyone can read their own profile; colleges/companies read via service role.
create policy "profiles: read own" on profiles
  for select using (auth.uid() = id);

-- Students can read & update their own row; the leaderboard views above
-- read through them with the service-role key from the Node server, so
-- ranking still works even with RLS locked down.
create policy "students: read own" on students
  for select using (auth.uid() = id);
create policy "students: update own" on students
  for update using (auth.uid() = id);

-- A student can see their own applications; recruiters see applications to
-- their own jobs (checked via companies -> jobs join).
create policy "applications: student reads own" on applications
  for select using (auth.uid() = student_id);
