import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ConfigurableModuleClass } from './api-key.configure-module';
import { ApiKeyStrategy } from './strategies/api-key.strategy';

@Module({
  providers: [ApiKeyService, ApiKeyStrategy],
  exports: [ApiKeyService],
})
export class ApiKeyModule extends ConfigurableModuleClass {}