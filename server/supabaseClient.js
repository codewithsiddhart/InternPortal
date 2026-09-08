const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Service-role client: full DB access, used ONLY on the server (never ship
// the service role key to the browser). Used for admin-ish work like
// reading the leaderboard views regardless of RLS.
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Anon client: used to run auth calls (signUp / signInWithPassword) the same
// way the frontend would, so sessions/tokens behave normally.
const supabaseAnon = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = { supabaseAdmin, supabaseAnon };
