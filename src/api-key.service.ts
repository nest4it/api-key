
import { Inject, Injectable } from "@nestjs/common";
import { createProviders, type JwtProvider } from "./utils";
import type { ApiKeyModuleConfig } from "./models/config";
import { MODULE_OPTIONS_TOKEN } from "./api-key.configure-module";
import { ApiKeyError } from "./errors";

@Injectable()
export class ApiKeyService {
  private jwtProvider: JwtProvider;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private options: ApiKeyModuleConfig,
  ) {
    this.jwtProvider = createProviders(this.options.secret);
  }

  /**
   * 
   * @param data user defined data to be stored in the token, such as policy, user id, etc.
   * @param expiresIn expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
   * @returns a jwt token
   */
  async createApiKey(data: Record<string, unknown>, expiresIn?: string | number) {
    return this.jwtProvider.createJwtToken(data, expiresIn ?? this.options.expiresIn);
  }

  /**
   * 
   * @param token jwt token to be verified
   * @returns the parsed token
   */
  async verifyApiKey(token: string) {
    return this.jwtProvider.verifyJwtToken(token).catch((err) => {
      throw new ApiKeyError("An error occurred while veryfing a token", {
        cause: err,
      });
    });
  }
}
