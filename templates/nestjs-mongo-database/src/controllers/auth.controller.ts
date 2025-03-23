import { AjvValidationDecorator } from '@/decorators';
import {
  RequestAccessTokenSchema,
  RequestGenerateOtpSchema,
  RequestLoginSchema,
} from '@/dtoSchemas';
import {
  GenerateOtpI,
  GetAccessTokenI,
  LoginI,
} from '@/helpers/interfaces/userControllerI.interface';
import {
  ApiBody,
  ApiOperation,
  ApiTags,
  Body,
  Controller,
  Post,
} from '@/imports';
import { AuthService } from '@/services/auth.service';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('generateOtp')
  @ApiBody({ schema: RequestGenerateOtpSchema })
  @ApiOperation({ summary: 'generate otp' })
  @AjvValidationDecorator(RequestGenerateOtpSchema)
  async generateOtp(@Body() body: GenerateOtpI) {
    await this.authService.generateOtpForUser(
      body.mobileNumber,
      body.countryCode,
      body.role,
    );
  }
  @Post('getAccessToken')
  @ApiBody({ schema: RequestAccessTokenSchema })
  @ApiOperation({ summary: 'get access token by using the refresh token' })
  @AjvValidationDecorator(RequestAccessTokenSchema)
  async getAccessTokenByRefreshToken(@Body() body: GetAccessTokenI) {
    const { refreshToken } = body;
    await this.authService.getAccessTokenByRefreshToken(refreshToken);
  }
  @Post('login')
  @ApiBody({ schema: RequestLoginSchema })
  @ApiOperation({
    summary: 'verifies the otp and final login/registration of user',
  })
  @AjvValidationDecorator(RequestLoginSchema)
  async login(@Body() body: LoginI) {
    const { orderId, otp } = body;
    await this.authService.loginUser(orderId, otp);
  }
}
