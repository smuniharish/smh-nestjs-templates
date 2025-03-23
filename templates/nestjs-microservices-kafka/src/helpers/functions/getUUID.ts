import { uuidv5 } from '@/imports';
import { generateDateString } from './dateFunctions';
import { envConfig } from '@/config';

const getUUID = (value = generateDateString()) => {
  return uuidv5(value, envConfig.UUID_NAMESPACE);
};
export default getUUID;
