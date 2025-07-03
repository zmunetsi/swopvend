'use client';

import { Suspense } from 'react';
import ForgotPasswordForm from '@/components/auth/ForgotpasswordForm';

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordForm />
    </Suspense>
  );
}