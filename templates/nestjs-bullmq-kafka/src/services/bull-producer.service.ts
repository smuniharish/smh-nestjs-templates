import { bullQueues } from '@/config';
import { errorLog } from '@/helpers/functions/loggers';
import { Injectable, InjectQueue, Queue } from '@/imports';
const {
  REQUEST,
  // RESPONSE,
  TEST_QUEUE,
} = bullQueues;
@Injectable()
export class BullProducerService {
  constructor(
    @InjectQueue(REQUEST) private requestQueue: Queue,
    // @InjectQueue(RESPONSE) private responseQueue: Queue
  ) {}
  getQueue(queue: string) {
    switch (queue) {
      case TEST_QUEUE:
        return this.requestQueue;
      default:
        errorLog(`BullProducerService - Queue ${queue} is not found !!!`);
    }
  }
  async addToQueue(queueName: string, data: any) {
    const extractedQueue = this.getQueue(queueName);
    const job = await extractedQueue.add(queueName, data);
    return job;
  }
}
