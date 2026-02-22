import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const key = process.env.STRIPE_SECRET_KEY;

export async function POST(req: NextRequest) {
  if (!key) {
    return NextResponse.json({ message: 'Missing STRIPE_SECRET_KEY' }, { status: 500 });
  }

  const stripe = new Stripe(key, { apiVersion: '2024-06-20' });
  const { amount = 1000, currency = 'usd' } = await req.json();

  const intent = await stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: { enabled: true }
  });

  return NextResponse.json({ clientSecret: intent.client_secret });
}