import {
  BullModule,
  HttpModule,
  JwtModule,
  RegisterQueueOptions,
  ScheduleModule,
} from '@/imports';
import { ApiHelpersService } from './api-helpers.service';
import { CommonHelpersService } from './common-helpers.service';
import { ManagementService } from './management.service';
import { SchedulersService } from './schedulers.service';
import { bullConfig, bullQueues, jwtModuleConfig } from '@/config';
import { BullProducerService } from './bull-producer.service';
import { CachingService } from './caching.service';
import { getModuleMetaData } from '@/helpers/functions';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { RolesService } from './roles.service';
import {
  RequestConsumerService,
  ResponseConsumerService,
} from './bull-comsumers';
const bullQueuesRegister: RegisterQueueOptions[] = [
  { name: bullQueues.REQUEST },
  { name: bullQueues.RESPONSE },
];
const servicesImports = [
  HttpModule,
  ScheduleModule.forRoot(),
  BullModule.forRoot(bullConfig),
  JwtModule.register(jwtModuleConfig),
  BullModule.registerQueue(...bullQueuesRegister),
];
const servicesProviders = [
  ApiHelpersService,
  ManagementService,
  CommonHelpersService,
  SchedulersService,
  BullProducerService,
  CachingService,
  AuthService,
  UsersService,
  RolesService,
  RequestConsumerService,
  ResponseConsumerService,
];
const servicesExports = [
  ApiHelpersService,
  ManagementService,
  CommonHelpersService,
  SchedulersService,
  BullProducerService,
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
