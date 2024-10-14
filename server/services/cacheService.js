import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

let redis;

const cacheService = {
  connect: () => {
    redis = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
    });
    redis.on('connect', () => console.log('Redis connected'));
    redis.on('error', (error) => console.error('Redis error:', error));
  },
  get: async (key) => {
    if (!redis) return null;
    return redis.get(key);
  },
  set: async (key, value, expiry) => {
    if (!redis) return;
    return redis.set(key, JSON.stringify(value), 'EX', expiry);
  },
  del: async (key) => {
    if (!redis) return;
    return redis.del(key);
  }
};

export default cacheService;
