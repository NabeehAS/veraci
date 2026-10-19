import { Module } from '@nestjs/common';
import type { DynamicModule } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import type { ApiConfig } from './config.js';
import { HealthController } from './health/health.controller.js';
import { HealthService } from './health/health.service.js';
import { httpLoggerOptions } from './logging.js';

@Module({
  controllers: [HealthController],
  providers: [HealthService],
})
export class AppModule {
  static register(config: ApiConfig): DynamicModule {
    return {
      module: AppModule,
      imports: [
        LoggerModule.forRoot({ pinoHttp: httpLoggerOptions(config.logLevel) }),
      ],
    };
  }
}
