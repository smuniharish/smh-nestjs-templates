import { availableConcurrency } from './concurrency.config';
import { NestWorkerOptions } from '@/imports';

const bullWorkerOptions: NestWorkerOptions = {
  concurrency: availableConcurrency,
};
export default bullWorkerOptions;
