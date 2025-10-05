const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail, findRoleByName } = require('../models/queries');
const { hash, compare } = require('../utils/hash');

const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  const exists = await findUserByEmail(email);
  if (exists) return res.status(400).json({ message: 'Email already used' });

  let roleRow = null;
  if (role) roleRow = await findRoleByName(role);
  const role_id = roleRow ? roleRow.id : undefined;

  const hashed = await hash(password);
  const user = await createUser({ username, email, password: hashed, role_id });
  res.status(201).json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const payload = { sub: user.id, role_id: user.role_id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
  res.json({ token });
};

module.exports = { register, login };
