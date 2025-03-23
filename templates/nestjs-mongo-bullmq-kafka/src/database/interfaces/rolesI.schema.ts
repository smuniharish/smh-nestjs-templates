import { dbKeys } from '@/helpers/constants';
import { Document } from '@/imports';
interface RolesI extends Document {
  [dbKeys.ID]: string;
  [dbKeys.ROLE]: string;
}
export default RolesI;
