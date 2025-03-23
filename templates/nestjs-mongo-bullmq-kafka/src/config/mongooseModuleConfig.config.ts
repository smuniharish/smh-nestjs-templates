import { MongooseModuleOptions } from '@/imports';
import envConfig from './envConfig.config';

const mongooseModuleConfig: MongooseModuleOptions = {
  retryAttempts: parseInt(envConfig.DB_RETRY_ATTEMPTS) | 2,
};
export { mongooseModuleConfig };
