'use client';

import { useEffect, useCallback, useMemo } from 'react';
import { useSetState } from '@/hooks/use-set-state';
import { AuthContext } from '../auth-context';
import { useSupabaseClient } from '@/utils/supabase';
import type { AuthState, AuthContextValue } from '../../types';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({
    user: null,
    loading: true,
  });
  const supabase = useSupabaseClient();

  const checkUserSession = useCallback(async (): Promise<Session | null> => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        if (session.expires_at && session.expires_at < Math.floor(Date.now() / 1000)) {
          // セッションが期限切れの場合、更新を試みる
          const { data: refreshedSession, error } = await supabase.auth.refreshSession();
          if (error) throw error;
          if (refreshedSession.session) {
            const {
              data: { user },
            } = await supabase.auth.getUser();
            setState({ user, loading: false });
            return refreshedSession.session;
          }
        } else {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          setState({ user, loading: false });
          return session;
        }
      }

      setState({ user: null, loading: false });
      return null;
    } catch (error) {
      console.error('Error checking or refreshing user session:', error);
      setState({ user: null, loading: false });
      return null;
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          setState({ user, loading: false });
        } else if (event === 'SIGNED_OUT') {
          setState({ user: null, loading: false });
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [checkUserSession, setState]);

  const status = state.loading ? 'loading' : state.user ? 'authenticated' : 'unauthenticated';

  const memoizedValue: AuthContextValue = useMemo(
    () => ({
      user: state.user,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
