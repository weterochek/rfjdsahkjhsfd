const mongoose = require('mongoose');

const ProductTypeSchema = new mongoose.Schema({
  typeName: { type: String, required: true },
  coefficient: { type: Number, required: true }
});

module.exports = mongoose.model('ProductType', ProductTypeSchema);
