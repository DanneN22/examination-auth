function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ message: 'Missing auth token' });
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin required' });
  next();
}

module.exports = requireAdmin;
