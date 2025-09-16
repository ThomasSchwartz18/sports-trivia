import Link from 'next/link';
import AuthButtons from './AuthButtons';

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 md:px-6">
        <Link href="/" className="text-xl font-semibold tracking-tight text-slate-900">
          Sportle Cards
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="/" className="transition hover:text-slate-900">
            Home
          </Link>
          <Link href="/shop" className="transition hover:text-slate-900">
            Shop
          </Link>
        </nav>
        <div className="ml-auto">
          <AuthButtons />
        </div>
      </div>
    </header>
  );
}
