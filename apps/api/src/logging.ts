import { randomUUID } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Options } from 'pino-http';
import type { ApiConfig } from './config.js';

export function httpLoggerOptions(level: ApiConfig['logLevel']): Options {
  return {
    level,
    genReqId: (_request, response) => {
      const id = randomUUID();
      response.setHeader('X-Request-Id', id);
      return id;
    },
    wrapSerializers: false,
    // Allowlist metadata; URLs, headers and bodies can contain credentials.
    serializers: {
      req: (request: IncomingMessage) => ({ id: request.id, method: request.method }),
      res: (response: ServerResponse) => ({ statusCode: response.statusCode }),
    },
    customLogLevel: (_request, response, error) => {
      if (error || response.statusCode >= 500) return 'error';
      if (response.statusCode >= 400) return 'warn';
      return 'info';
    },
  };
}
