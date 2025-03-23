import { bullQueues, bullWorkerOptions } from '@/config';
import { debugLog, errorLog } from '@/helpers/functions/loggers';
import { Job, OnWorkerEvent, Processor, WorkerHost } from '@/imports';

@Processor(bullQueues.RESPONSE, bullWorkerOptions)
export class ResponseConsumerService extends WorkerHost {
  constructor() {
    super();
  }
  @OnWorkerEvent('completed')
  onJobCompleted(job: Job) {
    debugLog(`Job ${job.id} completed }`);
    // debugLog(
    //   `Job ${job.id} completed with result:
    //   ${JSON.stringify(job.returnvalue)
    //   }`,
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
      //   case bullQueues.ON_SEARCH:
      //     return await Promise.all([]);
      //   case bullQueues.ON_SELECT:
      //     return await Promise.all([]);
      //   case bullQueues.ON_INIT:
      //     return await Promise.all([]);
      //   case bullQueues.ON_CONFIRM:
      //     return await Promise.all([]);
      //   case bullQueues.ON_STATUS:
      //     return await Promise.all([]);
      //   case bullQueues.ON_UPDATE:
      //     return await Promise.all([]);
      //   case bullQueues.ON_ISSUE:
      //     return await Promise.all([]);
      //   case bullQueues.ON_ISSUE_STATUS:
      //     return await Promise.all([]);
      //   case bullQueues.ON_UPDATE_UNSOLISATED:
      //     return await this.integrationsService.update(job.data);
      //   case bullQueues.ON_STATUS_UNSOLISATED:
      //     return await this.integrationsService.status(job.data);
      //   case bullQueues.ON_ISSUE_STATUS_UNSOLISATED:
      //     return await this.integrationsService.issue(job.data);
      default:
        errorLog(`Queue name is not found :${job.name}`);
    }
  }
}
