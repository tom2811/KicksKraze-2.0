const Sneaker = require('../models/Sneaker');

// Helper function to parse query parameters
const parseQueryParams = (query) => {
  return {
    page: parseInt(query.page) || 1,
    limit: parseInt(query.limit) || 12,
    brands: query.brands ? query.brands.split(',') : [],
    sortOrder: query.sortOrder || 'default',
    searchQuery: query.search || ''
  };
};

// Helper function to build MongoDB query
const buildMongoQuery = (brands, searchQuery) => {
  let query = {};
  if (brands.length > 0) {
    query.brand = { $in: brands };
  }
  if (searchQuery) {
    query.name = { $regex: searchQuery, $options: 'i' };
  }
  return query;
};

// Helper function to determine sort order
const getSortOrder = (sortOrder) => {
  if (sortOrder === 'highToLow') return { price: -1 };
  if (sortOrder === 'lowToHigh') return { price: 1 };
  return {};
};

// Get all sneakers
exports.getAllSneakers = async (req, res) => {
  try {
    const { page, limit, brands, sortOrder, searchQuery } = parseQueryParams(req.query);
    const query = buildMongoQuery(brands, searchQuery);
    const sort = getSortOrder(sortOrder);

    const totalSneakers = await Sneaker.countDocuments(query);
    const sneakers = await Sneaker.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.json({
      sneakers,
      currentPage: page,
      totalPages: Math.ceil(totalSneakers / limit),
      totalSneakers
    });
  } catch (error) {
    console.error("Server error:", error);
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

// Get all brands and their counts
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
