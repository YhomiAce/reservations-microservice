import { Injectable, Logger } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  constructor(
    private readonly configService: ConfigService
  ){}
  private readonly transporter = nodemailer.createTransport({
    host: this.configService.get('SMTP_HOST'),
    port: this.configService.get('SMTP_PORT'),
    secure: false,
    auth: {
      user: this.configService.get('SMTP_USER'),
      pass: this.configService.get('SMTP_PASSWORD'),
    }
  })

  async notifyEmail(data: NotifyEmailDto) {
    try {
      this.logger.log({data});
    await this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: data.email,
      subject: 'Reservation Notification',
      text: data.text
    })
    this.logger.log('EMAIL SENT TO '+data.email)
    } catch (error) {
      this.logger.error(error)
    }
  }
}
