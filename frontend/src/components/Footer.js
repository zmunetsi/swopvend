import Link from 'next/link';
import { Button } from 'primereact/button';
import Logo from './Logo';

export default function Footer() {
  return (

    <div className="surface-section px-4 py-8 md:px-6 lg:px-8">
      <div className="flex align-items-start lg:align-items-center lg:justify-content-between pb-5 border-bottom-1 border-300 flex-column lg:flex-row">
        <div className="pr-0 lg:pr-8">
          <Logo />
          <p className="text-600 line-height-3 text-xl mb-0 mt-5">Sign up today to start swapping, save and make mother nature happy by recycling.</p>
        </div>
        <Button label="Get Started" className="mt-5 lg:mt-0 white-space-nowrap min-w-max" />
      </div>
      <div className="py-5 border-bottom-1 border-300">
        <div className="grid">
          <div className="col-6 sm:col-6 md:col-3">
            <span className="text-900 block font-bold line-height-3 mb-3">Company</span>
            <ul className="list-none p-0 m-0">
              <li className="mb-2">
                <Link
                  href="/about-us"
                  className="no-underline text-700 cursor-pointer line-height-3">Who we are</Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/how-it-works"
                  className="no-underline text-700 cursor-pointer line-height-3">How it works</Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/news"
                  className="no-underline text-700 cursor-pointer line-height-3">News</Link>
              </li>

            </ul>
          </div>
          <div className="col-6 sm:col-6 md:col-3">
            <span className="text-900 block font-bold line-height-3 mb-3">Account</span>
            <ul className="list-none p-0 m-0">
              <li className="mb-2">
                <Link
                  href="/account/profile"
                  className="no-underline text-700 cursor-pointer line-height-3">Profile</Link>
              </li>
               <li className="mb-2">
                <Link
                  href="/account/items/upload"
                  className="no-underline text-700 cursor-pointer line-height-3">Upload Item</Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/account/swaps"
                  className="no-underline text-700 cursor-pointer line-height-3">Manage Listings</Link>
              </li>
               <li className="mb-2">
                <Link
                  href="/account/settings"
                  className="no-underline text-700 cursor-pointer line-height-3">Settings</Link>
              </li>
               <li className="mb-2">
                <Link
                  href="/account/notifications"
                  className="no-underline text-700 cursor-pointer line-height-3">Notifications</Link>
              </li>
            </ul>
          </div>
          <div className="col-6 sm:col-6 md:col-3">
            <span className="text-900 block font-bold line-height-3 mb-3">Legal</span>
            <ul className="list-none p-0 m-0">
              <li className="mb-2">
                <Link
                  href="/terms-of-use"
                  className="no-underline text-700 cursor-pointer line-height-3">Terms of Use</Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/privacy-policy"
                  className="no-underline text-700 cursor-pointer line-height-3">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className="col-6 sm:col-6 md:col-3">
            <span className="text-900 block font-bold line-height-3 mb-3">Support</span>
            <ul className="list-none p-0 m-0">
              <li className="mb-2">
                <Link
                  href="/faq"
                  className="no-underline text-700 cursor-pointer line-height-3">FAQs</Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/contact-us"
                  className="no-underline text-700 cursor-pointer line-height-3">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-content-between align-items-center py-5">
        <span>&copy; 2025 SwopVend</span>
        <div className="flex align-items-center justify-content-between">
          <a
            href="https://facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="cursor-pointer text-500 md:ml-3 ml-2"
          >
            <i className="pi pi-facebook text-xl"></i>
          </a>
          <a
            href="https://twitter.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="cursor-pointer text-500 md:ml-3 ml-2"
          >
            <i className="pi pi-twitter text-xl"></i>
          </a>        
        </div>
      </div>
    </div>

  );
}