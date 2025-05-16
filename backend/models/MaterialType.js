const mongoose = require('mongoose');

const MaterialTypeSchema = new mongoose.Schema({
  materialName: { type: String, required: true },
  wastePercent: { type: Number, required: true }
});

module.exports = mongoose.model('MaterialType', MaterialTypeSchema);
