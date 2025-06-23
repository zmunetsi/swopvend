// app/contexts/AuthContext.js
'use client';

import { createContext, useState, useEffect } from 'react';
import { fetchCurrentUser } from '@/services/authService';
import { usePathname } from 'next/navigation';

export const AuthContext = createContext({
  user: null,
  loading: true,
  setUser: () => {},
});

export function AuthProvider({ children, initialUser = null }) {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Always fetch user on mount or route change
    const fetchUser = async () => {
      try {
        const u = await fetchCurrentUser();
        setUser(u);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
    // Optionally, only run on mount: []
    // To also run on route change, add [pathname]
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
