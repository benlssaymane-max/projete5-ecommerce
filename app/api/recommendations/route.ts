import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mockData';
import { getRecommendations } from '@/lib/recommendations';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');
  const product = mockProducts.find((p) => p._id === productId) || mockProducts[0];
  const recommendations = getRecommendations(product, mockProducts);
  return NextResponse.json(recommendations);
}