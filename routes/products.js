const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const requireAdmin = require('../middlewares/requireAdmin');
const { products, addProduct } = require('../utils/dataStore');

const router = express.Router();

// GET /api/products
router.get('/', verifyToken, (req, res) => {
  return res.status(200).json(products);
});

// POST /api/products (admin only)
router.post('/', verifyToken, requireAdmin, (req, res) => {
  const { name, price } = req.body;
  if (!name || price === undefined) return res.status(400).json({ message: 'Missing fields' });

  const product = addProduct({ name, price });
  return res.status(201).json({ message: 'Product created', product });
});

module.exports = router;
