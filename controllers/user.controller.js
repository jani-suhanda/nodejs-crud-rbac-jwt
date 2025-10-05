const { listUsers, findUserById, updateUserRole, deleteUser } = require('../models/queries');

const index = async (req, res) => {
  const users = await listUsers();
  res.json({ users });
};

const show = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json({ user });
};

const changeRole = async (req, res) => {
  const { role_id } = req.body;
  const updated = await updateUserRole(req.params.id, role_id);
  res.json({ user: updated });
};

const remove = async (req, res) => {
  await deleteUser(req.params.id);
  res.json({ message: 'Deleted' });
};

module.exports = { index, show, changeRole, remove };
