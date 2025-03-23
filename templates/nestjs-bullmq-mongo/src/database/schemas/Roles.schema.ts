import { rolesSchemaConfig } from '@/config/mongooseSchemaConfig.config';
import { dbKeys } from '@/helpers/constants';
import { SchemaFactory, Schema, Prop, mongoose } from '@/imports';
const { Types } = mongoose.Schema;

@Schema(rolesSchemaConfig)
class Roles {
  @Prop({ type: Types.ObjectId })
  [dbKeys.ID]: string;

  @Prop({ type: Types.String })
  [dbKeys.ROLE]: string;
}
const RolesSchema = SchemaFactory.createForClass(Roles);
export { Roles, RolesSchema };
