import { envConfig } from '@/config';
import { debugLog } from './loggers';

const dbUserName = envConfig.DB_USER_NAME;
const dbPassword = envConfig.DB_USER_PASSWORD;

let mongooseConnectionURI = `mongodb://${envConfig.DB_CONNECTION_URL}`;
if (dbPassword !== 'null' && dbUserName !== 'null') {
  mongooseConnectionURI = `mongodb://${envConfig.DB_USER_NAME}:${envConfig.DB_USER_PASSWORD}@${envConfig.DB_CONNECTION_URL}`;
}
const mongooseConnectionURIWithDB = `${mongooseConnectionURI}/${envConfig.DB_NAME}`;
debugLog('mongooseConnectionURI', mongooseConnectionURI);
debugLog('mongooseConnectionURIWithDB', mongooseConnectionURIWithDB);
export { mongooseConnectionURI, mongooseConnectionURIWithDB };
