import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  const { userId, productId } = await req.json();
  await connectDB();
  const user = await User.findById(userId);
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
    await user.save();
  }

  return NextResponse.json({ wishlist: user.wishlist });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ message: 'userId missing' }, { status: 400 });

  await connectDB();
  const user = (await User.findById(userId).lean()) as { wishlist?: string[] } | null;
  return NextResponse.json(user?.wishlist || []);
}
