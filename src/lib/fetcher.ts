const REVALIDATE_MAP: Record<string, number> = {
  '/api/home/otd': 21600
};

const ABSOLUTE_URL_REGEX = /^https?:\/\//i;

function resolveUrl(path: string): string {
  if (ABSOLUTE_URL_REGEX.test(path)) {
    return path;
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
    'http://localhost:3000';

  return new URL(path, baseUrl).toString();
}

export async function getJSON<T>(path: string): Promise<T> {
  if (typeof window === 'undefined') {
    const revalidate = REVALIDATE_MAP[path] ?? 60;
    const url = resolveUrl(path);
    const res = await fetch(url, {
  '/api/home/live-scores': 90,
  '/api/home/otd': 21600
};

export async function getJSON<T>(path: string): Promise<T> {
  if (typeof window === 'undefined') {
    const revalidate = REVALIDATE_MAP[path] ?? 60;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
    const requestUrl = /^https?:\/\//i.test(path) ? path : new URL(path, baseUrl).toString();
    const res = await fetch(requestUrl, {
      next: {
        revalidate
      }
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}: ${res.status}`);
      throw new Error(`Failed to fetch ${path}: ${res.status}`);
    }
    return res.json() as Promise<T>;
  }

  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status}`);
  }
  return res.json() as Promise<T>;
}
