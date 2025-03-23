import { SchemaOptions } from '@/imports';
import envConfig from './envConfig.config';

const getSchemaOptions = (
  collection: string,
  timestamps: boolean = true,
  minimize: boolean = true,
): SchemaOptions => {
  const collectionConfig: SchemaOptions = {
    collection: collection,
    timestamps: timestamps,
    minimize: minimize,
  };
  return collectionConfig;
};
const generateSubSchemaOptions = (): SchemaOptions => {
  return { _id: false };
};
const usersSchemaConfig: SchemaOptions = getSchemaOptions(
  envConfig.DB_COLLECTION_NAME_USERS,
);
const rolesSchemaConfig: SchemaOptions = getSchemaOptions(
  envConfig.DB_COLLECTION_NAME_ROLES,
);
const addressesSchemaConfig: SchemaOptions = getSchemaOptions(
  envConfig.DB_COLLECTION_NAME_ADDRESSES,
);
const subSchemaOptionsConfig: SchemaOptions = generateSubSchemaOptions();
export {
  usersSchemaConfig,
  addressesSchemaConfig,
  rolesSchemaConfig,
  subSchemaOptionsConfig,
};
