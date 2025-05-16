const ProductType = require('../models/ProductType');
const MaterialType = require('../models/MaterialType');

// Получить все типы продукции
router.get('/types/all', async (req, res) => {
  try {
    const types = await ProductType.find();
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получить все типы материалов
router.get('/materials/all', async (req, res) => {
  try {
    const materials = await MaterialType.find();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
