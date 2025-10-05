const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const hash = async (plain) => {
  return bcrypt.hash(plain, SALT_ROUNDS);
};

const compare = async (plain, hashed) => {
  return bcrypt.compare(plain, hashed);
};

module.exports = { hash, compare };
