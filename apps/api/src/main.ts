import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { readConfig } from './config.js';
import { configureApp } from './configure-app.js';

const config = readConfig();
const app = await NestFactory.create(AppModule.register(config), { bufferLogs: true });
configureApp(app);
app.enableShutdownHooks();
await app.listen(config.port, '127.0.0.1');
