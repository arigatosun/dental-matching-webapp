'use client';
// src/providers/auth-provider.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabase';
import { AuthContext, AuthContextType } from '../auth-context';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(user);
      } catch (e) {
        console.error('Error loading user:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    loadUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(data.user);
      return true; // 成功した場合は true を返す
    } catch (e) {
      console.error('Error signing in:', e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred');
      return false; // エラーが発生した場合は false を返す
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (e) {
      console.error('Error signing out:', e);
      setError(e.message);
    }
  };

  const checkUserSession = async (): Promise<User | null> => {
    try {
      setLoading(true);
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;
      setUser(user);
      return user;
    } catch (e) {
      console.error('Error checking user session:', e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      error,
      signIn,
      signOut,
      checkUserSession,
    }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
