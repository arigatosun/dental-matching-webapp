import { User } from '@supabase/supabase-js';
import { getSupabase } from './supabase-client';

type UserType = 'clinic' | 'staff';

export const getDevelopmentUser = async (userType: UserType): Promise<User | null> => {
  const supabase = getSupabase();
  
  // 既存のユーザーを確認
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user && user.user_metadata && user.user_metadata.user_type === userType) {
    return user;
  }

  // 新しいユーザーを作成
  const email = userType === 'clinic' ? 'dev-clinic@example.com' : 'dev-staff@example.com';
  const password = 'devpassword';

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        user_type: userType
      }
    }
  });

  if (error) {
    console.error(`Error creating ${userType} user:`, error);
    return null;
  }

  // ユーザーメタデータを更新
  if (data.user) {
    const { error: updateError } = await supabase.auth.updateUser({
      data: { user_type: userType }
    });

    if (updateError) {
      console.error(`Error updating ${userType} user metadata:`, updateError);
    }
  }

  return data.user;
};