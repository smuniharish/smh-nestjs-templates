import { HttpService, HttpStatus, Injectable } from '@/imports';
import { defaultAxiosConfig } from '@/config';
import { ErrorResponse } from '@/helpers/functions/Response';

@Injectable()
export class ApiHelpersService {
  constructor(
    private readonly httpService: HttpService,
  ) {}
  // async getAPIHelper(api: string) {}
  // async getAPIParamsHelper(api: string, params: any) {}
  async postAPIHelper(
    url: string,
    data: any,
    config: object = defaultAxiosConfig,
  ) {
    try {
      const response = await this.httpService.axiosRef.post(url, data, config);
      return response.data;
    } catch (err) {
      const errorObj = { status: err?.response?.status, message: err?.message };
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
