import { stripe } from '../config/stripe';
import type Stripe from 'stripe';

type CreateCheckoutSessionInput = {
  amount: number;
  currency?: string;
  roomName: string;
  description: string;
  customerEmail: string;
  metadata?: Record<string, string>;
};

export class PaymentService {
  async createCheckoutSession(
    data: CreateCheckoutSessionInput
  ): Promise<Stripe.Checkout.Session> {
    const successUrl =
      process.env.SUCCESS_URL ||
      'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}';

    const cancelUrl =
      process.env.CANCEL_URL ||
      'http://localhost:3000/cancel';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: data.customerEmail,
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: [
        {
          price_data: {
            currency: data.currency || 'usd',
            unit_amount: Math.round(data.amount * 100),
            product_data: {
              name: data.roomName,
              description: data.description
            }
          },
          quantity: 1
        }
      ],
      metadata: data.metadata
    });

    return session;
  }

  async retrieveCheckoutSession(
    sessionId: string
  ): Promise<Stripe.Checkout.Session> {
    return await stripe.checkout.sessions.retrieve(sessionId);
  }

  async refundCheckoutSession(sessionId: string): Promise<Stripe.Refund> {
    const session = await this.retrieveCheckoutSession(sessionId);

    if (session.payment_status !== 'paid') {
      throw new Error('Cannot refund unpaid checkout session');
    }

    const paymentIntentId =
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id;

    if (!paymentIntentId) {
      throw new Error('Payment intent not found for this checkout session');
    }

    return await stripe.refunds.create({
      payment_intent: paymentIntentId,
      reason: 'requested_by_customer'
    });
  }
}