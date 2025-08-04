import { Button } from 'primereact/button';
import Logo from './Logo';
import Link from 'next/link';

export default function FooterCTA() {
  return (
    <div
      id="footer-cta"
      className="p-4 md:py-8 md:px-6 lg:px-8 flex flex-column lg:flex-row align-items-center justify-content-between pb-6 bg-primary-reverse shadow-2"
      style={{ background: 'linear-gradient(90deg, #f0f4ff 0%, #e0e7ff 100%)' }}
    >
      <div className="flex flex-column align-items-center lg:align-items-start text-center lg:text-left">
        <Logo />
        <p className="text-700 line-height-3 text-xl mb-0 mt-5 font-semibold max-w-30rem">
          Sign up today to start swapping, save, and make mother nature happy by recycling.
        </p>
      </div>
      <Link href="/signup" passHref legacyBehavior>
        <Button
          label="Get Started"
          className="swop-button-primary px-5 py-3 text-lg font-bold shadow-3 mt-5 lg:mt-0"
       
        />
      </Link>
    </div>
  );
}