import { dbKeys } from '@/helpers/constants';
import { Document } from '@/imports';
interface UsersI extends Document {
  [dbKeys.ID]: string;
  [dbKeys.FIRST_NAME]: string;
  [dbKeys.LAST_NAME]: string;
  [dbKeys.FULL_NAME]: string;
  [dbKeys.MOBILE_NUMBER]: string;
  [dbKeys.MOBILE_NUMBER_COUNTRY_CODE]: string;
  [dbKeys.REFRESH_TOKEN]: string;
  [dbKeys.ROLE]: string[];
}
export default UsersI;
