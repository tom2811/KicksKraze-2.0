import Item from '../models/Item.js';
import cacheService from '../services/cacheService.js';

export const getItems = async (req, res) => {
  try {
    const cachedItems = await cacheService.get('items');
    if (cachedItems) {
      return res.json(JSON.parse(cachedItems));
    }
    
    const items = await Item.find();
    await cacheService.set('items', JSON.stringify(items), 3600);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    await cacheService.del('items');
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
