import { createClientComponentClient, createServerClient } from '@supabase/auth-helpers-nextjs';
import type { CookieOptions } from '@supabase/auth-helpers-nextjs';
import { cookies, type RequestCookies } from 'next/headers';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function assertEnv() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase environment variables are not set');
  }
}

export function createSupabaseBrowserClient() {
  assertEnv();
  return createClientComponentClient();
}

export function createSupabaseServerClient(cookieStore: RequestCookies = cookies()) {
  assertEnv();
  return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options?: CookieOptions) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options?: CookieOptions) {
        cookieStore.set({ name, value: '', maxAge: 0, ...options });
      }
    }
  });
}
