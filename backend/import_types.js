const mongoose = require('mongoose');
const ProductType = require('./models/ProductType');
const MaterialType = require('./models/MaterialType');
const fs = require('fs');

mongoose.connect('mongodb://BASE_crosschart:0b68e39d0c4803ed95a748cbb69a3c0c1899c770@ios8q.h.filess.io:61004/BASE_crosschart', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    importProductTypes();
    importMaterialTypes();
  })
  .catch(console.error);

async function importProductTypes() {
  const data = JSON.parse(fs.readFileSync('Product_type_import.json', 'utf8'));
  for (const item of data) {
    const doc = {
      typeName: item['Тип продукции'],
      coefficient: item['Коэффициент типа продукции']
    };
    try {
      await ProductType.updateOne({ typeName: doc.typeName }, doc, { upsert: true });
      console.log('Импортирован тип продукции:', doc.typeName);
    } catch (err) {
      console.error('Ошибка импорта типа продукции:', err);
    }
  }
}

async function importMaterialTypes() {
  const data = JSON.parse(fs.readFileSync('Material_type_import.json', 'utf8'));
  for (const item of data) {
    const doc = {
      materialName: item['Тип материала'],
      wastePercent: item['Процент потерь сырья']
    };
    try {
      await MaterialType.updateOne({ materialName: doc.materialName }, doc, { upsert: true });
      console.log('Импортирован тип материала:', doc.materialName);
    } catch (err) {
      console.error('Ошибка импорта типа материала:', err);
    }
  }
}
