// components/ProtectedRoute.jsx
'use client';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/authContext';

export default function ProtectedRoute({ children }) {

  // wait while checking auth
  if (loading) return null;

  // redirect if no user
  if (!user) {
    router.push('/login');
    return null;
  }

  // else render protected UI
  return <>{children}</>;
}
