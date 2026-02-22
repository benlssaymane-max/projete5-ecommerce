import AuthPanel from '@/components/account/AuthPanel';

export default function AccountPage() {
  return (
    <main className="section-pad">
      <h1 className="display-font text-4xl font-semibold md:text-5xl">Your Account</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <AuthPanel />
        <section className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Orders & Settings</h2>
          <p className="mt-2 text-sm text-steel">After login, this area can display order history, addresses, notifications, and account settings.</p>
        </section>
      </div>
    </main>
  );
}