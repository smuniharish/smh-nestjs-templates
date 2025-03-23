import {
  availableConcurrency,
  envConfig,
  KafkaWinstonLogCreator,
} from '@/config';
import { kafkaTopics } from '@/helpers/constants';
import { log } from '@/helpers/functions/loggers';
import {
  Admin,
  CompressionTypes,
  Consumer,
  Injectable,
  IResourceConfigEntry,
  ITopicConfig,
  Kafka,
  OnApplicationShutdown,
  OnModuleInit,
  Partitioners,
  Producer,
} from '@/imports';
import { mbToBytes } from '@/helpers/functions/unitConversion';
import { daysToMilliseconds } from '@/helpers/functions/dateFunctions';

@Injectable()
export class KafkaService implements OnModuleInit, OnApplicationShutdown {
  admin: Admin;
  producer: Producer;
  consumer: Consumer;
  constructor() {}
  async onModuleInit() {
    const kafkaTopicValues = Object.values(kafkaTopics);
    // const {} = kafkaTopics;
    const kafka = new Kafka({
      clientId: envConfig.KAFKA_CLIENT_ID || 'TEST_CLIENT_ID',
      brokers: [envConfig.KAFKA_URL],
      logCreator: KafkaWinstonLogCreator,
    });
    this.admin = kafka.admin();
    await this.admin.connect();
    const registeredTopicsInKafka = await this.admin.listTopics();
    const topicListForRegistration: ITopicConfig[] = [];
    for (const topic of kafkaTopicValues) {
      if (!registeredTopicsInKafka.includes(topic)) {
        const configEntries: IResourceConfigEntry[] = [
          {
            name: 'max.message.bytes',
            value: mbToBytes(
              +envConfig.KAFKA_MAXIMUM_BYTES_PER_PARTITION_IN_MB || 2047,
            ).toString(),
          },
          {
            name: 'retention.ms',
            value: daysToMilliseconds(
              +envConfig.KAFKA_MESSAGE_RETENSION_IN_DAYS || 3,
            ).toString(),
          },
        ];
        const finalTopic: ITopicConfig = {
          topic: topic,
          numPartitions: +envConfig.KAFKA_NO_OF_PARTITIONS_FOR_TOPICS || 100,
          replicationFactor:
            +envConfig.KAFKA_REPLICATION_FACTOR_FOR_TOPICS || 1,
          configEntries: configEntries,
        };
        topicListForRegistration.push(finalTopic);
      }
    }
    if (topicListForRegistration.length) {
      await this.admin.createTopics({
        topics: topicListForRegistration,
      });
    }

    this.producer = kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
      allowAutoTopicCreation: false,
    });
    this.consumer = kafka.consumer({
      groupId: envConfig.KAFKA_GROUP_ID || 'TEST_GROUP_ID',
      allowAutoTopicCreation: false,
      sessionTimeout: +envConfig.KAFKA_SESSION_TIMEOUT || 90000,
      heartbeatInterval: +envConfig.KAFKA_HEARTBEAT_INTERVAL || 30000,
      maxWaitTimeInMs: +envConfig.KAFKA_MAXIMUM_WAIT_TIME_IN_MS || 1000,
      maxBytesPerPartition: mbToBytes(
        +envConfig.KAFKA_MAXIMUM_BYTES_PER_PARTITION_IN_MB || 2047,
      ),
    });
    await Promise.all([this.producer.connect(), this.consumer.connect()]);
    await Promise.all([
      this.consumer.subscribe({
        topics: [],
      }),
      this.consumer.run({
        autoCommit: false,
        partitionsConsumedConcurrently: availableConcurrency,
        eachMessage: async ({ topic, partition, message }) => {
          const msgPartition = partition;
          const msgOffset = (Number(message.offset) + 1).toString();
          const msgTopic = topic;
          const msg = message.value.toString();
          // const parsedMsg = JSON.parse(msg);
          log(
            `Received Message from topic:${msgTopic} - partition:${msgPartition} - offset:${msgOffset} - msg:${msg}`,
          );
          return await this.commitOffsets(msgTopic, msgPartition, msgOffset);
        },
      }),
    ]);
  }
  async onApplicationShutdown() {
    await Promise.all([
      this.admin.disconnect(),
      this.producer.disconnect(),
      this.consumer.disconnect(),
    ]);
  }
  async sendMessageToTopic(topic: string, message: any) {
    const messageData = JSON.stringify(message);
    const results = await this.producer.send({
      topic: topic,
      compression: CompressionTypes.GZIP,
      messages: [{ value: messageData }],
    });
    log('sendMessageToTopic', results, 'msg', messageData);
  }
  async commitOffsets(topic: string, partition: any, offset: any) {
    return await this.consumer.commitOffsets([
      { topic: topic, partition: partition, offset: offset },
    ]);
  }
}
