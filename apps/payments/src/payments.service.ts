import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(this.configService.get("STRIPE_SECRET_KEY"), {
    apiVersion: "2024-06-20"
  });

  constructor(
    private readonly configService: ConfigService
  ){
    // this.stripe = new Stripe(configService.get("STRIPE_SECRET_KEY"))
  }

  async createCharge({amount}: CreateChargeDto) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: "card",
    //   card
    // });

    // create a payment intent
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: 'pm_card_visa',
      amount: amount * 100, // in cents
      confirm: true,
      payment_method_types: ["card"],
      currency: "usd"
    })
    return paymentIntent;
  }
}
