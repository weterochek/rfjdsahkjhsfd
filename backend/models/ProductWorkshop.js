const mongoose = require('mongoose');

const productWorkshopSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  workshopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workshop', required: true },
  timeHours: { type: Number, required: true, min: 0 }
});

module.exports = mongoose.model('ProductWorkshop', productWorkshopSchema);
