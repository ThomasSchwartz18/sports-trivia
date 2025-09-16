import Link from 'next/link';

export default function PlayCta() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Link
        href="/play"
        className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-10 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
      >
        Play Today&apos;s Question (Public)
      </Link>
      <p className="text-sm text-slate-600">Log in to play the member question &amp; track your streak.</p>
    </div>
  );
}
