const Sneaker = require('../models/Sneaker');

// Get all sneakers
exports.getAllSneakers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const brand = req.query.brand || '';
    const skip = (page - 1) * limit;

    let query = brand ? { brand } : {};

    const totalSneakers = await Sneaker.countDocuments(query);
    const sneakers = await Sneaker.find(query).skip(skip).limit(limit).lean();

    res.json({
      sneakers,
      currentPage: page,
      totalPages: Math.ceil(totalSneakers / limit),
      totalSneakers
    });
  } catch (error) {
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
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getBrands = async (req, res) => {
  try {
    const brands = await Sneaker.distinct('brand');
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
