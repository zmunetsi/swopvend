'use client';

import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { Ripple } from 'primereact/ripple';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/services/authService';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/account/profile'; // fallback if no referrer

  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [checked4, setChecked4] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await login(form);
      setMessage('Login successful!');
      // Force full reload for fresh cookies/user state
      window.location.href = next;
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="surface-ground px-4 py-8 md:px-6 lg:px-8">
      <div className="flex flex-wrap shadow-2">
        <div className="w-full lg:w-6 px-0 py-4 lg:p-7">
          <Link href="/" className="flex align-items-center mb-6">
            <img src="/assets/images/auth/swopvend_concept_logo_top_white_640x740.webp" alt="Image" className="w-full" />
          </Link>
        </div>
        <div className="w-full lg:w-6 p-4 lg:p-7 surface-card">
          <div className="flex align-items-center justify-content-between mb-2">
            <h1 className="text-2xl font-bold text-primary">Login to SwopVend</h1>
            <Link href="/signup">
              <Button label="Don't have an account. Sign up" icon="pi pi-chevron-right" iconPos="right" className='font-light text-sm text-primary' text />
            </Link>
          </div>
          <div className="flex justify-content-between">
            <button className="p-ripple mr-2 w-6 font-medium border-1 surface-border surface-100 py-3 px-2 p-component hover:surface-200 active:surface-300 text-700 cursor-pointer transition-colors transition-duration-150 inline-flex align-items-center justify-content-center">
              <i className="pi pi-facebook text-primary mr-2"></i>
              <span>Sign in With Facebook</span>
              <Ripple />
            </button>
            <button className="p-ripple ml-2 w-6 font-medium border-1 surface-border surface-100 py-3 px-2 p-component hover:surface-200 active:surface-300 text-700 cursor-pointer transition-colors transition-duration-150 inline-flex align-items-center justify-content-center">
              <i className="pi pi-google text-pink-400 mr-2"></i>
              <span>Sign in With Google</span>
              <Ripple />
            </button>
          </div>
          <Divider align="center" className="my-4">
            <span className="text-600 font-normal text-sm">OR</span>
          </Divider>
          <form onSubmit={handleLogin}>
            <label htmlFor="username" className="block text-primary font-medium mb-2">Username or Email</label>
            <InputText
              id="username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full mb-3 p-3"
            />

            <label htmlFor="password4" className="block text-primary font-medium mb-2">Password</label>
            <InputText
              id="password4"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mb-3 p-3" />

            <div className="flex align-items-center justify-content-between mb-6">
              <div className="flex align-items-center">
                <Checkbox id="rememberme" className="mr-2" checked={checked4} onChange={(e) => setChecked4(e.checked)} />
                <label htmlFor="rememberme">Remember me</label>
              </div>
              <a className="font-medium text-primary hover:text-blue-700 cursor-pointer transition-colors transition-duration-150">Forgot password?</a>
            </div>

            <Button type="submit" label="Sign In" className="w-full py-3 font-medium" disabled={loading} />
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {message && <p className="text-green-500 mt-4">{message}</p>}
        </div>
      </div>
    </div >
  );
}