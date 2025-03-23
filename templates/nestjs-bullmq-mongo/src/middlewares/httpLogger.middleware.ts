import { getKeyForValueObject, resWrite } from '@/helpers/functions';
import { errorLog, log, warnLog } from '@/helpers/functions/loggers';
import {
  HttpStatus,
  Injectable,
  NestMiddleware,
  NextFunction,
  Request,
  Response,
} from '@/imports';
@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, method, ip, body } = req;
    const startAt: any = process.hrtime();
    log(
      'request===> ' +
        method +
        ' ' +
        ip +
        ' ' +
        originalUrl +
        ' ' +
        JSON.stringify({ body: body }),
    );
    if (next) {
      next();
    }
    const rawResponse: any = res.write;
    const rawResponseEnd: any = res.end;
    res.statusMessage = getKeyForValueObject(HttpStatus, res.statusCode);
    const chunkBuffers: any[] = [];
    res.write = (...chunks: any[]) => {
      return resWrite(res, chunks, chunkBuffers, rawResponse);
    };
    let respbody: any, responseLog: any;
    res.end = (...chunk: any[]) => {
      const { statusCode, statusMessage } = res;
      const diff: any = process.hrtime(startAt);
      const responseTime: number = diff[0] * 1e3 + diff[1] * 1e-6;
      const resArgs: any[] = [];
      for (let i = 0; i < chunk.length; i++) {
        resArgs[i] = chunk[i];
      }
      if (resArgs[0]) {
        chunkBuffers.push(Buffer.from(resArgs[0]));
      }
      respbody = Buffer.concat(chunkBuffers).toString('utf8');
      responseLog = `response===> ${method} ${originalUrl} ${statusCode} ${statusMessage} ${responseTime}ms ${ip} ${
        respbody || {}
      }`;
      rawResponseEnd.apply(res, resArgs);
      return responseLog as unknown as Response;
    };
    res.on('finish', () => {
      const { statusCode } = res;
      if (statusCode >= 500) {
        errorLog(responseLog);
      } else if (statusCode >= 400) {
        warnLog(responseLog);
      } else {
        log(responseLog);
      }
    });
  }
}
