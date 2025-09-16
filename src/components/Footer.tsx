import Link from 'next/link';

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/rules', label: 'Rules' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' }
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-sm text-slate-600 md:flex-row md:justify-between md:px-6">
        <p className="font-semibold text-slate-800">Sportle Cards</p>
        <nav className="flex flex-wrap justify-center gap-4" aria-label="Footer">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} Sportle Cards. All rights reserved.</p>
      </div>
    </footer>
  );
}
