import { NestFactory } from '@nestjs/core';
import { ReservationsAppModule } from './reservations-app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsAppModule);
  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: true,
    whitelist: true
  }))
  app.useLogger(app.get(Logger))
  await app.listen(3000);
}
bootstrap();
