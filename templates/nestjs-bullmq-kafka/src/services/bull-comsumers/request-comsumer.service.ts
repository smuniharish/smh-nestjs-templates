import { bullQueues, bullWorkerOptions } from '@/config';
import { debugLog, errorLog } from '@/helpers/functions/loggers';
import { Job, OnWorkerEvent, Processor, WorkerHost } from '@/imports';

@Processor(bullQueues.REQUEST, bullWorkerOptions)
export class RequestConsumerService extends WorkerHost {
  constructor() {
    super();
  }
  @OnWorkerEvent('completed')
  onJobCompleted(job: Job) {
    debugLog(`Job ${job.id} completed`);
    // debugLog(
    //   `Job ${job.id} completed with result: ${JSON.stringify(job.returnvalue)}`,
    // );
  }

  @OnWorkerEvent('failed')
  onJobFailed(job: Job, error: Error) {
    errorLog(`Job ${job.id} failed with error: ${error.message}`);
  }

  @OnWorkerEvent('active')
  onJobActive(job: Job) {
    debugLog(`Job ${job.id} is now active`);
  }

  @OnWorkerEvent('progress')
  onJobProgress(job: Job, progress: number) {
    debugLog(`Job ${job.id} progress: ${progress}%`);
  }
  async process(job: Job<any, any, string>): Promise<any> {
    debugLog(`job needs to implement ${job.data}`);
    switch (job.name) {
      case bullQueues.TEST_QUEUE:
      // return await this.ondcRequestProcessService.search(job.data);
      default:
        errorLog(`Queue name is not found :${job.name}`);
    }
  }
}
