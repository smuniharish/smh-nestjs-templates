import { RolesRepository } from '@/repositories/roles.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesService {
  constructor(private rolesRepo: RolesRepository) {}
  async getRoleById(roleId: string) {
    return await this.rolesRepo.findRoleById(roleId);
  }
}
