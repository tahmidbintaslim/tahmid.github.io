import { kv } from '@vercel/kv';

/**
 * Cache management utility using Vercel KV (Redis)
 * Already have KV_URL configured in .env.local
 */

export interface CacheOptions {
  ttl?: number; // Time to live in seconds
}

export const cache = {
  /**
   * Get value from cache
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await kv.get<T>(key);
      return value === null ? null : value;
    } catch (error) {
      console.warn(`Cache get failed for key ${key}:`, error);
      return null;
    }
  },

  /**
   * Set value in cache
   */
  async set<T>(key: string, value: T, options?: CacheOptions): Promise<void> {
    try {
      if (options?.ttl) {
        await kv.setex(key, options.ttl, value);
      } else {
        await kv.set(key, value);
      }
    } catch (error) {
      console.warn(`Cache set failed for key ${key}:`, error);
    }
  },

  /**
   * Delete value from cache
   */
  async delete(key: string): Promise<void> {
    try {
      await kv.del(key);
    } catch (error) {
      console.warn(`Cache delete failed for key ${key}:`, error);
    }
  },

  /**
   * Clear cache pattern (e.g., "blog:*")
   */
  async deletePattern(pattern: string): Promise<void> {
    try {
      const keys = await kv.keys(pattern);
      if (keys.length > 0) {
        await kv.del(...keys);
      }
    } catch (error) {
      console.warn(`Cache pattern delete failed for ${pattern}:`, error);
    }
  },

  /**
   * Get or set (memoization pattern)
   */
  async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    options?: CacheOptions
  ): Promise<T> {
    // Try to get from cache first
    const cached = await cache.get<T>(key);
    if (cached) {
      return cached;
    }

    // If not in cache, fetch and store
    const value = await fetcher();
    await cache.set(key, value, options);
    return value;
  },
};

/**
 * Cache keys helper - keeps cache keys consistent
 */
export const cacheKeys = {
  // Blog posts
  blog: (platform: string) => `blog:${platform}`,
  allBlog: () => 'blog:all',

  // News
  news: (source?: string) => (source ? `news:${source}` : 'news:all'),

  // Weather
  weather: (lat: string, lon: string) => `weather:${lat}:${lon}`,

  // Location
  location: (ip: string) => `location:${ip}`,
  locationCoords: (lat: number, lon: number) => `location:coords:${lat}:${lon}`,

  // User sessions
  session: (id: string) => `session:${id}`,

  // Rate limits
  rateLimit: (endpoint: string, ip: string) => `ratelimit:${endpoint}:${ip}`,
};

/**
 * Cache TTLs (Time To Live in seconds)
 */
export const cacheTTL = {
  short: 5 * 60, // 5 minutes
  medium: 30 * 60, // 30 minutes
  long: 60 * 60, // 1 hour
  veryLong: 24 * 60 * 60, // 24 hours
  day: 24 * 60 * 60, // 1 day
  week: 7 * 24 * 60 * 60, // 1 week
};
