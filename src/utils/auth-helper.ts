import { User, AuthResponse } from '@supabase/supabase-js';
import { getSupabase } from './supabase-client';

type UserType = 'clinic' | 'staff';

export const getDevelopmentUser = async (userType: UserType): Promise<User | null> => {
  const supabase = getSupabase();
  
  const email = userType === 'clinic' ? 'dev-clinic@example.com' : 'dev-staff@example.com';
  const password = 'devpassword';

  // まず、既存のユーザーでサインインを試みる
  let authResponse: AuthResponse = await supabase.auth.signInWithPassword({ email, password });

  if (authResponse.error) {
    // サインインに失敗した場合（ユーザーが存在しない場合）、新規ユーザーを作成
    authResponse = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_type: userType
        }
      }
    });

    if (authResponse.error) {
      console.error(`Error creating ${userType} user:`, authResponse.error);
      return null;
    }
  }

  // ユーザーメタデータを更新
  if (authResponse.data.user) {
    const { error: updateError } = await supabase.auth.updateUser({
      data: { user_type: userType }
    });

    if (updateError) {
      console.error(`Error updating ${userType} user metadata:`, updateError);
    }
  }

  return authResponse.data.user;
};