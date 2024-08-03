'use client';

import axios, { endpoints } from '@/utils/axios';
import { useSupabaseClient } from '@/utils/supabase';

import { setSession } from './utils';
import { STORAGE_KEY } from './constant';
import { useRouter } from 'next/navigation';
import { SupabaseClient } from '@supabase/supabase-js';

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
};

export type SignUpParams = {
  email: string;
  password: string;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }: SignInParams): Promise<void> => {
  try {
    const params = { email, password };

    const res = await axios.post(endpoints.auth.signIn, params);

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    setSession(accessToken);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({ email, password }: SignUpParams): Promise<void> => {
  const params = {
    email,
    password,
  };

  try {
    const res = await axios.post(endpoints.auth.signUp, params);

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    sessionStorage.setItem(STORAGE_KEY, accessToken);
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (supabase: SupabaseClient): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    // 他の必要なクリーンアップ処理があればここに追加
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
