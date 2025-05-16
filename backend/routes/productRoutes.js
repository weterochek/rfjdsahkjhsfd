// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const MaterialType = require('../models/MaterialType');

// Получить один продукт по ID
router.get('/:id/waste-percent', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Продукт не найден' });

    const materialType = await MaterialType.findOne({ materialName: product.material });
    if (!materialType) return res.status(404).json({ error: 'Материал не найден' });

    res.json({ wastePercent: parseFloat((materialType.wastePercent * 100).toFixed(2)) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Продукт не найден' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: 'Неверный ID' });
  }
});
// Получить все продукты
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Добавить новый продукт
router.post('/', async (req, res) => {
  try {
    const { article, type, name, minPrice, material } = req.body;
    const newProduct = new Product({ article, type, name, minPrice, material });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Обновить продукт
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
