"use client";

import { useState } from 'react';

type Mode = 'login' | 'register';

export default function AuthPanel() {
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Processing...');

    const payload: Record<string, string> = { email, password };
    if (mode === 'register') payload.name = name;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      setMessage(data.message || 'Request failed.');
      return;
    }

    localStorage.setItem('token', data.token);
    setMessage(`${mode === 'login' ? 'Signed in' : 'Registered'} successfully.`);
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-5 flex gap-2">
        <button onClick={() => setMode('login')} className={`rounded-full px-4 py-2 text-sm ${mode === 'login' ? 'bg-white/20' : 'bg-white/5'}`}>Login</button>
        <button onClick={() => setMode('register')} className={`rounded-full px-4 py-2 text-sm ${mode === 'register' ? 'bg-white/20' : 'bg-white/5'}`}>Register</button>
      </div>
      <form onSubmit={onSubmit} className="space-y-3">
        {mode === 'register' && (
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3" />
        )}
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3" />
        <button className="rounded-full bg-cyanedge px-6 py-3 text-sm font-semibold text-black">Continue</button>
      </form>
      <p className="mt-4 text-sm text-steel">{message}</p>
    </div>
  );
}