import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './controllers/controllers.module';
import { ServicesModule } from './services/services.module';
import { CacheModule, Module, ServeStaticModule, ThrottlerModule } from './imports';
import { cacheManagerConfig, staticConfig, throttlerConfig } from './config';
const imports = [
  ControllersModule,
  ServicesModule,
  ThrottlerModule.forRoot(throttlerConfig),
  CacheModule.register(cacheManagerConfig),
]
if (process.env.NODE_ENV !== 'production') {
  imports.push(ServeStaticModule.forRoot(staticConfig));
}
@Module({
  imports: imports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
