import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { livenessSchema } from './health.schema.js';
import { HealthService } from './health.service.js';

@Controller('health')
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @Get('live')
  @ApiOperation({ summary: 'Process liveness', description: 'Does not check external dependencies.' })
  @ApiOkResponse({
    description: 'Process is responding.',
    standardSchema: livenessSchema,
    headers: { 'X-Request-Id': { schema: { type: 'string', format: 'uuid' } } },
  })
  @ApiInternalServerErrorResponse({ description: 'Invalid liveness response.' })
  live() {
    const result = livenessSchema.safeParse(this.health.liveness());
    if (!result.success) {
      throw new InternalServerErrorException('Invalid liveness response.');
    }
    return result.data;
  }
}
