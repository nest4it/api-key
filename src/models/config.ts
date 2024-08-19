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
   * expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
   */
  expiresIn?: number;
};