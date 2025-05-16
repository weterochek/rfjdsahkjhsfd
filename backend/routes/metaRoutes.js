const express = require('express');
const router = express.Router();
const ProductType = require('../models/ProductType');
const MaterialType = require('../models/MaterialType');

// Все типы продукции
router.get('/types', async (req, res) => {
  try {
    const types = await ProductType.find();
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Все типы материалов
router.get('/materials', async (req, res) => {
  try {
    const materials = await MaterialType.find();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
