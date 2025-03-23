import { UseInterceptors } from '@/imports';
import { AjvValidationInterceptor } from '@/interceptors';

const AjvValidationDecorator = (schema: object) => {
  return UseInterceptors(new AjvValidationInterceptor(schema));
};
export default AjvValidationDecorator;
