import { RolesI } from '@/database/interfaces';
import { schemaNames } from '@/database/schemas';
import { dbKeys } from '@/helpers/constants';
import { errorLog } from '@/helpers/functions/loggers';
import { InjectModel, Injectable, Model } from '@/imports';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectModel(schemaNames.Roles) private usersModel: Model<RolesI>,
  ) {}
  async findRoleById(roleId: string) {
    try {
      const filter = {
        [dbKeys.ID]: roleId,
      };
      const result = await this.usersModel.findOne(filter);
      return result;
    } catch (err) {
      errorLog('findUserByMobileNumber-err', err);
      return err?.message || 'err in findUserByMobileNumber';
    }
  }
}
