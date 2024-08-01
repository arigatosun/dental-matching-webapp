'use client';

// auth-provider.tsx

import { useEffect, useCallback, useMemo } from 'react';
import { useSetState } from '@/hooks/use-set-state';
import { AuthContext } from '../auth-context';
import { supabase } from '@/utils/supabase';
import type { AuthContextValue } from '../../types';
import { Session, User } from '@supabase/supabase-js';

type AdditionalInfo = {
  [key: string]: any;
  work_responsibilities?: any[];
};

type ExtendedAuthState = {
  user: (User & { additionalInfo?: AdditionalInfo }) | null;
  loading: boolean;
  error: string | null;
};

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<ExtendedAuthState>({
    user: null,
    loading: true,
    error: null,
  });

  const checkUserSession = useCallback(async (): Promise<Session | null> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: { user } } = await supabase.auth.getUser();
        
        const userType = user?.user_metadata?.user_type;
        const userId = user?.id;

        if (!userId) throw new Error('User ID not found');

        let additionalInfo: AdditionalInfo = {};

        const tables = userType === 'clinic' 
          ? ['clinic_basic_info', 'clinic_certifications', 'clinic_photos', 'matching_preferences', 'prior_consent_items']
          : ['dental_staff', 'education', 'identification_documents', 'professional_licenses', 'staff_auxiliary_skills', 'staff_desired_fields', 'staff_equipment', 'staff_photos', 'staff_preferences', 'staff_skills', 'work_experiences'];

        for (const table of tables) {
          try {
            const { data, error } = await supabase
              .from(table)
              .select('id, user_id')
              .eq('user_id', userId)
              .limit(1);
            if (error) throw error;
            additionalInfo[table] = data;
          } catch (error) {
            console.error(`Error fetching data from ${table}:`, error);
          }
        }

        if (userType === 'staff') {
          try {
            const { data: workResponsibilities, error: workRespError } = await supabase
              .from('work_responsibilities')
              .select('id, work_experience_id, responsibility')
              .eq('user_id', userId);
            
            if (workRespError) throw workRespError;
            
            additionalInfo['work_responsibilities'] = workResponsibilities;
          } catch (error) {
            console.error('Error fetching work responsibilities:', error);
          }
        }

        console.log(`${userType.charAt(0).toUpperCase() + userType.slice(1)} User Data:`, additionalInfo);

        setState({ user: { ...user, additionalInfo }, loading: false, error: null });
        return session;
      } else {
        setState({ user: null, loading: false, error: null });
        return null;
      }
    } catch (error) {
      console.error('Error checking user session:', error);
      setState({ 
        user: null, 
        loading: false, 
        error: 'ユーザーセッションの確認中にエラーが発生しました。再度ログインしてください。'
      });
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
      error: state.error,
    }),
    [checkUserSession, state.user, status, state.error]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

///認証状態を管理し、AuthContextに渡しているファイル