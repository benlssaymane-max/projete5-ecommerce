import Link from 'next/link';

export default function AdminPage() {
  return (
    <main className="section-pad">
      <h1 className="display-font text-4xl font-semibold md:text-5xl">Admin Dashboard</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Link href="/admin/products" className="glass rounded-2xl p-6">Manage Products</Link>
        <Link href="/admin/orders" className="glass rounded-2xl p-6">Manage Orders</Link>
        <Link href="/admin/users" className="glass rounded-2xl p-6">Manage Users</Link>
      </div>
    </main>
  );
}
