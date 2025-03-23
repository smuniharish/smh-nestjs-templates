import {
  HttpModule,
  JwtModule,
  ScheduleModule,
} from '@/imports';
import { ApiHelpersService } from './api-helpers.service';
import { CommonHelpersService } from './common-helpers.service';
import { KafkaLoggers } from './kafkaLogger.service';
import { ManagementService } from './management.service';
import { SchedulersService } from './schedulers.service';
import { jwtModuleConfig } from '@/config';
import { CachingService } from './caching.service';
import { getModuleMetaData } from '@/helpers/functions';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { RolesService } from './roles.service';
import { KafkaService } from './kafka.service';
const servicesImports = [
  HttpModule,
  ScheduleModule.forRoot(),
  JwtModule.register(jwtModuleConfig),
];
const servicesProviders = [
  ApiHelpersService,
  ManagementService,
  CommonHelpersService,
  SchedulersService,
  KafkaService,
  KafkaLoggers,
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
  KafkaService,
  KafkaLoggers,
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
