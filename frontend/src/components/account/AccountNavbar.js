'use client';

import React, { useRef } from 'react';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';
import { Badge } from 'primereact/badge';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
import { CldImage } from 'next-cloudinary';

export default function AccountNavbar({ form, handleChange, user, onLogout }) {
  const btnRef22 = useRef(null);
  const btnRef23 = useRef(null);
  const menuRef = useRef(null);

  const profileImage = user?.profile_image_public_id || 'swopvend_placeholder_avatar';

  const menuItems = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => window.location.href = '/account/profile'
    },
    {
      label: 'My Items',
      icon: 'pi pi-box',
      command: () => window.location.href = '/account/items'
    },
    { separator: true },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: onLogout
    }
  ];

  return (
    <div className="flex justify-content-between align-items-center px-5 surface-section relative lg:static border-bottom-1 border-primary" style={{ height: '100px' }}>
      <div className="flex">
        <StyleClass nodeRef={btnRef22} selector="#app-sidebar-5" enterClassName="hidden" enterActiveClassName="fadeinleft" leaveToClassName="hidden" leaveActiveClassName="fadeoutleft" hideOnOutsideClick>
          <a ref={btnRef22} className="p-ripple cursor-pointer block lg:hidden text-primary mr-3">
            <i className="pi pi-bars text-5xl"></i>
            <Ripple />
          </a>
        </StyleClass>
        {/* <span className="p-input-icon-left">
          <i className="pi pi-search"></i>
          <InputText
            type="search"
            className="border-none"
            value={form?.searchQuery || ''}
            onChange={handleChange}
            placeholder="Search"
            name="searchQuery"
          />
        </span> */}
      </div>
      <StyleClass nodeRef={btnRef23} selector="@next" enterClassName="hidden" enterActiveClassName="fadein" leaveToClassName="hidden" leaveActiveClassName="fadeout" hideOnOutsideClick>
        <a ref={btnRef23} className="p-ripple cursor-pointer block lg:hidden text-700">
          <i className="pi pi-ellipsis-v text-3xl"></i>
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
          <div className="relative">
            <a
              className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors"
              onClick={e => menuRef.current.toggle(e)}
              tabIndex={0}
            >
              <CldImage
                src={profileImage}
                alt="profile-avatar"
                width={32}
                height={32}
                className="mr-3 lg:mr-0"
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <div className="block lg:hidden">
                <div className="text-primary font-medium">{user?.first_name || user?.username || 'User'}</div>
                <span className="text-primary font-medium text-sm">{user?.role || ''}</span>
              </div>
              <Ripple />
            </a>
            <Menu model={menuItems} popup ref={menuRef} id="profile_menu" />
          </div>
        </li>
      </ul>
    </div>
  );
}