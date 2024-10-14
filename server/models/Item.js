import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  colorway: { type: String, required: true },
  imgUrl: { type: String, required: true }
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

export default Item;
