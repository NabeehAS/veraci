import 'reflect-metadata';
import type { Server } from 'node:http';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PARAMS_PROVIDER_TOKEN } from 'nestjs-pino';
import type { Params } from 'nestjs-pino';
import request from 'supertest';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { z } from 'zod';
import { AppModule } from '../src/app.module.js';
import { readConfig } from '../src/config.js';
import { configureApp } from '../src/configure-app.js';
import { HealthController } from '../src/health/health.controller.js';
import { livenessSchema } from '../src/health/health.schema.js';
import { HealthService } from '../src/health/health.service.js';
import { httpLoggerOptions } from '../src/logging.js';

const logRecordSchema = z.object({
  req: z.object({ id: z.string(), method: z.string() }).optional(),
  res: z.object({ statusCode: z.number().int() }).optional(),
  responseTime: z.number().nonnegative().optional(),
});

describe('API liveness and dependency injection', () => {
  let app: INestApplication<Server>;
  const lines: string[] = [];

  beforeAll(async () => {
    const logging: Params = {
      pinoHttp: [
        httpLoggerOptions('info'),
        {
          write: (line) => {
            lines.push(line);
          },
        },
      ],
    };
    const module = await Test.createTestingModule({
      imports: [AppModule.register(readConfig({}))],
    })
      .overrideProvider(PARAMS_PROVIDER_TOKEN)
      .useValue(logging)
      .compile();
    app = module.createNestApplication<INestApplication<Server>>({
      logger: false,
    });
    configureApp(app);
    await app.init();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(async () => {
    await app?.close();
  });

  it('serves process liveness through the injected health provider', async () => {
    const response = await request(app.getHttpServer())
      .get('/health/live')
      .expect('Content-Type', /json/)
      .expect(200);

    const body = livenessSchema.parse(response.body as unknown);
    expect(body.status).toBe('ok');
    expect(body.uptimeSeconds).toBeGreaterThan(0);
  });

  it('does not report readiness before readiness checks exist', async () => {
    await request(app.getHttpServer()).get('/health/ready').expect(404);
  });

  it('serves an OpenAPI contract with the liveness response constraints', async () => {
    const response = await request(app.getHttpServer())
      .get('/openapi.json')
      .expect(200);
    const document: unknown = response.body;
    const responses = ['paths', '/health/live', 'get', 'responses'];
    expect(document).toHaveProperty(
      [...responses, '200', 'content', 'application/json', 'schema'],
      {
        type: 'object',
        required: ['status', 'uptimeSeconds'],
        additionalProperties: false,
        properties: {
          status: { type: 'string', enum: ['ok'] },
          uptimeSeconds: { type: 'number', minimum: 0 },
        },
      },
    );
    expect(document).toHaveProperty([...responses, '500']);
    expect(document).not.toHaveProperty(['paths', '/health/ready']);
  });

  it.each([
    null,
    { status: 'ok', uptimeSeconds: -1 },
    { status: 'ok', uptimeSeconds: 1, secret: 'private-value' },
  ])('rejects an invalid provider response: %j', async (value) => {
    // Inject a provider defect to verify the HTTP boundary's runtime enforcement.
    vi.spyOn(app.get(HealthService), 'liveness').mockImplementation(
      () => value as ReturnType<HealthService['liveness']>,
    );
    const response = await request(app.getHttpServer())
      .get('/health/live')
      .expect(500);
    expect(response.body as unknown).toMatchObject({
      message: 'Invalid liveness response.',
    });
    expect(response.text).not.toContain('private-value');
    expect(lines.join('')).not.toContain('private-value');
  });

  it('correlates requests without logging client-controlled sensitive fields', async () => {
    lines.length = 0;
    const response = await request(app.getHttpServer())
      .get('/health/live?token=query-secret')
      .set('Authorization', 'Bearer authorization-secret')
      .set('Cookie', 'session=cookie-secret')
      .set('X-Request-Id', 'client-supplied-secret')
      .expect(200);
    const id = response.headers['x-request-id'];
    expect(id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
    const records = lines.map((line) =>
      logRecordSchema.parse(JSON.parse(line) as unknown),
    );
    const completed = records.filter(
      (record) => record.req?.id === id && record.res,
    );
    expect(completed).toHaveLength(1);
    expect(completed[0]).toMatchObject({
      req: { id, method: 'GET' },
      res: { statusCode: 200 },
    });
    expect(completed[0]?.responseTime).toBeGreaterThanOrEqual(0);
    for (const value of [
      'query-secret',
      'authorization-secret',
      'cookie-secret',
      'client-supplied-secret',
    ]) {
      expect(lines.join('')).not.toContain(value);
    }
    const second = await request(app.getHttpServer())
      .get('/health/live')
      .expect(200);
    expect(second.headers['x-request-id']).not.toBe(id);
  });

  it('omits submitted bodies and paths from request logs', async () => {
    lines.length = 0;
    await request(app.getHttpServer())
      .post('/private-path-secret')
      .send({ token: 'body-secret' })
      .expect(404);
    const records = lines.map((line) =>
      logRecordSchema.parse(JSON.parse(line) as unknown),
    );
    expect(records.some((record) => record.res?.statusCode === 404)).toBe(true);
    expect(lines.join('')).not.toContain('body-secret');
    expect(lines.join('')).not.toContain('private-path-secret');
  });

  it('rejects a controller whose required provider is missing', async () => {
    await expect(
      Test.createTestingModule({ controllers: [HealthController] }).compile(),
    ).rejects.toThrow(/HealthService/);
  });
});
