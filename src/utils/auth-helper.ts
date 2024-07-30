import { User, AuthResponse } from '@supabase/supabase-js';
import { getSupabase } from './supabase-client';

type UserType = 'clinic' | 'staff';

interface TestUserConfig {
  email: string;
  password: string;
  userType: UserType;
}

const DEFAULT_TEST_USERS: Record<UserType, TestUserConfig> = {
  clinic: {
    email: 'dev-clinic@example.com',
    password: 'devpassword',
    userType: 'clinic'
  },
  staff: {
    email: 'dev-staff@example.com',
    password: 'devpassword',
    userType: 'staff'
  }
};

export const getDevelopmentUser = async (userType: UserType, config?: Partial<TestUserConfig>): Promise<User | null> => {
  const supabase = getSupabase();
  
  const userConfig = {
    ...DEFAULT_TEST_USERS[userType],
    ...config
  };

  console.log(`Attempting to sign in/up user: ${userConfig.email}`);

  // まず、既存のユーザーでサインインを試みる
  let authResponse: AuthResponse = await supabase.auth.signInWithPassword({
    email: userConfig.email,
    password: userConfig.password
  });

  if (authResponse.error) {
    console.error('Sign in error:', authResponse.error);

    // サインインに失敗した場合（ユーザーが存在しない場合）、新規ユーザーを作成
    authResponse = await supabase.auth.signUp({
      email: userConfig.email,
      password: userConfig.password,
      options: {
        data: {
          user_type: userConfig.userType
        }
      }
    });

    if (authResponse.error) {
      console.error(`Error creating ${userConfig.userType} user:`, authResponse.error);
      return null;
    }
  }

  console.log('Authentication successful:', authResponse.data.user);

  // ユーザーメタデータを更新
  if (authResponse.data.user) {
    const { error: updateError } = await supabase.auth.updateUser({
      data: { user_type: userConfig.userType }
    });

    if (updateError) {
      console.error(`Error updating ${userConfig.userType} user metadata:`, updateError);
    }
  }

  return authResponse.data.user;
};