import { dbKeys } from '@/helpers/constants';

enum roles {
  USER = 'USER',
  AGENT = 'AGENT',
}
const userRoles = Object.values(roles).map((role) => {
  return { [dbKeys.ROLE]: role };
});
export { userRoles, roles };
