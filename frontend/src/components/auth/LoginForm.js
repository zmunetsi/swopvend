'use client';

import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { Message } from 'primereact/message';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/services/authService';
import { useAuth } from '@/context/authContext'; // or your user context/hook

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/account/profile';
  const { user, loading: authLoading } = useAuth();

  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [checked4, setChecked4] = useState(false);
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (
      !authLoading &&
      user &&
      (user.id || user.username)
    ) {
      router.replace('/account/profile');
    }
  }, [user, authLoading, router]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  const handleBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  const validate = () => {
    const missing = [];
    if (!form.username) missing.push('username');
    if (!form.password) missing.push('password');
    return missing;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const missing = validate();
    if (missing.length > 0) {
      setTouched((t) => ({
        ...t,
        username: true,
        password: true,
      }));
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      await login(form);
      setMessage('Login successful!');
      window.location.href = next;
    } catch (err) {
      if (err?.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError('Invalid username or password');
      }
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
          <Divider align="center" className="my-4" />
          <form onSubmit={handleLogin}>
            <label htmlFor="username" className="block text-primary font-medium mb-2">Username or Email</label>
            <InputText
              id="username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full mb-3 p-3${touched.username && !form.username ? ' p-invalid' : ''}`}
              disabled={loading}
            />

            <label htmlFor="password4" className="block text-primary font-medium mb-2">Password</label>
            <div className="p-inputgroup w-full mb-3">
              <InputText
                id="password4"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-3${touched.password && !form.password ? ' p-invalid' : ''}`}
                disabled={loading}
              />
              <Button
                type="button"
                icon={showPassword ? "pi pi-eye-slash" : "pi pi-eye"}
                className="p-button-primary"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              />
            </div>

            <div className="flex align-items-center justify-content-between mb-6">
              <div className="flex align-items-center">
                <Checkbox id="rememberme" className="mr-2" checked={checked4} onChange={(e) => setChecked4(e.checked)} disabled={loading} />
                <label htmlFor="rememberme">Remember me</label>
              </div>
              <a className="font-medium text-primary hover:text-blue-700 cursor-pointer transition-colors transition-duration-150">Forgot password?</a>
            </div>

            <Button type="submit" label="Sign In" className="w-full py-3 font-medium" disabled={loading} />
          </form>
          {error && <Message severity="error" text={error} className="mt-4" />}
          {message && <Message severity="success" text={message} className="mt-4" />}
        </div>
      </div>
    </div >
  );
}