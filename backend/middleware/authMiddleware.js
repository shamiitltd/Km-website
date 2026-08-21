const requireAdminPassword = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'; // Fallback for dev

  if (token !== adminPassword) {
    return res.status(403).json({ error: 'Forbidden: Incorrect password' });
  }

  next();
};

module.exports = { requireAdminPassword };
