import { roles } from '@/config/userRoles.config';
import { RolesDecorator } from '@/decorators';
import { AuthGuard, RolesGuard } from '@/guards';
import { SuccessResponse } from '@/helpers/functions/Response';
import {
  ApiBearerAuth,
  Controller,
  Get,
  UseGuards,
  NeRequest,
  HttpStatus,
  ApiOperation,
  ApiTags,
} from '@/imports';
import { UsersService } from '@/services/users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'get the user Profile' })
  async getProfile(@NeRequest() req) {
    SuccessResponse(
      await this.usersService.getUserByUserIdWithoutSensitiveInfo(
        req?.user?.sub,
      ),
      HttpStatus.OK,
    );
  }

  @Get('agentEndPoint')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @RolesDecorator(roles.AGENT)
  @ApiOperation({ summary: 'dummy end point to check the authorization' })
  agentPoint() {
    SuccessResponse('agent end point', HttpStatus.OK);
  }
  @Get('userEndPoint')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @RolesDecorator(roles.USER)
  @ApiOperation({ summary: 'dummy end point to check the authorization' })
  userPoint() {
    SuccessResponse('user end point', HttpStatus.OK);
  }
}
