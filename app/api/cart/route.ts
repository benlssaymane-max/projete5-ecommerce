import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  const { userId, productId, quantity } = await req.json();
  await connectDB();

  const user = await User.findById(userId);
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

  const existing = user.cart.find((i: { productId: string }) => i.productId === productId);
  if (existing) existing.quantity += quantity ?? 1;
  else user.cart.push({ productId, quantity: quantity ?? 1 });

  await user.save();
  return NextResponse.json({ cart: user.cart });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ message: 'userId missing' }, { status: 400 });

  await connectDB();
  const user = (await User.findById(userId).lean()) as { cart?: unknown[] } | null;
  return NextResponse.json(user?.cart || []);
}
