import { NextResponse } from 'next/server';
import { mockScores } from '@/lib/mocks';

export const runtime = 'edge';
export const revalidate = 90;

const CACHE_CONTROL = 's-maxage=90, stale-while-revalidate=60';

export async function GET() {
  try {
    // TODO: Replace mock with real live score provider integration.
    const data = mockScores;

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
    console.error('live-scores error', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to load live scores' },
      {
        status: 500,
        headers: {
          'Cache-Control': CACHE_CONTROL
        }
      }
    );
  }
}
