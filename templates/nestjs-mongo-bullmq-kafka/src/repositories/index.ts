import { MongooseModule, forwardRef } from '@/imports';
import schemas from '@/database/schemas';
import { ServicesModule } from '@/services/services.module';
import { getModuleMetaData } from '@/helpers/functions';
import { UsersRepository } from './users.repository';
import { RolesRepository } from './roles.repository';
const repositories = [UsersRepository, RolesRepository];
const repositoriesImports = [
  MongooseModule.forFeature(schemas),
  forwardRef(() => ServicesModule),
];
const repositoriesProviders = repositories;
const repositoriesExports = repositories;
const repositoriesModuleConfig = getModuleMetaData(
  repositoriesImports,
  repositoriesProviders,
  repositoriesExports,
);
export { repositoriesModuleConfig };
