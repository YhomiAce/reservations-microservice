import { NestFactory } from '@nestjs/core';
import { ReservationsAppModule } from './reservations-app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsAppModule);
  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: true,
    whitelist: true
  }))
  app.useLogger(app.get(Logger))
  const configService = app.get(ConfigService)
  await app.listen(configService.get("PORT"));
}
bootstrap();
