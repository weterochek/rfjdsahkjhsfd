const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  article: { type: String, required: true },
  type: { type: String, required: true }, // можешь позже заменить на ObjectId
  name: { type: String, required: true },
  minPrice: { type: Number, required: true },
  material: { type: String, required: true }, // можешь позже заменить на ObjectId
});

module.exports = mongoose.model('Product', ProductSchema);
