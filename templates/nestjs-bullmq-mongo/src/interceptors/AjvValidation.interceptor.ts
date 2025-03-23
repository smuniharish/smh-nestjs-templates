import { validateSchema } from '@/helpers/functions';
import { ErrorResponse } from '@/helpers/functions/Response';
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
  Observable,
} from '@/imports';

@Injectable()
export class AjvValidationInterceptor implements NestInterceptor {
  constructor(private readonly schema: object) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const value = request.body;
    const valid = validateSchema(value, this.schema);
    if (!valid.message) {
      ErrorResponse(valid.errors, HttpStatus.BAD_REQUEST);
    }
    return next.handle();
  }
}
