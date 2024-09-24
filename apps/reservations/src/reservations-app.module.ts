import { Module } from '@nestjs/common';
import { ReservationsModule } from './reservations/reservations.module';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "../env",
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      })
    }),
    DatabaseModule,
    ReservationsModule,
    LoggerModule
  ],
})
export class ReservationsAppModule {}
