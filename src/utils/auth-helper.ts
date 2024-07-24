import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

export const getDevelopmentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    return user;
  }

  // 開発用のダミーユーザーを作成
  const { data, error } = await supabase.auth.signUp({
    email: 'dev@example.com',
    password: 'devpassword',
  });

  if (error) {
    console.error('Error creating dev user:', error);
    return null;
  }

  return data.user;
};