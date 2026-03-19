const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Доступ запрещён' });
  }
  next();
};

module.exports = requireAdmin;
