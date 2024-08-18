import { ApiKeyValidationError } from "../errors";

export type AuthenticatedClient = {
  exp: number;
  jti: string;
  iat: number;
};

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const isNumber = (value: unknown): value is number => typeof value === 'number';

export const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value !== '';

export const validateAuthenticatedClient = <T>(client: unknown): T & AuthenticatedClient => {
  if (!isObject(client)) {
    throw new ApiKeyValidationError('Invalid client');
  }

  if (!client.exp || !isNumber(client.exp)) {
    throw new ApiKeyValidationError('Expiration value is invalid');
  }

  if (!client.jti || !isNonEmptyString(client.jti)) {
    throw new ApiKeyValidationError('Jti value is invalid');
  }

  if (!client.iat || !isNumber(client.iat)) {
    throw new ApiKeyValidationError('Issued at value is invalid');
  }

  return client as T & AuthenticatedClient;
}
