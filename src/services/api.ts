const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export class ApiService {
  private static instance: ApiService;
  private cache: Map<string, CacheItem<unknown>>;

  private constructor() {
    this.cache = new Map();
    this.loadCacheFromStorage();
  }

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private loadCacheFromStorage() {
    const cachedData = localStorage.getItem('apiCache');
    if (cachedData) {
      this.cache = new Map(JSON.parse(cachedData));
    }
  }

  private saveCacheToStorage() {
    localStorage.setItem('apiCache', JSON.stringify(Array.from(this.cache.entries())));
  }

  private isCacheValid(cacheKey: string): boolean {
    const cached = this.cache.get(cacheKey);
    if (!cached) return false;
    return Date.now() - cached.timestamp < CACHE_DURATION;
  }

  private setCacheItem<T>(key: string, data: T) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
    this.saveCacheToStorage(); // Save cache to localStorage
  }

  async fetchWithCache<T>(url: string, cacheKey: string): Promise<T> {
    // Check cache first
    if (this.isCacheValid(cacheKey)) {
      console.log('Returning cached data for:', cacheKey);
      return this.cache.get(cacheKey)!.data as T;
    }

    // If not in cache or expired, fetch new data
    console.log('Fetching fresh data for:', cacheKey);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    this.setCacheItem(cacheKey, data);
    return data;
  }

  // Optional: Clear cache for a specific key
  clearCache(cacheKey: string) {
    this.cache.delete(cacheKey);
    this.saveCacheToStorage(); // Save updated cache to localStorage
  }

  // Optional: Clear entire cache
  clearAllCache() {
    this.cache.clear();
    localStorage.removeItem('apiCache'); // Remove cache from localStorage
  }

  // Optional: Inspect cache
  inspectCache() {
    console.log('Current Cache Contents:');
    this.cache.forEach((value, key) => {
      console.log(`Key: ${key}`);
      console.log(`Data:`, value.data);
      console.log(`Timestamp: ${new Date(value.timestamp).toLocaleString()}`);
      console.log('---');
    });
  }
}