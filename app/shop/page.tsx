import ProductGrid from '@/components/shop/ProductGrid';

export default function ShopPage() {
  return (
    <main className="section-pad">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-cyanedge">Shop</p>
        <h1 className="display-font mt-2 text-4xl font-semibold md:text-6xl">Premium Products</h1>
        <p className="mt-4 max-w-2xl text-steel">Search, filter, and explore high-performance products with a cinematic browsing flow.</p>
      </header>
      <ProductGrid />
    </main>
  );
}
