import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase'; // 必要に応じてパスを調整してください

let supabase: ReturnType<typeof createClientComponentClient<Database>> | null = null;

export const getSupabase = () => {
  if (!supabase) {
    supabase = createClientComponentClient<Database>();
  }
  return supabase;
};