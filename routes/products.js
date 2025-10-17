const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const requireAdmin = require('../middlewares/requireAdmin');


const router = express.Router();


const products = [];


router.get('/', verifyToken, (req, res) => {
res.status(200).json(products);
});


router.post('/', verifyToken, requireAdmin, (req, res) => {
const { name, price } = req.body;
if (!name || price === undefined) return res.status(400).json({ message: 'Missing fields' });


const newProduct = { id: Date.now().toString(), name, price };
products.push(newProduct);
res.status(201).json({ message: 'Product created successfully', product: newProduct });
});


module.exports = { router, products };