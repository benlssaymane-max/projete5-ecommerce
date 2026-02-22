import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';

export async function POST(req: NextRequest) {
  await connectDB();
  const payload = await req.json();
  const order = await Order.create(payload);

  // Hook for email confirmation provider integration (SendGrid/Resend/etc).
  return NextResponse.json(order, { status: 201 });
}

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const query = userId ? { userId } : {};
  const orders = await Order.find(query).sort({ createdAt: -1 }).lean();
  return NextResponse.json(orders);
}