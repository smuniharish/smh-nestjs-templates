import { envConfig } from '@/config';

const kafkaTopics = {
  KAFKA_LOGS: envConfig.KAFKA_TOPIC_FOR_LOGS,
  KAFKA_COMMUNICATION_MEDIUM: envConfig.KAFKA_TOPIC_COMMUNICATION_MEDIUM,
  KAFKA_RESPONSE_COMMUNICATION_MEDIUM:
    envConfig.KAFKA_TOPIC_RESPONSE_COMMUNICATION_MEDIUM,
};
export default kafkaTopics;
