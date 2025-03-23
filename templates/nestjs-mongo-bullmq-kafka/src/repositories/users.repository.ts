import { UsersI } from '@/database/interfaces';
import { schemaNames } from '@/database/schemas';
import { dbKeys } from '@/helpers/constants';
import { errorLog } from '@/helpers/functions/loggers';
import { InjectModel, Injectable, Model } from '@/imports';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(schemaNames.Users) private usersModel: Model<UsersI>,
  ) {}
  async createUser(userDocument: any) {
    try {
      const result = await this.usersModel.insertMany(userDocument);
      return result;
    } catch (err) {
      errorLog('findUserByMobileNumber-err', err);
      return err?.message || 'err in findUserByMobileNumber';
    }
  }
  async findUserByMobileNumber(mobileNumber: string, country_code: string) {
    try {
      const filter = {
        [dbKeys.MOBILE_NUMBER]: mobileNumber,
        [dbKeys.MOBILE_NUMBER_COUNTRY_CODE]: country_code,
      };
      const result = await this.usersModel.findOne(filter);
      return result;
    } catch (err) {
      errorLog('findUserByMobileNumber-err', err);
      return err?.message || 'err in findUserByMobileNumber';
    }
  }
  async findUserById(id: string) {
    try {
      const filter = {
        [dbKeys.ID]: id,
      };
      const result = await this.usersModel.findOne(filter);
      return result;
    } catch (err) {
      errorLog('findUserById-err', err);
      return err?.message || 'err in findUserById';
    }
  }
  async findUserByIdWithoutSensitiveInfo(id: string) {
    try {
      const filter = {
        [dbKeys.ID]: id,
      };
      const projection = {
        [dbKeys.REFRESH_TOKEN]: 0,
      };
      const result = await this.usersModel.findOne(filter, projection);
      return result;
    } catch (err) {
      errorLog('findUserById-err', err);
      return err?.message || 'err in findUserById';
    }
  }

  async updateUserWithFilter(id: string, updateKey: string, updateValue: any) {
    try {
      const filter = {
        [dbKeys.ID]: id,
      };
      const update = {
        $set: { [updateKey]: updateValue },
      };
      const options = {
        new: true,
        upsert: true,
      };

      const result = await this.usersModel.findOneAndUpdate(
        filter,
        update,
        options,
      );
      return result;
    } catch (err) {
      errorLog('updateUserWithFilter-err', err);
      return err?.message || 'err in updateUserWithFilter';
    }
  }
  async updateUserWithMultipleFilter(id: string, obj: object) {
    try {
      const filter = {
        [dbKeys.ID]: id,
      };
      const update = {
        $set: { ...obj },
      };
      const options = {
        new: true,
        upsert: true,
      };

      const result = await this.usersModel.findOneAndUpdate(
        filter,
        update,
        options,
      );
      return result;
    } catch (err) {
      errorLog('updateUserWithFilter-err', err);
      return err?.message || 'err in updateUserWithFilter';
    }
  }
}
