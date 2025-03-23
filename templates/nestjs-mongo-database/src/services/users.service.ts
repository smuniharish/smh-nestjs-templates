import { dbKeys } from '@/helpers/constants';
import { Injectable } from '@/imports';
import { UsersRepository } from '@/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}
  async getUserByMobileNumber(mobileNumber: string, country_code: string) {
    return await this.usersRepo.findUserByMobileNumber(
      mobileNumber,
      country_code,
    );
  }
  async getUserByUserId(userId: string) {
    return await this.usersRepo.findUserById(userId);
  }
  async getUserByUserIdWithoutSensitiveInfo(userId: string) {
    return await this.usersRepo.findUserByIdWithoutSensitiveInfo(userId);
  }
  async updateUserRefreshToken(id: string, refreshToken: string = null) {
    return await this.usersRepo.updateUserWithFilter(
      id,
      dbKeys.REFRESH_TOKEN,
      refreshToken,
    );
  }
  async updateUserRefreshTokenAndRole(
    id: string,
    refreshToken: string,
    roles: string,
  ) {
    const filterObj = {
      [dbKeys.ROLES]: roles,
      [dbKeys.REFRESH_TOKEN]: refreshToken,
    };
    return await this.usersRepo.updateUserWithMultipleFilter(id, filterObj);
  }
  async createUser(userDocument) {
    return await this.usersRepo.createUser(userDocument);
  }
}
