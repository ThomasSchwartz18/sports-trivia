const SITE_TZ = process.env.NEXT_PUBLIC_SITE_TZ ?? 'America/New_York';

export function nowInET(): Date {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: SITE_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'shortOffset'
  });

  const parts = formatter.formatToParts(now);
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const offsetRaw = lookup.timeZoneName ?? 'GMT-05:00';
  const offsetMatch = offsetRaw.match(/GMT([+-]\d{1,2})(?::?(\d{2}))?/i);
  const offsetHours = offsetMatch ? Number(offsetMatch[1]) : -5;
  const offsetMinutes = offsetMatch && offsetMatch[2] ? Number(offsetMatch[2]) : 0;
  const sign = offsetHours >= 0 ? '+' : '-';
  const paddedHours = String(Math.abs(offsetHours)).padStart(2, '0');
  const paddedMinutes = String(Math.abs(offsetMinutes)).padStart(2, '0');

  const isoString = `${lookup.year}-${lookup.month}-${lookup.day}T${lookup.hour}:${lookup.minute}:${lookup.second}${sign}${paddedHours}:${paddedMinutes}`;
  return new Date(isoString);
}

export function formatET(input: string | number | Date, options?: Intl.DateTimeFormatOptions): string {
  const date = typeof input === 'string' || typeof input === 'number' ? new Date(input) : input;
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: SITE_TZ,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  });
  return formatter.format(date);
}
