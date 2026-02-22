import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const product = await Product.findById(params.id).lean();
  if (!product) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();
  const updated = await Product.findByIdAndUpdate(params.id, data, { new: true });
  if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}