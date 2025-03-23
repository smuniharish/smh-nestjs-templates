import { mongooseModuleConfig } from '@/config/mongooseModuleConfig.config';
import { getModuleMetaData } from '@/helpers/functions';
import { MongooseModule } from '@/imports';
import schemas from './schemas';
import { mongooseConnectionURIWithDB } from '@/helpers/functions/getMongoURI';

const dataBaseimports = [
  MongooseModule.forRoot(mongooseConnectionURIWithDB, mongooseModuleConfig),
  MongooseModule.forFeature(schemas),
];
const dataBaseProviders = [];
const dataBaseExports = [];
const dataBaseModuleMetaData = getModuleMetaData(
  dataBaseimports,
  dataBaseProviders,
  dataBaseExports,
);
export default dataBaseModuleMetaData;
