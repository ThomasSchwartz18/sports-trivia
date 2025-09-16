const REVALIDATE_MAP: Record<string, number> = {
  '/api/home/live-scores': 90,
  '/api/home/otd': 21600
};

export async function getJSON<T>(path: string): Promise<T> {
  if (typeof window === 'undefined') {
    const revalidate = REVALIDATE_MAP[path] ?? 60;
    const res = await fetch(path, {
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
