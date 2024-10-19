const redis = require('redis');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const redisClient = redis.createClient({
  url: `redis://${isProduction ? process.env.PROD_REDIS_HOST : process.env.DEV_REDIS_HOST}:${isProduction ? process.env.PROD_REDIS_PORT : process.env.DEV_REDIS_PORT}`,
  password: isProduction ? process.env.PROD_REDIS_PASSWORD : undefined
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.connect().catch(console.error);

module.exports = redisClient;
