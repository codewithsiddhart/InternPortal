const { supabaseAnon } = require('../supabaseClient');

// Verifies the `Authorization: Bearer <access_token>` header against
// Supabase Auth and attaches the resolved user to req.user.
async function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing bearer token' });

  const { data, error } = await supabaseAnon.auth.getUser(token);
  if (error || !data.user) return res.status(401).json({ error: 'Invalid or expired token' });

  req.user = data.user;
  next();
}

module.exports = requireAuth;
