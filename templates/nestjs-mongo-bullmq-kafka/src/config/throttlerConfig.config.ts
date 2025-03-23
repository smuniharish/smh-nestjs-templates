import envConfig from './envConfig.config';
const throttlerConfig = [
  {
    name: envConfig.RATELIMIT_SHORT_NAME,
    ttl: parseInt(envConfig.RATELIMIT_SHORT_TTL) || 1000,
    limit: parseInt(envConfig.RATELIMIT_SHORT_NAME) || 10,
  },
  {
    name: envConfig.RATELIMIT_MEDIUM_NAME,
    ttl: parseInt(envConfig.RATELIMIT_MEDIUM_TTL) || 10000,
    limit: parseInt(envConfig.RATELIMIT_MEDIUM_NAME) || 100,
  },
  {
    name: envConfig.RATELIMIT_LONG_NAME,
    ttl: parseInt(envConfig.RATELIMIT_LONG_TTL) || 100000,
    limit: parseInt(envConfig.RATELIMIT_LONG_NAME) || 1000,
  },
];
export default throttlerConfig;
