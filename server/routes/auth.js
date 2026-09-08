const express = require('express');
const { supabaseAnon } = require('../supabaseClient');

const router = express.Router();

/**
 * POST /api/auth/signup
 * body: { email, password, fullName, role: 'student'|'college'|'company', collegeId?, companyId? }
 *
 * Creates the auth.users row via Supabase Auth. The `handle_new_user()`
 * trigger in supabase/schema.sql reads the metadata below and creates the
 * matching `profiles` row automatically.
 */
router.post('/signup', async (req, res) => {
  const { email, password, fullName, role, collegeId, companyId } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ error: 'email, password and role are required' });
  }

  const { data, error } = await supabaseAnon.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
        full_name: fullName || null,
        college_id: collegeId || null,
        company_id: companyId || null,
      },
    },
  });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ user: data.user, session: data.session });
});

/**
 * POST /api/auth/login
 * body: { email, password }
 * Returns a Supabase session (access_token) the frontend stores and sends
 * back as `Authorization: Bearer <token>` on subsequent requests.
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabaseAnon.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: error.message });
  res.json({ user: data.user, session: data.session });
});

/** POST /api/auth/logout — body: { accessToken } */
router.post('/logout', async (req, res) => {
  const { error } = await supabaseAnon.auth.signOut();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ ok: true });
});

module.exports = router;
