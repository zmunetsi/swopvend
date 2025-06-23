'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/authContext';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWithNav({ children }) {
  const { loading, user, setUser } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}