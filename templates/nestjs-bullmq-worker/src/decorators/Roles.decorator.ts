import { roles } from '@/config/userRoles.config';
import { SetMetadata } from '@nestjs/common';

const ROLES_KEY = 'roles';
const RolesDecorator = (...roles: roles[]) => SetMetadata(ROLES_KEY, roles);
export { ROLES_KEY, RolesDecorator };
