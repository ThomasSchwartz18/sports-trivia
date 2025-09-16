'use client';

import { useEffect, useState } from 'react';
import { getJSON } from '@/lib/fetcher';
import type { LiveScore } from '@/lib/mocks';

interface LiveScoresResponse {
  ok: boolean;
  data?: LiveScore[];
  error?: string;
}

export default function LiveScoresTicker() {
  const [scores, setScores] = useState<LiveScore[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    getJSON<LiveScoresResponse>('/api/home/live-scores')
      .then((response) => {
        if (!active) return;
        if (response.ok && response.data) {
          setScores(response.data);
        } else {
          setError(response.error ?? 'Unable to load live scores');
        }
      })
      .catch(() => {
        if (!active) return;
        setError('Unable to load live scores');
      });

    return () => {
      active = false;
    };
  }, []);

  const items = scores.length > 0 ? scores : [];
  const marqueeItems = items.length > 0 ? [...items, ...items] : [];

  return (
    <section className="bg-slate-900 text-white" aria-label="Live sports scores ticker">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-6">
        <span className="text-sm font-semibold uppercase tracking-widest text-slate-200">Live Scores</span>
        <div className="relative flex-1 overflow-hidden">
          {error ? (
            <p className="text-sm text-slate-200">{error}</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-slate-200">Updating scores…</p>
          ) : (
            <div className="flex min-w-full gap-8 whitespace-nowrap" aria-live="polite">
              <div className="flex min-w-max items-center gap-8 motion-safe:animate-marquee">
                {marqueeItems.map((score, index) => (
                  <div key={`${score.league}-${score.home}-${score.away}-${index}`} className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-slate-100">[{score.league}]</span>
                    <span className="text-slate-200">
                      {score.away}{' '}
                      <span className="font-semibold">{score.awayScore}</span>
                      {' – '}
                      {score.home}{' '}
                      <span className="font-semibold">{score.homeScore}</span>
                    </span>
                    <span className="text-xs text-slate-300">{score.status}</span>
                    {score.minuteOrInning ? (
                      <span className="text-xs text-slate-400">{score.minuteOrInning}</span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
