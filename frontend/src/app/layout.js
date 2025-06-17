// Theme
import 'primereact/resources/primereact.min.css';         // Core CSS
import 'primeflex/primeflex.css'; // PrimeFlex for layout utilities
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import '../styles/global.css'; // Global styles
import '../styles/theme.css';
import { Inter_Tight } from 'next/font/google';
import { AuthProvider } from '@/context/authContext';

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight'
});

export const metadata = {
  title: 'SwopVend',
  description: 'A platform to swap items easily and securely.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={interTight.variable}>
      <body className="font-sans text-gray-900 bg-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
