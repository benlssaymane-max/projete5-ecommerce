import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Review from '@/models/Review';

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const review = await Review.create(body);
  return NextResponse.json(review, { status: 201 });
}

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');
  if (!productId) return NextResponse.json([], { status: 200 });

  const reviews = await Review.find({ productId }).sort({ createdAt: -1 }).lean();
  return NextResponse.json(reviews);
}