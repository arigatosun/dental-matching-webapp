'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSupabaseClient } from '@/utils/supabase';
import type { User, Session } from '@supabase/supabase-js';
import { AuthContext } from '../auth-context';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = useSupabaseClient();

  const checkUserSession = useCallback(async (): Promise<Session | null> => {
    try {
      setLoading(true);
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      setUser(session?.user ?? null);
      return session;
    } catch (error) {
      console.error('Error checking user session:', error);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    checkUserSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase, checkUserSession]);

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      checkUserSession,
      authenticated: !!user,
      unauthenticated: !user,
    }),
    [user, loading, checkUserSession]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
