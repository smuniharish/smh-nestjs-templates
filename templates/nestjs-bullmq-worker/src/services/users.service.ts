import { dbKeys } from '@/helpers/constants';
import { Injectable } from '@/imports';

@Injectable()
export class UsersService {
  constructor() {}
  async getUserByMobileNumber(mobileNumber: string, country_code: string) {
    return {}
  }
  async getUserByUserId(userId: string) {
    return {}
  }
  async getUserByUserIdWithoutSensitiveInfo(userId: string) {
    return {}
  }
  async updateUserRefreshToken(id: string, refreshToken: string = null) {
    return {}
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
    return {}
  }
  async createUser(userDocument) {
    return {}
  }
}
