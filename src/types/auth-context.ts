import { User } from '@supabase/supabase-js';

// types.ts あるいは auth-context.ts 内で
export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  checkUserSession: () => Promise<void>;
  // その他の必要な認証関連の値やメソッド
}
