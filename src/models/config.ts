export type ApiKeyModuleConfig = {

  /**
   * The secret to use to sign the JWT.
   */
  secret: string;

  /**
   * The header to use to retrieve the API key.
   */
  apiKeyHeader: string;

  /**
   * The prefix to add to the header value.
   */
  apiKeyHeaderPrefix?: string;
  /**
   * The time in seconds that the token will be valid for.
   */
  expiresIn?: number;
};