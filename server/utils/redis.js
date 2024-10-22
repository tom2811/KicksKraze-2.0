const redis = require('redis');
require('dotenv').config();

// Environment configuration
const isProduction = process.env.NODE_ENV === 'production';

// Redis configuration
const redisConfig = {
  url: `redis://${isProduction ? process.env.PROD_REDIS_HOST : process.env.DEV_REDIS_HOST}:${isProduction ? process.env.PROD_REDIS_PORT : process.env.DEV_REDIS_PORT}`
};

// Add password for production environment
if (isProduction && process.env.PROD_REDIS_PASSWORD) {
  redisConfig.password = process.env.PROD_REDIS_PASSWORD;
}

// Create Redis client
const redisClient = redis.createClient(redisConfig);

// Event listeners
redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log(`Connected to Redis (${isProduction ? 'Production' : 'Development'})`);
});

// Connect to Redis
redisClient.connect().catch((err) => {
  console.error('Failed to connect to Redis:', err);
});

module.exports = redisClient;
