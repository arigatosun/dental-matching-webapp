'use client';

import { useEffect, useCallback, useMemo } from 'react';
import { useSetState } from '@/hooks/use-set-state';
import { AuthContext } from '../auth-context';
import { supabase } from '@/utils/supabase';
import type { AuthState, AuthContextValue } from '../../types';
import { Session } from '@supabase/supabase-js';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(async (): Promise<Session | null> => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setState({ user, loading: false });
        return session;
      } else {
        setState({ user: null, loading: false });
        return null;
      }
    } catch (error) {
      console.error('Error checking user session:', error);
      setState({ user: null, loading: false });
      return null;
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

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