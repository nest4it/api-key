export class ApiKeyError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class ApiKeyExpiredError extends ApiKeyError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class ApiKeyValidationError extends ApiKeyError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}