import Item from '../models/Item.js';
import redis from '../config/redis.js';

export const getItems = async (req, res) => {
  try {
    console.log('Attempting to fetch items from database');
    const items = await Item.find();
    console.log('Items fetched successfully:', items);
    res.json(items);
  } catch (error) {
    console.error('Error in getItems controller:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message,
      stack: error.stack 
    });
  }
};

export const createItem = async (req, res) => {
  const item = new Item(req.body);
  try {
    const newItem = await item.save();
    // Invalidate cache
    await redis.del('items');
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
