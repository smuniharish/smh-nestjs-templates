import { BullRootModuleOptions } from '@/imports';
import envConfig from './envConfig.config';

const bullConfig: BullRootModuleOptions = {
  defaultJobOptions: {
    removeOnComplete: {
      age: 3600, // keep up to 1 hour
      count: 1000, // keep up to 1000 jobs
    },
    removeOnFail: {
      age: 48 * 3600, // keep up to 24 hours
      count: 1000 * 2,
    },
  },
  connection: {
    host: envConfig.BULL_REDIS_HOST,
    port: parseInt(envConfig.BULL_REDIS_PORT) || 6379,
  },
};
export default bullConfig;
