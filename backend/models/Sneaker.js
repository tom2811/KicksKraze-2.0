const mongoose = require('mongoose');

const SneakerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  colorway: String,
  imgUrl: String,
  brand: String
}, { collection: 'items' });

module.exports = mongoose.model('Sneaker', SneakerSchema);
