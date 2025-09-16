import Header from '@/components/Header';
import LiveScoresTicker from '@/components/LiveScoresTicker';
import OnThisDay from '@/components/OnThisDay';
import PlayCta from '@/components/PlayCta';
import FeaturedCard from '@/components/FeaturedCard';
import Footer from '@/components/Footer';
import { formatET, nowInET } from '@/lib/time';
import Link from 'next/link';

export default function HomePage() {
  const today = formatET(nowInET(), {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <LiveScoresTicker />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="space-y-6 md:col-span-7">
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">{today}</p>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Daily sports trivia, live scores, and history that plays to win.
              </h1>
              <p className="max-w-2xl text-lg text-slate-600">
                Answer the public question every morning, then log in to unlock the member challenge, track your streak, and climb
                the Sportle leaderboard. Trivia. Cards. Prizes coming soon.
              </p>
              <PlayCta />
              <div className="flex items-center justify-center gap-3 text-sm text-slate-600 md:justify-start">
                <span className="font-medium">Want the merch?</span>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 font-semibold text-emerald-600 hover:text-emerald-700"
                  aria-label="Visit the Sportle Cards shop"
                >
                  Visit the shop
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-xl">
                <h2 className="text-lg font-semibold text-slate-900">Why play Sportle Cards?</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">
                      1
                    </span>
                    Fresh sports trivia daily at midnight Eastern.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">
                      2
                    </span>
                    Track your streaks with Supabase-authenticated profiles.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">
                      3
                    </span>
                    Shop limited-run cards celebrating iconic sports moments.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <OnThisDay />
        <FeaturedCard />
      </main>
      <Footer />
    </div>
  );
}
