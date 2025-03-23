import { SetMetadata } from '@/imports';
import { apiAccess } from '../constants';
const Public = () => SetMetadata(apiAccess.IS_PUBLIC_KEY, true);
export default Public;
