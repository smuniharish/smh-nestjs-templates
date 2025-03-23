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
export class HeaderValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const contentType = request.headers['content-type'];
    const acceptLanguage = request.headers['Accept-Language'];
    const languages = ['en', 'tel'];
    if (!languages.includes(acceptLanguage)) {
      ErrorResponse('Accept-Language is invalid', HttpStatus.BAD_REQUEST);
    }
    if (contentType !== 'application/json') {
      ErrorResponse('content-type is invalid', HttpStatus.BAD_REQUEST);
    }
    return next.handle();
  }
}
