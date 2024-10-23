const Sneaker = require('../models/Sneaker');

// Helper Functions
const parseQueryParams = (query) => ({
  page: parseInt(query.page) || 1,
  limit: parseInt(query.limit) || 12,
  brands: query.brands ? query.brands.split(',') : [],
  sortOrder: query.sortOrder || 'default',
  searchQuery: query.search || ''
});

const buildMongoQuery = (brands, searchQuery) => {
  let query = {};
  if (brands.length > 0) query.brand = { $in: brands };
  if (searchQuery) query.name = { $regex: searchQuery, $options: 'i' };
  return query;
};

const getSortOrder = (sortOrder) => {
  if (sortOrder === 'highToLow') return { price: -1 };
  if (sortOrder === 'lowToHigh') return { price: 1 };
  return {};
};

// Controller Functions
exports.getAllSneakers = async (req, res) => {
  try {
    const { page, limit, brands, sortOrder, searchQuery } = parseQueryParams(req.query);
    const query = buildMongoQuery(brands, searchQuery);
    const sort = getSortOrder(sortOrder);

    const [totalSneakers, sneakers] = await Promise.all([
      Sneaker.countDocuments(query),
      Sneaker.find(query).sort(sort).skip((page - 1) * limit).limit(limit).lean()
    ]);

    const result = {
      sneakers,
      currentPage: page,
      totalPages: Math.ceil(totalSneakers / limit),
      totalSneakers
    };

    res.json(result);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getSneakerById = async (req, res) => {
  try {
    const sneaker = await Sneaker.findById(req.params.id);
    if (!sneaker) return res.status(404).json({ message: 'Sneaker not found' });
    res.json(sneaker);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getBrands = async (req, res) => {
  try {
    const [brands, counts] = await Promise.all([
      Sneaker.distinct('brand'),
      Sneaker.aggregate([{ $group: { _id: '$brand', count: { $sum: 1 } } }])
    ]);

    const brandCounts = counts.reduce((acc, { _id, count }) => {
      acc[_id] = count;
      return acc;
    }, {});

    const result = { brands, counts: brandCounts };
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
