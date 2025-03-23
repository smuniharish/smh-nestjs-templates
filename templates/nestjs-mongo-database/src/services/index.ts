import {
  HttpModule,
  JwtModule,
  ScheduleModule,
} from '@/imports';
import { ApiHelpersService } from './api-helpers.service';
import { CommonHelpersService } from './common-helpers.service';
import { ManagementService } from './management.service';
import { SchedulersService } from './schedulers.service';
import { DatabaseModule } from '@/database/database.module';
import { RepositoriesModule } from '@/repositories/repositories.module';
import { jwtModuleConfig } from '@/config';
import { CachingService } from './caching.service';
import { getModuleMetaData } from '@/helpers/functions';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { RolesService } from './roles.service';

const servicesImports = [
  HttpModule,
  DatabaseModule,
  RepositoriesModule,
  ScheduleModule.forRoot(),
  JwtModule.register(jwtModuleConfig),
];
const servicesProviders = [
  ApiHelpersService,
  ManagementService,
  CommonHelpersService,
  SchedulersService,
  CachingService,
  AuthService,
  UsersService,
  RolesService,
];
const servicesExports = [
  ApiHelpersService,
  ManagementService,
  CommonHelpersService,
  SchedulersService,
  CachingService,
  AuthService,
  UsersService,
  RolesService,
];
const servicesModuleMetaData = getModuleMetaData(
  servicesImports,
  servicesProviders,
  servicesExports,
);

export { servicesModuleMetaData };
