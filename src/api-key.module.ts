import { DynamicModule, Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } from './api-key.configure-module';
import { ApiKeyStrategy } from './strategies/api-key.strategy';
import { ApiKeyModuleConfig } from './models/config';

@Module({})
export class ApiKeyModule extends ConfigurableModuleClass {
  static register(options: ApiKeyModuleConfig): DynamicModule {
    return {
      module: ApiKeyModule,
      providers: [
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: options,
        },
        ApiKeyStrategy,
        ApiKeyService,
      ],
      exports: [ApiKeyService],
    };
  }
 }