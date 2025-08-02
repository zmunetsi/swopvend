'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Divider } from 'primereact/divider';
import Link from 'next/link';
import { resetPassword } from '@/services/authService';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ newPassword1: true, newPassword2: true });
    setError('');
    setMessage('');

    if (!newPassword1 || !newPassword2) {
      setError('Please fill in both password fields.');
      return;
    }
    if (newPassword1 !== newPassword2) {
      setError('Passwords do not match.');
      return;
    }
    if (!uid || !token) {
      setError('Invalid or missing reset link.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword({
        uid,
        token,
        new_password1: newPassword1,
        new_password2: newPassword2,
      });
      setMessage('Your password has been reset successfully. You can now log in.');
      setNewPassword1('');
      setNewPassword2('');
      setTimeout(() => router.push('/login'), 3000);
    } catch (err) {
      if (err?.response?.data) {
        const data = err.response.data;
        const firstError = Object.values(data)[0];
        setError(Array.isArray(firstError) ? firstError[0] : firstError);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError('Failed to reset password.');
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
            <h1 className="text-2xl font-bold text-primary">Reset Password</h1>
            <Link href="/signup">
              <Button label="Don't have an account? Sign up" icon="pi pi-chevron-right" iconPos="right" className='font-light text-sm text-primary' text />
            </Link>
          </div>
          <Divider align="center" className="my-4" />
          <form onSubmit={handleSubmit}>
            <label htmlFor="newPassword1" className="block text-primary font-medium mb-2">New Password</label>
            <div className="p-inputgroup w-full mb-3">
              <InputText
                id="newPassword1"
                type={showPassword1 ? "text" : "password"}
                name="newPassword1"
                value={newPassword1}
                onChange={e => setNewPassword1(e.target.value)}
                className={`w-full p-3${touched.newPassword1 && !newPassword1 ? ' p-invalid' : ''}`}
                disabled={loading}
                onBlur={() => setTouched(t => ({ ...t, newPassword1: true }))}
                required
              />
              <Button
                type="button"
                icon={showPassword1 ? "pi pi-eye-slash" : "pi pi-eye"}
                className="p-button-primary"
                onClick={() => setShowPassword1(v => !v)}
                tabIndex={-1}
              />
            </div>
            <label htmlFor="newPassword2" className="block text-primary font-medium mb-2">Confirm New Password</label>
            <div className="p-inputgroup w-full mb-3">
              <InputText
                id="newPassword2"
                type={showPassword2 ? "text" : "password"}
                name="newPassword2"
                value={newPassword2}
                onChange={e => setNewPassword2(e.target.value)}
                className={`w-full p-3${touched.newPassword2 && !newPassword2 ? ' p-invalid' : ''}`}
                disabled={loading}
                onBlur={() => setTouched(t => ({ ...t, newPassword2: true }))}
                required
              />
              <Button
                type="button"
                icon={showPassword2 ? "pi pi-eye-slash" : "pi pi-eye"}
                className="p-button-primary"
                onClick={() => setShowPassword2(v => !v)}
                tabIndex={-1}
              />
            </div>
            <Button
              type="submit"
              label={loading ? "Resetting..." : "Reset Password"}
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