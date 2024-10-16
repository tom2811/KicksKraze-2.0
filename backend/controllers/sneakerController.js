const Sneaker = require('../models/Sneaker');

// Get all sneakers
exports.getAllSneakers = async (req, res) => {
  try {
    console.log('Attempting to fetch sneakers from database...');
    const sneakers = await Sneaker.find().lean();
    console.log(`Found ${sneakers.length} sneakers:`, sneakers);
    res.json(sneakers);
  } catch (error) {
    console.error('Error in getAllSneakers:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get single sneaker by ID
exports.getSneakerById = async (req, res) => {
  try {
    const sneakerId = parseInt(req.params.id);
    const sneaker = await Sneaker.findOne({ id: sneakerId }).select('-_id id name price colorway imgUrl');
    if (!sneaker) {
      return res.status(404).json({ message: 'Sneaker not found' });
    }
    res.json(sneaker);
  } catch (error) {
    console.error('Error in getSneakerById:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
