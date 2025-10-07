const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const rbac = require('../middleware/rbac.middleware');
const { index, store, show, update, remove } = require('../controllers/product.controller');

router.get('/', index); // public listing
router.get('/:id', show);

router.use(auth); // following routes require auth
router.post('/', rbac(['admin','manager']), store);
router.patch('/:id', rbac(['admin','manager']), update);
router.delete('/:id', rbac(['admin']), remove);

module.exports = router;

