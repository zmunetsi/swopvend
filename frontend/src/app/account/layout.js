import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AccountSidebar from '@/components/account/AccountSidebar';
import AccountNavbar from '@/components/account/AccountNavbar';
import { ServerAuthProvider } from '@/context/ServerAuthContext';

export default async function AccountLayout({ children }) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  let user = null;

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/traders/me`, {
      cache: 'no-store',
      headers: { Cookie: cookieHeader },
      credentials: 'include',
    });
    if (res.ok) {
      user = await res.json();
    }
  } catch (e) {}

  const currentPath = headers().get('x-pathname');

  if (!user || !user.id) {
    redirect(`/login?next=${encodeURIComponent(currentPath)}`);
  }

  return (
    <ServerAuthProvider user={user}>
      <div className="min-h-screen flex relative lg:static surface-ground">
        <AccountSidebar user={user} />
        <div className="min-h-screen flex flex-column relative flex-auto">
          <AccountNavbar user={user} />
          <div className="flex flex-column flex-auto">
            {children}
          </div>
        </div>
      </div>
    </ServerAuthProvider>
  );
}