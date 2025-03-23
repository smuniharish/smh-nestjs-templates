import { envConfig } from '@/config';
import {
  errorMessageFormatter,
  generateOtp,
  getBooleanBasedOnStrings,
  getUUID,
} from '@/helpers/functions';
import { HttpStatus, Injectable } from '@/imports';
import { JwtService } from '@nestjs/jwt';
import { CachingService } from './caching.service';
import { RolesService } from './roles.service';
import { UsersService } from './users.service';
import { dbKeys } from '@/helpers/constants';
import { ErrorResponse, SuccessResponse } from '@/helpers/functions/Response';
interface JwtPayloadI {
  sub: string;
  mobileNumber: string;
  mobileCountryCode: string;
  role: string;
}
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private cachingManager: CachingService,
    private rolesService: RolesService,
    private usersService: UsersService,
  ) {}
  async generateAccessToken(jwtPayload: any) {
    return await this.jwtService.signAsync(jwtPayload, {
      secret: envConfig.JWT_ACCESS_SECRET,
      expiresIn: envConfig.JWT_SECRET_ACCESS_EXPIRY,
    });
  }
  async generateRefreshToken(jwtPayload: any) {
    return await this.jwtService.signAsync(jwtPayload, {
      secret: envConfig.JWT_REFRESH_SECRET,
      expiresIn: envConfig.JWT_SECRET_REFRESH_EXPIRY,
    });
  }
  async getTokens(
    userId: string,
    mobileNumber: string,
    mobileCountryCode: string,
    role: string,
  ) {
    const jwtPayload: JwtPayloadI = {
      sub: userId,
      mobileNumber: mobileNumber,
      mobileCountryCode: mobileCountryCode,
      role: role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(jwtPayload),
      this.generateRefreshToken(jwtPayload),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  async generateOtpForUser(
    mobileNumber: string,
    mobileCountryCode: string,
    roleId: string,
  ) {
    const digitsBoolean = getBooleanBasedOnStrings(
      envConfig.SIGN_IN_OTP_CONTAINS_DIGITS,
      'true',
    );
    const lowerCaseBoolean = getBooleanBasedOnStrings(
      envConfig.SIGN_IN_OTP_CONTAINS_LOWERCASE,
      'true',
    );
    const upperCaseBoolean = getBooleanBasedOnStrings(
      envConfig.SIGN_IN_OTP_CONTAINS_UPPERCASE,
      'true',
    );
    const specialCharsBoolean = getBooleanBasedOnStrings(
      envConfig.SIGN_IN_OTP_CONTAINS_SPECIALCHARS,
      'true',
    );
    const otpOptions = {
      digits: digitsBoolean,
      lowerCaseAlphabets: lowerCaseBoolean,
      upperCaseAlphabets: upperCaseBoolean,
      specialChars: specialCharsBoolean,
    };
    const otp = generateOtp(+envConfig.SIGN_IN_OTP_LENGTH || 6, otpOptions);
    const userId = getUUID(mobileCountryCode + mobileNumber);
    const orderId = getUUID(userId);
    const cachingPayload = {
      otp: otp,
      mobileNumber: mobileNumber,
      mobileCountryCode: mobileCountryCode,
      userId: userId,
      roleId: roleId,
    };
    const cachingResult = await this.cachingManager.setToCache(
      orderId,
      cachingPayload,
    );
    if (cachingResult) {
      SuccessResponse(
        `OTP Generated Successfully with orderId:${orderId} and otp: ${otp}`,
        HttpStatus.OK,
      );
    }
    ErrorResponse(
      'Error while generating the OTP, Please try again',
      HttpStatus.NOT_MODIFIED,
    );
  }
  async loginUser(orderId: string, otp: string) {
    const detailsFromCache = await this.cachingManager.getFromCache(orderId);
    if (detailsFromCache) {
      const userId = detailsFromCache['userId'];
      const mobileNumber = detailsFromCache['mobileNumber'];
      const mobileCountryCode = detailsFromCache['mobileCountryCode'];
      const roleId = detailsFromCache['roleId'];
      const generatedOtp = detailsFromCache['otp'];
      if (generatedOtp !== otp) {
        ErrorResponse('otp is invalid !', HttpStatus.BAD_REQUEST);
      } else {
        const accessingRole = await this.rolesService.getRoleById(roleId);
        const tokens = await this.getTokens(
          userId,
          mobileNumber,
          mobileCountryCode,
          accessingRole[dbKeys.ROLE],
        );
        const { refreshToken } = tokens;
        const existingUser = await this.usersService.getUserByUserId(userId);
        if (existingUser) {
          const checkRoleIsPresent = existingUser[dbKeys.ROLES].includes(
            accessingRole[dbKeys.ROLE],
          );
          if (checkRoleIsPresent) {
            await this.usersService.updateUserRefreshToken(
              userId,
              refreshToken,
            );
          } else {
            const finalRoles = existingUser[dbKeys.ROLES];
            finalRoles.push(accessingRole[dbKeys.ROLE]);
            await this.usersService.updateUserRefreshTokenAndRole(
              userId,
              refreshToken,
              finalRoles,
            );
          }
        } else {
          const userDoc = {
            [dbKeys.ID]: userId,
            [dbKeys.REFRESH_TOKEN]: refreshToken,
            [dbKeys.ROLES]: [accessingRole[dbKeys.ROLE]],
            [dbKeys.MOBILE_NUMBER]: mobileNumber,
            [dbKeys.MOBILE_NUMBER_COUNTRY_CODE]: mobileCountryCode,
          };
          await this.usersService.createUser(userDoc);
        }
        SuccessResponse(tokens, HttpStatus.CREATED);
      }
    } else {
      ErrorResponse(
        'otp is expired, please regenerate again',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async getAccessTokenByRefreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: envConfig.JWT_REFRESH_SECRET,
      });
      if (payload) {
        const accessTokenJwtPayload: JwtPayloadI = {
          sub: payload?.sub,
          mobileNumber: payload?.mobileNumber,
          mobileCountryCode: payload?.mobileCountryCode,
          role: payload?.role,
        };
        const getUser = await this.usersService.getUserByUserId(payload?.sub);
        if (getUser) {
          const accessToken = await this.generateAccessToken(
            accessTokenJwtPayload,
          );
          SuccessResponse(accessToken, HttpStatus.CREATED);
        } else {
          ErrorResponse(
            'refresh token is expired, please try login again...',
            HttpStatus.UNAUTHORIZED,
          );
        }
      } else {
        ErrorResponse('refresh token is invalid', HttpStatus.UNAUTHORIZED);
      }
    } catch (err) {
      ErrorResponse(
        errorMessageFormatter(err),
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
