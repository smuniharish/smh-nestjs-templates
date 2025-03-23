import { UseInterceptors } from '@/imports';
import { RDREInterceptor } from '@/interceptors';

const RDREDecorator = () => {
  return UseInterceptors(new RDREInterceptor());
};
export default RDREDecorator;
