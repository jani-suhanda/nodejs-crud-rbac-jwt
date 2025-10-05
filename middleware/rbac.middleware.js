// rolesAllowed: array of role names allowed e.g. ['admin','manager']
const rbac = (rolesAllowed = []) => {
  return (req, res, next) => {
    const userRole = req.user && req.user.role;
    if (!userRole) return res.status(403).json({ message: 'Forbidden' });
    if (rolesAllowed.includes(userRole)) return next();
    return res.status(403).json({ message: 'Forbidden' });
  };
};

module.exports = rbac;
