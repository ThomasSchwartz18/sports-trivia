import { NextResponse } from 'next/server';
import { mockOtd } from '@/lib/mocks';

export const runtime = 'edge';
export const revalidate = 21600;

const CACHE_CONTROL = 's-maxage=21600, stale-while-revalidate=3600';

export async function GET() {
  try {
    // TODO: Replace mock with Wikimedia or cached source.
    const data = mockOtd;

    return NextResponse.json(
      { ok: true, data },
      {
        status: 200,
        headers: {
          'Cache-Control': CACHE_CONTROL
        }
      }
    );
  } catch (error) {
    console.error('otd error', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to load history' },
      {
        status: 500,
        headers: {
          'Cache-Control': CACHE_CONTROL
        }
      }
    );
  }
}
