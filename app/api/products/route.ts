import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');
  const category = searchParams.get('category');

  const filter: Record<string, unknown> = {};
  if (q) filter.name = { $regex: q, $options: 'i' };
  if (category && category !== 'All') filter.category = category;

  const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const created = await Product.create(body);
  return NextResponse.json(created, { status: 201 });
}