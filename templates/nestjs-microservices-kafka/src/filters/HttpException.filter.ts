import { cResponse } from '@/helpers/functions';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@/imports';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const message = exception.getResponse();
    let responseBoolean: boolean = false;
    if (status >= 200 && status <= 300) {
      responseBoolean = true;
    }

    response.status(status).json(cResponse(responseBoolean, message, status));
  }
}
