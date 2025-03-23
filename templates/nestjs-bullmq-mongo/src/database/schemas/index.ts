import { RolesSchema } from './Roles.schema';
import { UsersSchema } from './Users.schema';

export enum schemaNames {
  Roles = 'Roles',
  Users = 'Users',
}
const schemas = [
  { name: schemaNames.Roles, schema: RolesSchema },
  { name: schemaNames.Users, schema: UsersSchema },
];

export default schemas;
