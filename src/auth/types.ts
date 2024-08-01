import { Session, User } from '@supabase/supabase-js';

type AdditionalInfo = {
  [key: string]: any;
  work_responsibilities?: any[];
};

export type ExtendedUser = User & { additionalInfo?: AdditionalInfo };

export type AuthState = {
  user: ExtendedUser | null;
  loading: boolean;
  error: string | null;
};

export type AuthContextValue = {
  user: ExtendedUser | null;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  error: string | null;
  checkUserSession: () => Promise<Session | null>;
};