import {
  Module,
  Logger,
  ValidationPipe,
  HttpException,
  Injectable,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  HttpStatus,
  NestMiddleware,
  VersioningType,
  Param,
  VersioningOptions,
  ModuleMetadata,
  forwardRef,
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Inject,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
  NestInterceptor,
  UseFilters,
  UseGuards,
  UsePipes,
  UploadedFile,
  SetMetadata,
  Request as NeRequest,
  CanActivate,
  OnModuleInit,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
  IntersectionType,
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  MicroserviceOptions,
  Transport,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  ClientsModule,
  ClientKafka,
} from '@nestjs/microservices';
import {
  Partitioners,
  logLevel,
  Kafka,
  CompressionTypes,
  Admin,
  Consumer,
  Producer,
  IResourceConfigEntry,
  ITopicConfig,
} from 'kafkajs';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { ThrottlerModule } from '@nestjs/throttler';
import { Cron, CronExpression, ScheduleModule } from '@nestjs/schedule';
import { Observable, map } from 'rxjs';

import * as compression from 'compression';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as dotenv from 'dotenv';
import { v5 as uuidv5 } from 'uuid';
import {
  createAuthorizationHeader,
  isHeaderValid,
} from 'ondc-crypto-sdk-nodejs';
import { readFile, utils } from 'xlsx';

import * as fs from 'fs';
import * as https from 'https';

import {
  CacheModule,
  CacheModuleOptions,
  CACHE_MANAGER,
  Cache,
  CacheInterceptor,
} from '@nestjs/cache-manager';

import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import ajvFormats from 'ajv-formats';
import {
  ajvCustomFormatsRegistry,
  ajvCustomKeywordsRegistry,
} from 'smh-ajv-utils';

import {
  createCipheriv,
  randomBytes,
  createDecipheriv,
  randomInt,
} from 'crypto';

import { JwtService, JwtModuleOptions, JwtModule } from '@nestjs/jwt';
import { parse, toSeconds } from 'iso8601-duration';

import { getDynamicConcurrency } from 'smh-concurrency-utils';
import {
  ServeStaticModule,
  ServeStaticModuleOptions,
} from '@nestjs/serve-static';
import { join } from 'path';

export {
  Module,
  Logger,
  ValidationPipe,
  HttpException,
  Injectable,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  HttpStatus,
  NestMiddleware,
  VersioningType,
  Param,
  VersioningOptions,
  ModuleMetadata,
  forwardRef,
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Inject,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
  NestInterceptor,
  UseFilters,
  UseGuards,
  UsePipes,
  UploadedFile,
  SetMetadata,
  NeRequest,
  CanActivate,
  OnModuleInit,
  OnApplicationShutdown,
};
export { Request, Response, NextFunction };
export { NestExpressApplication };
export { NestFactory, Reflector };
export {
  DocumentBuilder,
  SwaggerModule,
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
  IntersectionType,
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
};
export {
  MicroserviceOptions,
  Transport,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  ClientsModule,
  ClientKafka,
};
export {
  Partitioners,
  logLevel,
  Kafka,
  CompressionTypes,
  Admin,
  Consumer,
  Producer,
  IResourceConfigEntry,
  ITopicConfig,
};
export { HttpModule, HttpService };
export { AxiosRequestConfig };
export { ThrottlerModule };
export { Cron, CronExpression, ScheduleModule };
export { Observable, map };

export { compression };
export { helmet };
export { WinstonModule };
export { winston };
export { DailyRotateFile };
export { dotenv };
export { uuidv5 };
export { createAuthorizationHeader, isHeaderValid };
export { readFile, utils };
export { fs };
export { https };

export {
  CacheModule,
  CacheModuleOptions,
  CACHE_MANAGER,
  Cache,
  CacheInterceptor,
};
export { Ajv };
export { ajvFormats };
export { ajvErrors };
export { ajvCustomFormatsRegistry, ajvCustomKeywordsRegistry };

export { createCipheriv, randomBytes, createDecipheriv, randomInt };

export { JwtService, JwtModuleOptions, JwtModule };
export { parse, toSeconds };

export { getDynamicConcurrency };
export { ServeStaticModule, ServeStaticModuleOptions };
export { join };
