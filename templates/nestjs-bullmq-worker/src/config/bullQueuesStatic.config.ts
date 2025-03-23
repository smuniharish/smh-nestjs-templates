import envConfig from './envConfig.config';

const bullQueues = {
  REQUEST: envConfig.BULL_REQUEST_QUEUE,
  RESPONSE: envConfig.BULL_RESPONSE_QUEUE,

  TEST_QUEUE: envConfig.BULL_TEST_QUEUE,
};
export default bullQueues;
