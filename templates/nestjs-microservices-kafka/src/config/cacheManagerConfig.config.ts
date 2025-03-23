import { CacheModuleOptions } from '@/imports';
import envConfig from './envConfig.config';

const cacheManagerConfig: CacheModuleOptions = {
  isGlobal: true,
  ttl: parseInt(envConfig.CACHE_MANAGER_TTL_LIMIT) | 1000000,
  max: parseInt(envConfig.CACHE_MANAGER_MAX_LIMIT) | 1000000,
};
export default cacheManagerConfig;
