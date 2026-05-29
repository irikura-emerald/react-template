import { createClient } from "redis";

const globalForRedis = global as unknown as {
    redis: ReturnType<typeof createClient>;
};

export const redis =
    globalForRedis.redis ||
    createClient({
        url: process.env.REDIS_URL || "redis://localhost:6379",
    });

if (!globalForRedis.redis) {
    redis.connect();
    globalForRedis.redis = redis;
}