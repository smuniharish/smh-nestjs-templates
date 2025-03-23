import { usersSchemaConfig } from '@/config/mongooseSchemaConfig.config';
import { dbKeys } from '@/helpers/constants';
import { SchemaFactory, Schema, Prop, mongoose } from '@/imports';
const { Types } = mongoose.Schema;

@Schema(usersSchemaConfig)
class Users {
  @Prop({ type: Types.String })
  [dbKeys.ID]: string;

  @Prop({ type: Types.String })
  [dbKeys.FIRST_NAME]: string;

  @Prop({ type: Types.String })
  [dbKeys.LAST_NAME]: string;

  @Prop({ type: Types.String })
  [dbKeys.FULL_NAME]: string;

  @Prop({ type: Types.String })
  [dbKeys.MOBILE_NUMBER]: string;

  @Prop({ type: Types.String })
  [dbKeys.MOBILE_NUMBER_COUNTRY_CODE]: string;

  @Prop({ type: Types.String })
  [dbKeys.REFRESH_TOKEN]: string;

  @Prop({ type: Types.Array })
  [dbKeys.ROLES]: string[];
}
const UsersSchema = SchemaFactory.createForClass(Users);
export { Users, UsersSchema };
