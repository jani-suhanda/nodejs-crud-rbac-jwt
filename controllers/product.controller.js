const { createProduct, listProducts, getProduct, updateProduct, deleteProduct } = require('../models/queries');

const index = async (req, res) => {
  const products = await listProducts();
  res.json({ products });
};

const store = async (req, res) => {
  const data = { ...req.body, created_by: req.user.id };
  const p = await createProduct(data);
  res.status(201).json({ product: p });
};

const show = async (req, res) => {
  const p = await getProduct(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json({ product: p });
};

const update = async (req, res) => {
  const p = await updateProduct(req.params.id, req.body);
  res.json({ product: p });
};

const remove = async (req, res) => {
  await deleteProduct(req.params.id);
  res.json({ message: 'Deleted' });
};

module.exports = { index, store, show, update, remove };
