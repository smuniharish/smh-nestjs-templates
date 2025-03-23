import { envConfig } from '@/config';
import { mongooseConnectionURI } from '@/helpers/functions/getMongoURI';
import { mongoMigrateCli } from '@/imports';

mongoMigrateCli({
  uri: mongooseConnectionURI,
  database: envConfig.DB_NAME,
  migrationsDir: __dirname,
  migrationsCollection: envConfig.DB_COLLECTION_NAME_MIGRATIONS,
});
