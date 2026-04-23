const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const mockProducts = require('../mockData');

const router = express.Router();
const isDatabaseReady = () => mongoose.connection.readyState === 1;

// Get all products
router.get('/', async (req, res) => {
  if (!isDatabaseReady()) {
    return res.json(mockProducts);
  }

  try {
    const products = await Product.find({});
    if (products.length === 0) {
      return res.json(mockProducts);
    }
    res.json(products);
  } catch (err) {
    console.log('Database error, using mock data:', err.message);
    // If DB error, return mock data
    res.json(mockProducts);
  }
});

// Get product by id
router.get('/:id', async (req, res) => {
  if (!isDatabaseReady()) {
    const mockProduct = mockProducts.find(p => p._id === req.params.id);
    if (!mockProduct) return res.status(404).json({ message: 'Product not found' });
    return res.json(mockProduct);
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      // Try mock data
      const mockProduct = mockProducts.find(p => p._id === req.params.id);
      if (!mockProduct) return res.status(404).json({ message: 'Product not found' });
      return res.json(mockProduct);
    }
    res.json(product);
  } catch (err) {
    console.log('Database error, using mock data:', err.message);
    // Fallback to mock data
    const mockProduct = mockProducts.find(p => p._id === req.params.id);
    if (!mockProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(mockProduct);
  }
});

// Create product (admin)
router.post('/', async (req, res) => {
  const { name, description, price, image, category, countInStock } = req.body;
  try {
    const product = new Product({ name, description, price, image, category, countInStock });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
