'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import { useState } from 'react';

export const createSupabaseClient = () => createClientComponentClient<Database>();

// クライアントコンポーネントでの使用
export const useSupabaseClient = () => {
  const [supabase] = useState(() => createSupabaseClient());
  return supabase;
};
