import { envConfig } from '@/config';
import { ErrorResponse } from '@/helpers/functions/Response';
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  JwtService,
} from '@/imports';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      ErrorResponse('Unauthorized User', HttpStatus.UNAUTHORIZED);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: envConfig.JWT_ACCESS_SECRET,
      });
      request['user'] = payload;
    } catch {
      ErrorResponse('Unauthorized User', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
