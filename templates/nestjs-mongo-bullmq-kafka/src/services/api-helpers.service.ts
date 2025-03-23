import { HttpService, HttpStatus, Injectable } from '@/imports';
import { KafkaLoggers } from './kafkaLogger.service';
import { defaultAxiosConfig } from '@/config';
import { ErrorResponse } from '@/helpers/functions/Response';

@Injectable()
export class ApiHelpersService {
  constructor(
    private readonly httpService: HttpService,
    private logger: KafkaLoggers,
  ) {}
  // async getAPIHelper(api: string) {}
  // async getAPIParamsHelper(api: string, params: any) {}
  async postAPIHelper(
    url: string,
    data: any,
    config: object = defaultAxiosConfig,
  ) {
    await this.logger.log('Request url::', url);
    await this.logger.log('Request Data::', data);
    try {
      const response = await this.httpService.axiosRef.post(url, data, config);
      await this.logger.log('Response::', response.data);
      return response.data;
    } catch (err) {
      const errorObj = { status: err?.response?.status, message: err?.message };
      await this.logger.errorLog('error from postApiHelper===', errorObj);
      ErrorResponse(
        err?.message || 'Error from postApiHelper',
        err?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // async postAPIParamsHelper(api: string, data: any, params: any) {}
  // async putAPIHelper(api: string, data: any) {}
  // async putAPIParamsHelper(api: string, data: any, params: any) {}
  // async deleteAPIHelper(api: string) {}
  // async deleteAPIParamsHelper(api: string, params: any) {}
}
