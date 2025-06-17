'use client';

import { useRef, useState, useEffect, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Badge } from 'primereact/badge';
import { InputText } from 'primereact/inputtext';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';
import { logout } from '@/services/authService';
import { AuthContext } from '@/context/authContext';
import { redirect } from 'next/navigation'

export default function AccountLayout({ children }) {

  const router = useRouter();
   const { user } = useContext(AuthContext);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [form, setForm] = useState({ searchQuery: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const btnRef20 = useRef(null);
  const btnRef21 = useRef(null);
  const btnRef22 = useRef(null);
  const btnRef23 = useRef(null);
 

  useEffect(() => {
    console.log( "inside",  user )
    // // Only run on the client
    // const token = localStorage.getItem('access');

    // if (!token) {
    //   // No token => redirect to login
    //   router.replace('/login');
    // } else {
    //   // You could optionally verify the token by hitting /api/traders/me/
    //   setCheckingAuth(false);
    // }
  }, [router]);

  // While we're checking auth, render nothing (or a spinner)
  // if (checkingAuth) {
  //   return null;
  // }

    // redirect if no user
  if (!user??id) {
    redirect('/login');
    return null;
  }
 console.log( "outside",  user )
 
  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onLogout = async () => {
    try {
      logout();
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally show an error message to the user
    }
  };

  return (
      <div className="min-h-screen flex relative lg:static surface-ground">
        <div id="app-sidebar-5" className="bg-primary hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 border-gray-800 w-18rem lg:w-7rem select-none">
          <div className="flex flex-column h-full">
            <div className="flex align-items-center justify-content-center flex-shrink-0 bg-orange-500" style={{ height: '100px' }}>
              <img src="/swopvend_favicon.png" alt="hyper-light" height={60} />
            </div>
            <div className="mt-3">
              <ul className="list-none p-3 m-0">
                <li>
                  <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full">
                    <i className="pi pi-home mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                    <span className="font-medium inline text-base lg:text-xs lg:block">Home</span>
                    <Ripple />
                  </a>
                </li>
                <li>
                  <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full">
                    <i className="pi pi-users mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                    <span className="font-medium inline text-base lg:text-xs lg:block">Profile</span>
                    <Ripple />
                  </a>
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
                      <a className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full">
                        <i className="pi pi-chart-line mr-2"></i>
                        <span className="font-medium">My listings</span>
                        <Ripple />
                      </a>
                    </li>
                    <li>
                      <a className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full">
                        <i className="pi pi-chart-line mr-2"></i>
                        <span className="font-medium">Browse items</span>
                        <Ripple />
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full">
                    <i className="pi pi-cog mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                    <span className="font-medium inline text-base lg:text-xs lg:block">Security</span>
                    <Ripple />
                  </a>
                </li>
                <li>
                  <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-white hover:text-white transition-duration-150 transition-colors w-full">
                    <i className="pi pi-cog mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg"></i>
                    <span className="font-medium inline text-base lg:text-xs lg:block">Support</span>
                    <Ripple />
                  </a>
                </li>
                <li>
                  <a
                    onClick={onLogout}
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
        <div className="min-h-screen flex flex-column relative flex-auto">
          <div className="flex justify-content-between align-items-center px-5 surface-section relative lg:static border-bottom-1 border-primary" style={{ height: '100px' }}>
            <div className="flex">
              <StyleClass nodeRef={btnRef22} selector="#app-sidebar-5" enterClassName="hidden" enterActiveClassName="fadeinleft" leaveToClassName="hidden" leaveActiveClassName="fadeoutleft" hideOnOutsideClick>
                <a ref={btnRef22} className="p-ripple cursor-pointer block lg:hidden text-700 mr-3">
                  <i className="pi pi-bars text-4xl"></i>
                  <Ripple />
                </a>
              </StyleClass>
              <span className="p-input-icon-left">
                <i className="pi pi-search"></i>
                <InputText
                  type="search"
                  className="border-none" value={form.searchQuery}
                  onChange={handleChange}
                  placeholder="Search" />
              </span>
            </div>
            <StyleClass nodeRef={btnRef23} selector="@next" enterClassName="hidden" enterActiveClassName="fadein" leaveToClassName="hidden" leaveActiveClassName="fadeout" hideOnOutsideClick>
              <a ref={btnRef23} className="p-ripple cursor-pointer block lg:hidden text-700">
                <i className="pi pi-ellipsis-v text-2xl"></i>
                <Ripple />
              </a>
            </StyleClass>
            <ul className="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row
    surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static">
              <li>
                <a className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors">
                  <i className="pi pi-inbox text-base lg:text-2xl mr-2 lg:mr-0"></i>
                  <span className="block lg:hidden font-medium">Inbox</span>
                  <Ripple />
                </a>
              </li>
              <li>
                <a className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors">
                  <i className="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0 p-overlay-badge"><Badge severity="danger" /></i>
                  <span className="block lg:hidden font-medium">Notifications</span>
                  <Ripple />
                </a>
              </li>
              <li className="border-top-1 surface-border lg:border-top-none">
                <a className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors">
                  <img src="/assets/images/avatars/swopvend_placeholder_avatar.png" alt="swopvend-placeholder-avatar" className="mr-3 lg:mr-0" style={{ width: '32px', height: '32px' }} />
                  <div className="block lg:hidden">
                    <div className="text-primary font-medium">Josephine Lillard</div>
                    <span className="text-primary font-medium text-sm">Marketing Specialist</span>
                  </div>
                  <Ripple />
                </a>
              </li>
            </ul>
          </div>
          <div className="p-5 flex flex-column flex-auto">
            {children}
          </div>
        </div>
      </div>

  );
}
