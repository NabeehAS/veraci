import 'reflect-metadata';
import type { Server } from 'node:http';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { AppModule } from '../src/app.module.js';
import { HealthController } from '../src/health/health.controller.js';

describe('API liveness and dependency injection', () => {
  let app: INestApplication<Server>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = module.createNestApplication<INestApplication<Server>>({ logger: false });
    await app.init();
  });

  afterAll(async () => {
    await app?.close();
  });

  it('serves process liveness through the injected health provider', async () => {
    const response = await request(app.getHttpServer())
      .get('/health/live')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      status: 'ok',
      uptimeSeconds: expect.any(Number),
    });
    expect(response.body.uptimeSeconds).toBeGreaterThan(0);
  });

  it('does not report readiness before readiness checks exist', async () => {
    await request(app.getHttpServer()).get('/health/ready').expect(404);
  });

  it('rejects a controller whose required provider is missing', async () => {
    await expect(
      Test.createTestingModule({ controllers: [HealthController] }).compile(),
    ).rejects.toThrow(/HealthService/);
  });
});
