const Sneaker = require('../models/Sneaker');

// Get all sneakers
exports.getAllSneakers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const brands = req.query.brands ? req.query.brands.split(',') : [];

    let query = brands.length > 0 ? { brand: { $in: brands } } : {};

    const totalSneakers = await Sneaker.countDocuments(query);
    const sneakers = await Sneaker.find(query).skip((page - 1) * limit).limit(limit).lean();

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
    const counts = await Sneaker.aggregate([
      { $group: { _id: '$brand', count: { $sum: 1 } } }
    ]);
    const brandCounts = counts.reduce((acc, { _id, count }) => {
      acc[_id] = count;
      return acc;
    }, {});
    res.json({ brands, counts: brandCounts });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
