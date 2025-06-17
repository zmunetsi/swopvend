'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/authContext';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWithNav({ children }) {
  const { user, loading } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}