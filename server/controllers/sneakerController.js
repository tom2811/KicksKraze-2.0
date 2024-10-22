const Sneaker = require('../models/Sneaker');
const redisClient = require('../utils/redis');

// Constants
const CACHE_DURATION = 3600; // 1 hour

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

// Cache Helpers
const getCachedData = async (key) => {
  const cachedData = await redisClient.get(key);
  return cachedData ? JSON.parse(cachedData) : null;
};

const setCachedData = async (key, data, duration = CACHE_DURATION) => {
  await redisClient.setEx(key, duration, JSON.stringify(data));
};

// Controller Functions
exports.getAllSneakers = async (req, res) => {
  try {
    const { page, limit, brands, sortOrder, searchQuery } = parseQueryParams(req.query);
    const cacheKey = `sneakers:${page}:${limit}:${brands.join(',')}:${sortOrder}:${searchQuery}`;

    const cachedData = await getCachedData(cacheKey);
    if (cachedData) return res.json(cachedData);

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

    await setCachedData(cacheKey, result);
    res.json(result);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getSneakerById = async (req, res) => {
  try {
    const cacheKey = `sneaker:${req.params.id}`;

    const cachedData = await getCachedData(cacheKey);
    if (cachedData) return res.json(cachedData);

    const sneaker = await Sneaker.findById(req.params.id);
    if (!sneaker) return res.status(404).json({ message: 'Sneaker not found' });

    await setCachedData(cacheKey, sneaker);
    res.json(sneaker);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getBrands = async (req, res) => {
  try {
    const cacheKey = 'brands';

    const cachedData = await getCachedData(cacheKey);
    if (cachedData) return res.json(cachedData);

    const [brands, counts] = await Promise.all([
      Sneaker.distinct('brand'),
      Sneaker.aggregate([{ $group: { _id: '$brand', count: { $sum: 1 } } }])
    ]);

    const brandCounts = counts.reduce((acc, { _id, count }) => {
      acc[_id] = count;
      return acc;
    }, {});

    const result = { brands, counts: brandCounts };

    await setCachedData(cacheKey, result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
