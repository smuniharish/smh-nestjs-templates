import {
  debugLog,
  errorLog,
  formatLog,
  log,
  verboseLog,
  warnLog,
} from '@/helpers/functions/loggers';
import { KafkaService } from './kafka.service';
import { Injectable } from '@/imports';
import { kafkaTopics } from '@/helpers/constants';

@Injectable()
export class KafkaLoggers {
  constructor(private readonly kafkaProviderService: KafkaService) {}

  async pushToKafka(message: any) {
    await this.kafkaProviderService.sendMessageToTopic(
      kafkaTopics.KAFKA_LOGS,
      formatLog(message),
    );
  }

  async log(...message: any) {
    log(message);
    await this.pushToKafka(message);
  }

  async warnLog(...message: any) {
    warnLog(message);
    await this.pushToKafka(message);
  }

  async debugLog(...message: any) {
    debugLog(message);
    await this.pushToKafka(message);
  }

  async errorLog(...message: any) {
    errorLog(message);
    await this.pushToKafka(message);
  }

  async verboseLog(...message: any) {
    verboseLog(message);
    await this.pushToKafka(message);
  }
}
