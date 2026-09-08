const express = require('express');
const { supabaseAdmin } = require('../supabaseClient');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

/**
 * GET /api/leaderboard?scope=global|college&collegeId=<uuid>&limit=20
 * Reads the `student_leaderboard` view (see supabase/schema.sql), which
 * ranks every student by the same points formula the frontend uses:
 * technical skills, soft skills, certifications, projects, resume, and
 * college verification.
 */
router.get('/', requireAuth, async (req, res) => {
  const { scope = 'global', collegeId, limit = 20 } = req.query;

  let query = supabaseAdmin
    .from('student_leaderboard')
    .select(`
      student_id, points, global_rank, college_rank,
      students:students ( id, college_id, verified,
        profiles:profiles ( full_name )
      )
    `)
    .order(scope === 'college' ? 'college_rank' : 'global_rank', { ascending: true })
    .limit(Number(limit));

  if (scope === 'college') {
    if (!collegeId) return res.status(400).json({ error: 'collegeId is required for scope=college' });
    query = query.eq('college_id', collegeId);
  }

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ scope, leaderboard: data });
});

/** GET /api/leaderboard/me — the logged-in student's own rank + points. */
router.get('/me', requireAuth, async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('student_leaderboard')
    .select('student_id, points, global_rank, college_rank')
    .eq('student_id', req.user.id)
    .single();

  if (error) return res.status(404).json({ error: 'No leaderboard row for this student yet' });
  res.json(data);
});

module.exports = router;
