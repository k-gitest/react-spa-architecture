export class FetchError extends Error {
  response?: Response;
  constructor(message: string, response?: Response) {
    super(message);
    this.name = 'FetchError';
    this.response = response;
  }
}

export class NetworkError extends FetchError {
  originalError?: Error | TypeError;
  constructor(message: string, originalError?: Error | TypeError) {
    super(message);
    this.name = 'NetworkError';
    this.originalError = originalError;
  }
}

export class JsonParseError extends FetchError {
  originalError?: Error;
  constructor(message: string, originalError?: Error) {
    super(message);
    this.name = 'JsonParseError';
    this.originalError = originalError;
  }
}

export class TimeoutError extends FetchError {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}
