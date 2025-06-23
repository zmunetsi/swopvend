'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/services/authService';
import { Ripple } from 'primereact/ripple';
import { StyleClass } from 'primereact/styleclass';
import { useRef } from 'react';
import Link from 'next/link';

export default function AccountSidebar() {
  const btnRef20 = useRef(null);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div id="app-sidebar-5" className="bg-primary hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 border-gray-800 w-18rem lg:w-7rem select-none">
      <div className="flex flex-column h-full">
        <div className="flex align-items-center justify-content-center flex-shrink-0 bg-orange-500" style={{ height: '100px' }}>
          <img src="/swopvend_favicon.png" alt="hyper-light" height={60} />
        </div>
        <div className="mt-3">
          <ul className="list-none p-3 m-0">
            <li>
              <Link
                href="/"
                className="no-underline p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full"
              >
                <i className="pi pi-home mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                <span className="font-medium inline text-base lg:text-xs lg:block">Home</span>
                <Ripple />
              </Link>
            </li>
            <li>
              <Link
                href="/account/profile"
                className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full"
              >
                <i className="pi pi-users mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                <span className="font-medium inline text-base lg:text-xs lg:block">Profile</span>
                <Ripple />
              </Link>
            </li>
            <li className="relative">
              <StyleClass nodeRef={btnRef20} selector="@next" enterClassName="hidden" leaveToClassName="hidden" hideOnOutsideClick>
                <a ref={btnRef20} className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full">
                  <span className="font-medium inline text-base lg:text-xs lg:block">Listings</span>
                  <i className="pi pi-chevron-down ml-auto lg:hidden"></i>
                  <Ripple />
                </a>
              </StyleClass>
              <ul className="list-none pl-3 pr-0 py-0 lg:p-3 m-0 lg:ml-3 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out static lg:absolute left-100 top-0 z-1 bg-primary shadow-none lg:shadow-2 w-full lg:w-15rem">
                <li>
                  <Link
                    href="/account/swaps"
                    className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full"
                  >
                    <i className="pi pi-chart-line mr-2"></i>
                    <span className="font-medium">My listings</span>
                    <Ripple />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/items"
                    className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full"
                  >
                    <i className="pi pi-chart-line mr-2"></i>
                    <span className="font-medium">Browse items</span>
                    <Ripple />
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href="/account/security"
                className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full"
              >
                <i className="pi pi-cog mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                <span className="font-medium inline text-base lg:text-xs lg:block">Security</span>
                <Ripple />
              </Link>
            </li>
            <li>
              <Link
                href="/support"
                className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full"
              >
                <i className="pi pi-cog mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                <span className="font-medium inline text-base lg:text-xs lg:block">Support</span>
                <Ripple />
              </Link>
            </li>
            <li>
              <a
                onClick={handleLogout}
                className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full">
                <i className="pi pi-sign-out mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                <span className="font-medium inline text-base lg:text-xs lg:block">Logout</span>
                <Ripple />
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-auto mx-3">
          <hr className="mb-3  border-top-1 border-gray-800" />
          <a className="p-ripple my-3 flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full">
            <img src="/assets/images/avatars/swopvend_placeholder_avatar.png" alt="swopvend_placeholder_avatar" className="mr-2 lg:mr-0" style={{ width: '32px', height: '32px' }} />
            <span className="font-medium inline lg:hidden">Amy Elsner</span>
            <Ripple />
          </a>
        </div>
      </div>
    </div>
  );
}