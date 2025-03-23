import { SuccessResponse } from './helpers/functions/Response';
import { ApiOperation, ApiTags, Controller, Get, HttpStatus } from './imports';

@Controller()
@ApiTags('health')
export class AppController {
  constructor() {}

  @Get('ping')
  @ApiOperation({ summary: 'To Test the NS-Buyer-App ONDC Server...' })
  sayHello() {
    SuccessResponse(
      'NS-Buyer-App_V2 Server is up and running...',
      HttpStatus.OK,
    );
  }
}
