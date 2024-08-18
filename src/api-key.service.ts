
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { createJwtToken } from "./utils/encode";
import { createVerifyJwtToken } from "./utils/decode";
import type { ApiKeyModuleConfig } from "./models/config";
import { MODULE_OPTIONS_TOKEN } from "./api-key.configure-module";

@Injectable()
export class ApiKeyService {
  private createJwtToken: ReturnType<typeof createJwtToken>;
  private verifyJwtToken: ReturnType<typeof createVerifyJwtToken>;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private options: ApiKeyModuleConfig,
  ) {
    this.createJwtToken = createJwtToken(this.options.secret);
    this.verifyJwtToken = createVerifyJwtToken(this.options.secret);
  }

  /**
   * 
   * @param data user defined data to be stored in the token, such as policy, user id, etc.
   * @param expiresInSeconds time in seconds for the token to expire, defaults to 30 days
   * @returns a jwt token
   */
  async createApiKey(data: Record<string, unknown>, expiresInSeconds?: number) {
    return this.createJwtToken(data, expiresInSeconds);
  }

  /**
   * 
   * @param token jwt token to be verified
   * @returns the parsed token
   */
  async verifyApiKey(token: string) {
    return this.verifyJwtToken(token).catch((err) => {
      throw new UnauthorizedException({
        cause: err,
      });
    });
  }
}
