// Файл: backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const calcRoutes = require('./routes/calcRoutes');
const metaRoutes = require('./routes/metaRoutes');
const productRoutes = require('./routes/productRoutes');
const workshopRoutes = require('./routes/workshopRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Маршруты
app.use('/api/meta', metaRoutes);
app.use('/api/products', productRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/calc', calcRoutes);
app.use('/api', calcRoutes);

// Подключение к MongoDB
mongoose.connect(
  process.env.MONGO_URI || 'mongodb://BASE_crosschart:0b68e39d0c4803ed95a748cbb69a3c0c1899c770@ios8q.h.filess.io:61004/BASE_crosschart'
).then(() => {
  console.log('MongoDB connected');
  app.listen(3000, () => console.log('Server started on port 3000'));
}).catch(err => console.error(err));