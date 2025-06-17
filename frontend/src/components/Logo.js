import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <img src="/swopvend_logo.png" alt="SwopVend" height="56" className="mr-4" />
    </Link>
  );
}