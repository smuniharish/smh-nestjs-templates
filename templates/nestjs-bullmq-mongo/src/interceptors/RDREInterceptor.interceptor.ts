import { cResponse, decryptText, encryptText } from '@/helpers/functions';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Observable,
  map,
} from '@/imports';

@Injectable()
export class RDREInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { body } = request;
    const decryptedRequest = decryptText(body);
    request.body = decryptedRequest;
    return next.handle().pipe(
      map((data) => {
        const encryptedData = encryptText(data);
        return cResponse(data.status, encryptedData, data.statusCode);
      }),
    );
  }
}
