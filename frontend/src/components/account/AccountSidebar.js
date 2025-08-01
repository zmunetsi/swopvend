'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { logout } from '@/services/authService';
import { Ripple } from 'primereact/ripple';
import { StyleClass } from 'primereact/styleclass';
import { useRef } from 'react';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

export default function AccountSidebar({ user }) {
  const [currentPath, setCurrentPath] = useState('');
  const btnRef20 = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    window.location.href = `/login?next=${encodeURIComponent(currentPath)}`;
  };

  const profileImage = user?.profile_image_public_id || 'swopvend_placeholder_avatar';
  const displayName = user?.first_name || user?.username || 'User';

  return (
    <div id="app-sidebar-5" className="bg-primary hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-5 border-right-1 border-gray-800 w-18rem lg:w-7rem select-none h-full">
      <div className="flex flex-column h-full">
        <div className="flex align-items-center justify-content-center flex-shrink-0 bg-orange-500" style={{ height: '100px' }}>
          <img src="/swopvend_favicon.png" alt="hyper-light" height={60} />
        </div>
        <div className="mt-3">
          <ul className="list-none p-3 m-0">
            <li>
              <Link
                href="/"
                className="no-underline p-ripple flex flex-row lg:flex-column align-items-center justify-content-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full"
              >
                <i className="pi pi-home mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                <span className="font-medium inline text-base lg:text-xs lg:block text-center w-full">Home</span>
                <Ripple />
              </Link>
            </li>
            <li>
              <Link
                href="/account/profile"
                className="no-underline p-ripple flex flex-row lg:flex-column align-items-center justify-content-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full"
              >
                <i className="pi pi-user mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                <span className="font-medium inline text-base lg:text-xs lg:block text-center w-full">Profile</span>
                <Ripple />
              </Link>
            </li>
            <li>
              <Link
                href="/account/items"
                className="no-underline p-ripple flex flex-row lg:flex-column align-items-center justify-content-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full"
              >
                <i className="pi pi-list mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                <span className="font-medium inline text-base lg:text-xs lg:block text-center w-full">My Listings</span>
                <Ripple />
              </Link>
            </li>
            <li>
              <Link
                href="/account/swaps"
                className="no-underline p-ripple flex flex-row lg:flex-column align-items-center justify-content-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full"
              >
                <i className="pi pi-refresh mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                <span className="font-medium inline text-base lg:text-xs lg:block text-center w-full">My Swap Requests</span>
                <Ripple />
              </Link>
            </li>
            <li>
              <Link
                href="/items"
                className="no-underline p-ripple flex flex-row lg:flex-column align-items-center justify-content-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full"
              >
                <i className="pi pi-th-large mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                <span className="font-medium inline text-base lg:text-xs lg:block text-center w-full">Browse Items</span>
                <Ripple />
              </Link>
            </li>
            <li>
              <Link
                href="/account/security"
                className="no-underline p-ripple flex flex-row lg:flex-column align-items-center justify-content-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full"
              >
                <i className="pi pi-shield mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                <span className="font-medium inline text-base lg:text-xs lg:block text-center w-full">Security</span>
                <Ripple />
              </Link>
            </li>
            <li>
              <Link
                href="/support"
                className="no-underline p-ripple flex flex-row lg:flex-column align-items-center justify-content-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full"
              >
                <i className="pi pi-question mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                <span className="font-medium inline text-base lg:text-xs lg:block text-center w-full">Support</span>
                <Ripple />
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                type="button"
                className="p-ripple flex flex-row lg:flex-column align-items-center justify-content-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full bg-transparent border-none"
              >
                <i className="pi pi-sign-out mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                <span className="font-medium inline text-base lg:text-xs lg:block text-center w-full">Logout</span>
                <Ripple />
              </button>
            </li>
          </ul>
        </div>
        <div className="mt-auto mx-3">
          <hr className="mb-3 border-top-1 border-gray-800" />
          <Link
            href="/account/profile"
            className="no-underline p-ripple my-3 flex flex-row lg:flex-column align-items-center justify-content-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full"
          >
            <CldImage
              src={profileImage}
              alt="profile-avatar"
              width={32}
              height={32}
              className="mr-2 lg:mr-0"
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
            <span className="font-medium inline lg:hidden text-center w-full">{displayName}</span>
            <Ripple />
          </Link>
        </div>
      </div>
    </div>
  );
}