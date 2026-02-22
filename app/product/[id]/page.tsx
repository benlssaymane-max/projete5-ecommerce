import ProductDetailClient from '@/components/shop/ProductDetailClient';

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  return (
    <main className="section-pad">
      <ProductDetailClient id={params.id} />
    </main>
  );
}