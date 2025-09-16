import { NextResponse } from 'next/server';
import { mockOtd, type OnThisDayItem } from '@/lib/mocks';
import { nowInET } from '@/lib/time';

export const runtime = 'edge';
export const revalidate = 21600;

const CACHE_CONTROL = 's-maxage=21600, stale-while-revalidate=3600';
const WIKIPEDIA_ENDPOINT = 'https://en.wikipedia.org/api/rest_v1/feed/onthisday/events';
const MIN_ITEMS = 3;
const MAX_ITEMS = 8;

type WikipediaPage = {
  title?: string;
  extract?: string;
  description?: string;
  titles?: {
    normalized?: string;
    display?: string;
  };
  content_urls?: {
    desktop?: { page?: string };
    mobile?: { page?: string };
  };
};

type WikipediaEvent = {
  year: number;
  text: string;
  pages?: WikipediaPage[];
};

type WikipediaResponse = {
  events?: WikipediaEvent[];
};

const SPORTS_KEYWORDS = [
  'wins',
  'win',
  'defeats',
  'defeat',
  'beats',
  'beat',
  'championship',
  'cup',
  'world cup',
  'olympic',
  'olympics',
  'gold medal',
  'silver medal',
  'bronze medal',
  'medal',
  'title',
  'final',
  'finals',
  'playoff',
  'tournament',
  'league',
  'season',
  'nba',
  'wnba',
  'nfl',
  'mlb',
  'nhl',
  'mls',
  'soccer',
  'football',
  'basketball',
  'baseball',
  'hockey',
  'golf',
  'tennis',
  'cricket',
  'rugby',
  'boxing',
  'mma',
  'ufc',
  'fifa',
  'uefa',
  'formula one',
  'f1',
  'nascar',
  'indy',
  'marathon',
  'grand slam',
  'wimbledon',
  'masters',
  'world series',
  'stanley cup',
  'super bowl',
  'cup final',
  'world title'
];

function collectText(event: WikipediaEvent): string {
  const parts: string[] = [event.text ?? ''];
  for (const page of event.pages ?? []) {
    if (page.title) parts.push(page.title);
    if (page.extract) parts.push(page.extract);
    if (page.description) parts.push(page.description);
    if (page.titles?.normalized) parts.push(page.titles.normalized);
    if (page.titles?.display) parts.push(page.titles.display);
  }
  return parts.join(' ').toLowerCase();
}

function isSportsEvent(event: WikipediaEvent): boolean {
  const haystack = collectText(event);
  return SPORTS_KEYWORDS.some((keyword) => haystack.includes(keyword));
}

function findPageUrl(pages: WikipediaPage[] | undefined): string | undefined {
  if (!pages) return undefined;
  for (const page of pages) {
    const desktop = page.content_urls?.desktop?.page;
    if (desktop) {
      return desktop;
    }
  }
  for (const page of pages) {
    const mobile = page.content_urls?.mobile?.page;
    if (mobile) {
      return mobile;
    }
  }
  return undefined;
}

function mapEvent(event: WikipediaEvent): OnThisDayItem | null {
  if (!event.text || typeof event.year !== 'number') {
    return null;
  }
  const text = event.text.replace(/\s+/g, ' ').trim();
  if (!text) {
    return null;
  }
  const item: OnThisDayItem = {
    year: event.year,
    text
  };
  const url = findPageUrl(event.pages);
  if (url) {
    item.url = url;
  }
  return item;
}

function dedupe(items: OnThisDayItem[]): OnThisDayItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.year}-${item.text}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function mergeWithFallback(items: OnThisDayItem[]): OnThisDayItem[] {
  const baseItems = dedupe(items);
  const working = [...baseItems];

  if (working.length < MIN_ITEMS) {
    for (const fallback of mockOtd) {
      const exists = working.some((item) => item.year === fallback.year && item.text === fallback.text);
      if (!exists) {
        working.push(fallback);
      }
      if (working.length >= MIN_ITEMS) {
        break;
      }
    }
  }

  if (working.length < MIN_ITEMS) {
    return [...mockOtd].slice(0, Math.min(MAX_ITEMS, mockOtd.length));
  }

  return dedupe(working)
    .sort((a, b) => b.year - a.year)
    .slice(0, Math.min(MAX_ITEMS, working.length));
}

async function fetchWikipediaEvents(): Promise<OnThisDayItem[]> {
  const today = nowInET();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const url = `${WIKIPEDIA_ENDPOINT}/${month}/${day}`;

  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
      'accept-language': 'en'
    },
    next: {
      revalidate
    }
  });

  if (!response.ok) {
    throw new Error(`Wikipedia responded with ${response.status}`);
  }

  const data = (await response.json()) as WikipediaResponse;
  const events = Array.isArray(data?.events) ? data.events : [];
  const sportsItems = events.filter(isSportsEvent).map(mapEvent).filter((item): item is OnThisDayItem => item !== null);
  return sportsItems;
}

export async function GET() {
  let items: OnThisDayItem[] = [];

  try {
    const sportsEvents = await fetchWikipediaEvents();
    items = mergeWithFallback(sportsEvents);
  } catch (error) {
    console.error('otd error', error);
    items = mergeWithFallback([]);
  }

  return NextResponse.json(
    { ok: true, data: items },
    {
      status: 200,
      headers: {
        'Cache-Control': CACHE_CONTROL
      }
    }
  );
}
