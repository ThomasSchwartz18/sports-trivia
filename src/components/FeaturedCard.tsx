import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedCard() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg md:grid-cols-[2fr,3fr] md:p-10">
        <div className="relative h-48 overflow-hidden rounded-2xl bg-slate-100 md:h-full">
          <Image
            src="https://placehold.co/600x400?text=Sportle+Card"
            alt="Featured card placeholder"
            fill
            className="object-cover"
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
        <div className="flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Featured Card of the Day</h3>
            <p className="mt-2 text-sm text-slate-600">
              Collect the limited-run Sportle card that celebrates today&apos;s sports history. New drops every day.
            </p>
          </div>
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View in Shop
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
