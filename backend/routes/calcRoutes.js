const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const ProductType = require('../models/ProductType');
const MaterialType = require('../models/MaterialType');

router.post('/raw-material', async (req, res) => {
  try {
    const { productId, quantity, size, wastePercent = 0 } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Неверные параметры: productId и quantity обязательны и quantity > 0' });
    }

    // Находим продукт в базе
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Продукт не найден' });

    // Получаем тип продукции из базы по product.type
    const productType = await ProductType.findOne({ typeName: product.type });
    if (!productType) return res.status(404).json({ error: 'Тип продукции не найден' });

    // Получаем тип материала из базы по product.material
    const materialType = await MaterialType.findOne({ materialName: product.material });
    if (!materialType) return res.status(404).json({ error: 'Материал не найден' });

    // Вычисляем базовое количество (объем)
    let baseAmount = 1;
    if (size && typeof size.length === 'number' && typeof size.width === 'number' && typeof size.height === 'number') {
      baseAmount = size.length * size.width * size.height;
    }


    // wastePercent с клиента - в процентах, делим на 100
    let total = baseAmount * quantity * productType.coefficient * (1 + materialType.wastePercent + wastePercent / 100);

    // Округляем до 3 знаков после запятой (если нужно точнее)
    total = parseFloat((total).toFixed(2));


    res.json({ productId, quantity, totalRawMaterial: total });

  } catch (err) {
    console.error('Ошибка в /raw-material:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});
router.get('/products/:id/waste-percent', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Продукт не найден' });

    const materialType = await MaterialType.findOne({ materialName: product.material });
    if (!materialType) return res.status(404).json({ error: 'Материал не найден' });

    // Умножаем на 100, чтобы вернуть процент, а не долю
    res.json({ wastePercent: parseFloat((materialType.wastePercent * 100).toFixed(2)) });
  } catch (err) {
    console.error('Ошибка в /products/:id/waste-percent:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


module.exports = router;
