'use client';

import { useEffect, useMemo, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';

export default function AuthButtons() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth
      .getUser()
      .then(({ data }) => {
        if (mounted) {
          setUser(data.user ?? null);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Failed to get user', error);
        if (mounted) {
          setLoading(false);
        }
      });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogin = () => {
    console.info('TODO: open Supabase Auth login modal');
  };

  const handleRegister = () => {
    console.info('TODO: open Supabase Auth register modal');
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  if (loading) {
    return <div className="h-10 w-24 animate-pulse rounded-full bg-slate-200" aria-hidden />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleLogin}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleRegister}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Register
        </button>
      </div>
    );
  }

  const displayInitial =
    (user.user_metadata?.full_name as string | undefined)?.[0]?.toUpperCase() ||
    (user.email?.[0]?.toUpperCase() ?? 'U');

  return (
    <div className="flex items-center gap-3">
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white"
        aria-label={`Signed in as ${user.email ?? 'player'}`}
      >
        {displayInitial}
      </span>
      <button
        type="button"
        onClick={handleSignOut}
        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
      >
        Sign out
      </button>
    </div>
  );
}
