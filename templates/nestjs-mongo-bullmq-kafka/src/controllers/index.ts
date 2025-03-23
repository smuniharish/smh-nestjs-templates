import { ServicesModule } from '@/services/services.module';
import { ManagementController } from './management.controller';
import { TestController } from './test.controller';
import { UsersController } from './users.controller';
import { AuthController } from './auth.controller';

const controllersImports = [ServicesModule];
const controllersProviders = [
  ManagementController,
  TestController,
  UsersController,
  AuthController,
];
const controllersExports = [];
const controllersModuleMetaData = {
  imports: controllersImports,
  controllers: controllersProviders,
  exports: controllersExports,
};
export { controllersModuleMetaData };
