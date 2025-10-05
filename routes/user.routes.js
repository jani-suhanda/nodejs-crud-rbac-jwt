const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const rbac = require('../middleware/rbac.middleware');
const { index, show, changeRole, remove } = require('../controllers/user.controller');

router.use(auth);
router.get('/', rbac(['admin','manager']), index);
router.get('/:id', rbac(['admin','manager','user']), show);
router.patch('/:id/role', rbac(['admin']), changeRole);
router.delete('/:id', rbac(['admin']), remove);

module.exports = router;
