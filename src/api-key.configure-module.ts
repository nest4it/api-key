import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ApiKeyModuleConfig } from './models/config';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ApiKeyModuleConfig>().build();