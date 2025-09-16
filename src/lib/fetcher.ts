const REVALIDATE_MAP: Record<string, number> = {
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
