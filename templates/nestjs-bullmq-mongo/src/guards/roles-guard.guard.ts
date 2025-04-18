import { Roles } from '@/database/schemas/Roles.schema';
import { ROLES_KEY } from '@/decorators/Roles.decorator';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Observable,
  Reflector,
} from '@/imports';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
