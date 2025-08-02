'use client';

import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Divider } from 'primereact/divider';
import Link from 'next/link';
import { forgotPassword } from '@/services/authService';

export default function ForgotpasswordForm() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email);
      setMessage('If an account with that email exists, a password reset link has been sent.');
      setEmail('');
      setTouched(false);
    } catch (err) {
      if (err?.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError('Failed to send reset email.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="surface-ground px-4 py-8 md:px-6 lg:px-8">
      <div className="flex align-items-center flex-wrap shadow-2">
        <div className="w-full lg:w-6 px-0 py-4 lg:p-7">
          <Link href="/" className="flex align-items-center mb-6">
            <img src="/assets/images/auth/swopvend_concept_logo_top_white_640x740.webp" alt="Image" className="w-full" />
          </Link>
        </div>
        <div className="w-full lg:w-6 p-4 lg:p-7 surface-card">
          <div className="flex align-items-center justify-content-between mb-2">
            <h1 className="text-2xl font-bold text-primary">Forgot Password</h1>
            <Link href="/signup">
              <Button label="Don't have an account? Sign up" icon="pi pi-chevron-right" iconPos="right" className='font-light text-sm text-primary' text />
            </Link>
          </div>
          <Divider align="center" className="my-4" />
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block text-primary font-medium mb-2">Email</label>
            <InputText
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`w-full mb-3 p-3${touched && !email ? ' p-invalid' : ''}`}
              disabled={loading}
              onBlur={() => setTouched(true)}
              required
            />
            <Button
              type="submit"
              label={loading ? "Sending..." : "Send Reset Link"}
              className="w-full py-3 font-medium"
              disabled={loading}
            />
          </form>
          {error && <Message severity="error" text={error} className="mt-4" />}
          {message && <Message severity="success" text={message} className="mt-4" />}
          <div className="mt-4 text-center">
            <Link href="/login" className="text-primary underline">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}