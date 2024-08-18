import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import Strategy from "passport-headerapikey";
import { API_KEY_MODULE_STRATEGY } from "../constants";
import { ApiKeyService } from "../api-key.service";
import type { Function } from "ts-toolbelt";
import type { ApiKeyModuleConfig } from "../models/config";
import { MODULE_OPTIONS_TOKEN } from "../api-key.configure-module";
import { ApiKeyError } from "@/errors";

type ValidateFn = (apiKey: string, done: Function.Function) => void;

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  Strategy,
  API_KEY_MODULE_STRATEGY,
) {
  constructor(@Inject(MODULE_OPTIONS_TOKEN) options: ApiKeyModuleConfig,
    private tokenService: ApiKeyService,
  ) {
    super(
      {
        header: options.apiKeyHeader,
        prefix: options.apiKeyHeaderPrefix,
      },
      true,
      async (apiKey: string, done: ValidateFn) => this.validate(apiKey, done),
    );
  }

  public async validate(apiKey: string, done: Function.Function) {
    return this.tokenService
      .verifyApiKey(apiKey)
      .then((user) => done(null, user))
      .catch((err) => {
        done(new ApiKeyError("Couldn't verify token", {
          cause: err,
        }), null);
      });
  }
}
