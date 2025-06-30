'use client';

import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { Message } from 'primereact/message';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signup } from '@/services/authService';
import { useAuth } from '@/context/authContext'; // or your user context/hook

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/account/profile';
  const { user, loading } = useAuth();

  useEffect(() => {
    // Only redirect if user exists and has a valid id or username
    if (!loading && user && (user.id || user.username)) {
      router.replace('/account/profile');
    }
  }, [user, loading, router]);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [checked4, setChecked4] = useState(false);
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    if (!form.email) missing.push('email');
    if (!form.password) missing.push('password');
    if (!form.confirm_password) missing.push('confirm_password');
    return missing;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const missing = validate();
    if (missing.length > 0) {
      setTouched((t) => ({
        ...t,
        username: true,
        email: true,
        password: true,
        confirm_password: true,
      }));
      setError('Please fill in all required fields.');
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("Passwords don’t match");
      setTouched((t) => ({
        ...t,
        password: true,
        confirm_password: true,
      }));
      return;
    }

    try {
      const response = await signup(form);
      if (response) {
        setMessage('Signup successful! Redirecting...');
        window.location.href = next;
      }
    } catch (err) {
      setError(
        err?.response?.data?.confirm_password ||
        err?.response?.data?.detail ||
        'Signup failed. Please try again.'
      );
    }
  };

  return (
    <div className="surface-ground px-4 py-8 md:px-6 lg:px-8">
      <div className="flex flex-wrap shadow-2">
        <div className="w-full lg:w-6 px-0 py-4 lg:p-7">
          <Link href="/" className="flex align-items-center mb-6">
            <img src="assets/images/auth/swopvend_concept_logo_top_white_640x740.webp" alt="Image" className="w-full" />
          </Link>
        </div>
        <div className="w-full lg:w-6 p-4 lg:p-7 surface-card">
          <div className="flex align-items-center justify-content-between mb-2">
            <h1 className="text-2xl font-bold text-primary">Create account</h1>
            <Link href="/login">
              <Button label="Already have an account. Login" icon="pi pi-chevron-right" iconPos="right" className='font-light text-sm text-primary' text />
            </Link>
          </div>
          <Divider align="center" className="my-4" />
          <form onSubmit={handleSubmit} className="w-full">
            <label htmlFor="username" className="block text-primary font-medium mb-2"> Username</label>
            <InputText
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              className={`w-full mb-3 p-3${touched.username && !form.username ? ' p-invalid' : ''}`}
            />
            <label htmlFor="email" className="block text-primary font-medium mb-2">Email</label>
            <InputText
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              className={`w-full mb-3 p-3${touched.email && !form.email ? ' p-invalid' : ''}`}
            />
            <label htmlFor="password" className="block text-primary font-medium mb-2">Password</label>
            <div className="p-inputgroup w-full mb-3">
              <InputText
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type={showPassword ? "text" : "password"}
                className={`w-full p-3${touched.password && !form.password ? ' p-invalid' : ''}`}
              />
              <Button
                type="button"
                icon={showPassword ? "pi pi-eye-slash" : "pi pi-eye"}
                className="p-button-primary"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              />
            </div>
            <label htmlFor="confirmPassword" className="block text-primary font-medium mb-2">Confirm Password</label>
            <div className="p-inputgroup w-full mb-3">
              <InputText
                id="confirmPassword"
                name="confirm_password"
                value={form.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                type={showConfirmPassword ? "text" : "password"}
                className={`w-full p-3${touched.confirm_password && !form.confirm_password ? ' p-invalid' : ''}`}
              />
              <Button
                type="button"
                icon={showConfirmPassword ? "pi pi-eye-slash" : "pi pi-eye"}
                className="p-button-primary"
                onClick={() => setShowConfirmPassword((v) => !v)}
                tabIndex={-1}
              />
            </div>

            <div className="flex align-items-center justify-content-between mb-6">
              <div className="flex align-items-center">
                <Checkbox id="rememberme" className="mr-2" checked={checked4} onChange={(e) => setChecked4(e.checked)} />
                <label htmlFor="rememberme">Remember me</label>
              </div>
              <a className="font-medium text-primary hover:text-blue-700 cursor-pointer transition-colors transition-duration-150">Forgot password?</a>
            </div>

            <Button label="Create account"
              type="submit"
              className="w-full py-3 font-medium" />
          </form>
          {error && <Message severity="error" text={error} className="mt-4" />}
          {message && <Message severity="success" text={message} className="mt-4" />}
        </div>
      </div>
    </div>
  );
}