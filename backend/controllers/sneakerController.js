const Sneaker = require('../models/Sneaker');

// Get all sneakers
exports.getAllSneakers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const brand = req.query.brand;

    const query = brand ? { brand } : {};
    const skip = (page - 1) * limit;

    const [sneakers, total] = await Promise.all([
      Sneaker.find(query).skip(skip).limit(limit),
      Sneaker.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      sneakers,
      currentPage: page,
      totalPages,
      totalItems: total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get single sneaker by ID
exports.getSneakerById = async (req, res) => {
  try {
    const sneaker = await Sneaker.findById(req.params.id);
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
