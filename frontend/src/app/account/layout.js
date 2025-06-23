import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AccountSidebar from '@/components/account/AccountSidebar';
import AccountNavbar from '@/components/account/AccountNavbar';
import { ServerAuthProvider } from '@/context/ServerAuthContext';

export default async function AccountLayout({ children }) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString(); // Get all cookies as a string

  let user = null;

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/traders/me`, {
      cache: 'no-store',
      headers: {
        Cookie: cookieHeader, // Forward cookies to API
      },
      credentials: 'include',
    });
    if (res.ok) {
      user = await res.json();
    }
  } catch (e) {
    // Optionally log or handle error
  }

  if (!user || !user.id) {
    redirect('/login');
  }

  return (
    <ServerAuthProvider user={user}>
      <div className="min-h-screen flex relative lg:static surface-ground">
        <AccountSidebar />
        <div className="min-h-screen flex flex-column relative flex-auto">
          <AccountNavbar />
          <div className="p-5 flex flex-column flex-auto">
            {children}
          </div>
        </div>
      </div>
    </ServerAuthProvider>
  );
}