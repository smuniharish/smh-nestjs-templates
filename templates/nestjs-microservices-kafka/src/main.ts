import { AppModule } from './app.module';
import {
  envConfig,
  logConfig,
  swaggerConfig,
  versioningConfig,
} from './config';
import { HttpExceptionFilter } from './filters';
import { log } from './helpers/functions/loggers';
import {
  NestExpressApplication,
  NestFactory,
  SwaggerModule,
  compression,
  helmet,
} from '@/imports';
import { HttpLoggerMiddleware } from '@/middlewares';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    logConfig,
  );
  if (process.env.NODE_ENV !== 'production') {
    const document = SwaggerModule.createDocument(app, swaggerConfig, {});
    SwaggerModule.setup(envConfig.SWAGGER_DOCS_PATH, app, document);
  }
  app.use(compression());
  app.enableCors();
  app.use(helmet());
  app.enableVersioning(versioningConfig);
  app.setGlobalPrefix(envConfig.GLOBAL_PREFIX_PATH);
  const loggerMiddleware = new HttpLoggerMiddleware();
  app.use(loggerMiddleware.use);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useBodyParser('json', { limit: envConfig.BODY_PARSER_JSON_SIZE_LIMIT });
  await app.listen(envConfig.PORT ? parseInt(envConfig.PORT) : 3030);
  log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
