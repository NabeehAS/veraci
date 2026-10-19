import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

export function configureApp(app: INestApplication) {
  app.useLogger(app.get(Logger));

  const definition = new DocumentBuilder()
    .setTitle('VeraCI API')
    .setDescription('Local foundation API. Liveness does not imply dependency readiness.')
    .setVersion('0.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, definition);
  SwaggerModule.setup('openapi', app, document, {
    ui: false,
    raw: ['json'],
    jsonDocumentUrl: '/openapi.json',
  });
}
