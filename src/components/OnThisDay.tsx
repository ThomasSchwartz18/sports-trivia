import { getJSON } from '@/lib/fetcher';
import type { OnThisDayItem } from '@/lib/mocks';
import { formatET, nowInET } from '@/lib/time';

interface OnThisDayResponse {
  ok: boolean;
  data?: OnThisDayItem[];
  error?: string;
}

export default async function OnThisDay() {
  let entries: OnThisDayItem[] = [];
  let error: string | null = null;

  try {
    const response = await getJSON<OnThisDayResponse>('/api/home/otd');
    if (response.ok && response.data) {
      entries = response.data;
    } else {
      error = response.error ?? 'Unable to load history';
    }
  } catch (err) {
    console.error(err);
    error = 'Unable to load history';
  }

  const todayLabel = formatET(nowInET(), {
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6" aria-labelledby="on-this-day">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 id="on-this-day" className="text-2xl font-semibold text-slate-900">
            On This Day in Sports
          </h2>
          <p className="text-sm text-slate-500">{todayLabel} in sports history</p>
        </div>
      </div>
      {error ? (
        <p className="mt-4 text-sm text-slate-500">{error}</p>
      ) : entries.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No historical moments available right now. Check back soon.</p>
      ) : (
        <ol className="mt-6 space-y-4" aria-live="polite">
          {entries.map((item) => (
            <li key={`${item.year}-${item.text}`} className="rounded-lg border border-slate-200 p-4 shadow-sm">
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-4">
                <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
                  {item.year}
                </span>
                <p className="text-slate-700">
                  {item.text}{' '}
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noreferrer" className="font-medium text-blue-600 underline">
                      Read more
                    </a>
                  ) : null}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
