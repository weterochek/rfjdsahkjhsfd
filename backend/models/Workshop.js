const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },               // Добавил поле типа цеха
  workerCount: { type: Number, required: true, min: 1 }
});

module.exports = mongoose.model('Workshop', workshopSchema);
