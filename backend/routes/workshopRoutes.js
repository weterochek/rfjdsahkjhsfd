// backend/routes/workshopRoutes.js
const express = require('express');
const router = express.Router();
const Workshop = require('../models/Workshop');
const ProductWorkshop = require('../models/ProductWorkshop');
const Product = require('../models/Product');
const mongoose = require('mongoose');


// Получить все цехи
router.get('/', async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.json(workshops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Добавить новый цех (опционально)
router.post('/', async (req, res) => {
  try {
    const { name, workerCount } = req.body;
    const newWorkshop = new Workshop({ name, workerCount });
    await newWorkshop.save();
    res.status(201).json(newWorkshop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/product-info/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Некорректный productId' });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Продукт не найден' });

    const relations = await ProductWorkshop.find({ productId }).populate('workshopId');

    const workshops = relations.map(r => ({
      name: r.workshopId.name,
      workerCount: r.workshopId.workerCount,
      timeHours: r.timeHours
    }));

    const totalTime = workshops.reduce((sum, w) => sum + (w.timeHours || 0), 0);

    res.json({
      product: {
        article: product.article,
        name: product.name,
        minPrice: product.minPrice,
        material: product.material
      },
      workshops,
      totalTime
    });
  } catch (err) {
    console.error('Ошибка в /product-info/:productId:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получить один цех по ID
router.get('/:id', async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) return res.status(404).json({ error: 'Цех не найден' });
    res.json(workshop);
  } catch (err) {
    res.status(400).json({ error: 'Неверный ID' });
  }
});

// Обновить цех
router.put('/:id', async (req, res) => {
  try {
    const updated = await Workshop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Цех не найден' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Удалить цех
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Workshop.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Цех не найден' });
    res.json({ message: 'Цех удалён' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
