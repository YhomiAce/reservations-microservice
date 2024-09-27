import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentCreateChargeDto } from './dto/payment-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2024-06-20',
    },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationService: ClientProxy,
  ) {
    // this.stripe = new Stripe(configService.get("STRIPE_SECRET_KEY"))
  }

  async createCharge({ amount, email }: PaymentCreateChargeDto) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: "card",
    //   card
    // });

    // create a payment intent
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: 'pm_card_visa',
      amount: amount * 100, // in cents
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });
    this.notificationService.emit('notify_email', {
      email,
      text: `Your Payment of ${amount} has completed successfully`,
    });
    return paymentIntent;
  }
}
