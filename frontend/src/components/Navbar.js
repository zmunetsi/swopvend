'use client';

import Link from 'next/link';
import { Button } from 'primereact/button';
import Logo from './Logo';
import { Ripple } from 'primereact/ripple';
import { StyleClass } from 'primereact/styleclass';
import { useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { useRouter } from 'next/navigation';
import { logout } from '@/services/authService';

export default function Navbar({ user, setUser, loading }) {
    // Only keep refs that are actually used
    const btnRef1 = useRef(null);
    const btnRef4 = useRef(null);
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        if (setUser) setUser(null);
        window.location.href = '/login';
    };

    return (
        <div className="p-4">
            <nav className="px-4 py- md:px-6 lg:px-8 flex align-items-center justify-content-between relative" style={{ minHeight: '84px' }}>
                <Logo />
                <StyleClass nodeRef={btnRef4} selector="@next" enterClassName="hidden" leaveToClassName="hidden" hideOnOutsideClick>
                    <a ref={btnRef4} className="p-ripple cursor-pointer block lg:hidden text-gray-400">
                        <i className="pi pi-bars text-4xl"></i>
                        <Ripple />
                    </a>
                </StyleClass>
                <div className="align-items-center p-4 lg:p-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full surface-overlay text-primary lg:surface-card left-0 top-100 z-1 shadow-4 lg:shadow-none">
                    <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row">
                        <li>
                            <Link
                                href="/items"
                                className="p-ripple p-button p-button-text font-bold flex px-0 lg:px-4 py-3 text-primary hover:text-blue-600 transition-colors transition-duration-150 no-underline">
                                <span>Who We Are</span>
                                <Ripple />
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/items"
                                className="p-ripple  p-button p-button-text font-bold flex px-0 lg:px-4 py-3 text-primary hover:text-blue-600 transition-colors transition-duration-150 no-underline">
                                <span>How It Works</span>
                                <Ripple />
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/items"
                                className="p-ripple  p-button p-button-text font-bold flex px-0 lg:px-4 py-3 text-primary hover:text-blue-600 transition-colors transition-duration-150 no-underline">
                                <span>Support</span>
                                <Ripple />
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/items"
                                className="p-ripple  p-button p-button-text font-bold flex px-0 lg:px-4 py-3 text-primary hover:text-blue-600 transition-colors transition-duration-150 no-underline">
                                <span>Browse</span>
                                <Ripple />
                            </Link>
                        </li>
                    </ul>
                    <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row">
                        <li className="flex-order-2 lg:flex-order-0">
                            <div className="p-inputgroup flex-1">
                                <InputText placeholder="Find your swap" variant="outlined" />
                                <Button icon="pi pi-search" className="p-button-primary" />
                            </div>
                        </li>
                        <li className="inline-flex relative">
                            <StyleClass nodeRef={btnRef1} selector="@next" enterClassName="hidden" enterActiveClassName="scalein" leaveToClassName="hidden" leaveActiveclassName="fadeout" hideOnOutsideClick>
                                <a ref={btnRef1} className="w-full p-button p-button-text no-underline p-ripple text-900 font-medium inline-flex align-items-center cursor-pointer px-1 lg:px-3 mb-4 lg:mb-0 mr-2 lg:ml-4 lg:mr-0 select-none">
                                    <span></span>
                                    <i className="pi pi-user text-xl"></i>
                                    <span className="hidden">My Account</span>
                                    <Ripple />
                                </a>
                            </StyleClass>

                            <div className="hidden border-round surface-overlay p-3 shadow-2 absolute right-0 top-100 z-1 w-15rem origin-top">
                                {loading ? (
                                    <div className="p-3 text-center text-gray-500">Loading...</div>
                                ) : user && user.username ? (
                                    <ul className="list-none p-0 m-0">
                                        {/* Authenticated menu */}
                                        <li>
                                            <Link href="/account/" className="p-ripple  p-button p-button-text font-bold flex px-0 lg:px-4 py-3 text-sm text-primary hover:text-blue-600 transition-colors transition-duration-150 no-underline">
                                                <span>Account</span>
                                                <Ripple />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/account/profile"
                                                className="p-ripple  p-button p-button-text font-bold flex px-0 lg:px-4 py-3 text-sm text-primary hover:text-blue-600 transition-colors transition-duration-150 no-underline">
                                                <span>Profile</span>
                                                <Ripple />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/account/swaps"
                                                className="p-ripple  p-button p-button-text font-bold flex px-0 lg:px-4 py-3 text-sm text-primary hover:text-blue-600 transition-colors transition-duration-150 no-underline">
                                                <span>Manage listings</span>
                                                <Ripple />
                                            </Link>
                                        </li>
                                        <a
                                            onClick={handleLogout}
                                            className="p-ripple p-button p-button-text font-bold flex px-0 lg:px-4 py-3 text-sm text-primary hover:text-blue-600 transition-colors transition-duration-150 no-underline"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <span>Logout</span>
                                            <Ripple />
                                        </a>
                                    </ul>
                                ) : (
                                    <ul className="list-none p-0 m-0">
                                        {/* Unauthenticated menu */}
                                        <li>
                                            <Link href="/login" className="p-ripple  p-button p-button-text font-bold flex px-0 lg:px-4 py-3 text-sm text-primary hover:text-blue-600 transition-colors transition-duration-150 no-underline">
                                                <span>Login</span>
                                                <Ripple />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/signup" className="p-ripple  p-button p-button-text font-bold flex px-0 lg:px-4 py-3 text-sm text-primary hover:text-blue-600 transition-colors transition-duration-150 no-underline">
                                                <span>Signup</span>
                                                <Ripple />
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}