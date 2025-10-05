const pool = require('../config/db');

// Roles
const findRoleByName = async (name) => {
  const res = await pool.query('SELECT * FROM roles WHERE name = $1', [name]);
  return res.rows[0];
};

// Users
const createUser = async ({ username, email, password, role_id }) => {
  const res = await pool.query(
    `INSERT INTO users (username, email, password, role_id) VALUES ($1,$2,$3,$4) RETURNING id, username, email, role_id, created_at`,
    [username, email, password, role_id || 3]
  );
  return res.rows[0];
};

const findUserByEmail = async (email) => {
  const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
};

const findUserById = async (id) => {
  const res = await pool.query('SELECT u.id, u.username, u.email, r.name as role FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = $1', [id]);
  return res.rows[0];
};

const listUsers = async () => {
  const res = await pool.query('SELECT u.id, u.username, u.email, r.name as role, u.created_at FROM users u JOIN roles r ON u.role_id = r.id ORDER BY u.id');
  return res.rows;
};

const updateUserRole = async (id, role_id) => {
  const res = await pool.query('UPDATE users SET role_id = $1 WHERE id = $2 RETURNING id, username, email, role_id', [role_id, id]);
  return res.rows[0];
};

const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
  return true;
};

// Products
const createProduct = async ({ name, description, price, created_by }) => {
  const res = await pool.query(`INSERT INTO products (name, description, price, created_by) VALUES ($1,$2,$3,$4) RETURNING *`, [name, description, price, created_by]);
  return res.rows[0];
};

const listProducts = async () => {
  const res = await pool.query('SELECT p.*, u.username as creator FROM products p LEFT JOIN users u ON p.created_by = u.id ORDER BY p.id');
  return res.rows;
};

const getProduct = async (id) => {
  const res = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return res.rows[0];
};

const updateProduct = async (id, fields) => {
  const keys = Object.keys(fields);
  const values = Object.values(fields);
  if (!keys.length) return null;
  const setString = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
  const res = await pool.query(`UPDATE products SET ${setString} WHERE id = $${keys.length + 1} RETURNING *`, [...values, id]);
  return res.rows[0];
};

const deleteProduct = async (id) => {
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
  return true;
};

module.exports = {
  findRoleByName, createUser, findUserByEmail, findUserById, listUsers, updateUserRole, deleteUser,
  createProduct, listProducts, getProduct, updateProduct, deleteProduct
};
