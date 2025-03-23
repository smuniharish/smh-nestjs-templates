import { CACHE_MANAGER, Injectable, Inject, Cache } from '@/imports';

@Injectable()
export class CachingService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async getFromCache(key: string) {
    const result = await this.cacheManager.get(key);
    return result;
  }
  async setToCache(key: string, value: any) {
    await this.cacheManager.set(key, value);
    const result = await this.getFromCache(key);
    return result;
  }
}
