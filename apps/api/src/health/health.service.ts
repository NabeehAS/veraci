import { Injectable } from '@nestjs/common';
import { uptime } from 'node:process';

@Injectable()
export class HealthService {
  liveness() {
    return { status: 'ok' as const, uptimeSeconds: uptime() };
  }
}
