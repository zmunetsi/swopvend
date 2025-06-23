'use client';

import React, { useRef } from 'react';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';
import { Badge } from 'primereact/badge';
import { InputText } from 'primereact/inputtext';

export default function AccountNavbar({ form, handleChange }) {
  const btnRef22 = useRef(null);
  const btnRef23 = useRef(null);

  return (
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
            className="border-none"
            value={form?.searchQuery || ''}
            onChange={handleChange}
            placeholder="Search"
            name="searchQuery"
          />
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
  );
}