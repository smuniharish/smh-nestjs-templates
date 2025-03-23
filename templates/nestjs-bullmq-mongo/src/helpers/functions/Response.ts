import { HttpException } from '@/imports';

const SuccessResponse = (data: any, status: any): never => {
  throw new HttpException(data, status);
};
export { SuccessResponse, SuccessResponse as ErrorResponse };
