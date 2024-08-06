'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// ユーザー情報の型定義
export interface UserInfo {
  id: string;
  email?: string;
  displayName: string;
  photoURL: string | null;
  userType: 'clinic' | 'staff';
}

export async function getUserInfo(): Promise<{ user: UserInfo | null; error: string | null }> {
  try {
    // Supabaseクライアントの初期化
    const supabase = createServerComponentClient({ cookies });

    // 現在の認証ユーザーを取得
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    // 認証エラーのハンドリング
    if (authError) {
      console.error('Error fetching auth user:', authError);
      return { user: null, error: 'Failed to authenticate user' };
    }

    // ユーザーが存在しない場合のハンドリング
    if (!user) {
      return { user: null, error: 'User not found' };
    }

    // ユーザータイプの取得（clinic または staff）
    const userType = user.user_metadata.user_type as 'clinic' | 'staff';

    let displayName = 'Unknown User';
    let photoURL: string | null = null;

    // ユーザータイプに応じたデータ取得
    if (userType === 'clinic') {
      // clinic用のデータ取得
      const [{ data: basicInfo }, { data: photos }] = await Promise.all([
        supabase.from('clinic_basic_info').select('clinic_name').eq('user_id', user.id).single(),
        supabase.from('clinic_photos').select('director_photo_url').eq('user_id', user.id).single(),
      ]);

      displayName = basicInfo?.clinic_name ?? 'Unknown Clinic';
      photoURL = photos?.director_photo_url ?? null;
    } else if (userType === 'staff') {
      // staff用のデータ取得
      const [{ data: staffInfo }, { data: photos }] = await Promise.all([
        supabase.from('dental_staff').select('nickname').eq('user_id', user.id).single(),
        supabase.from('staff_photos').select('profile_photo_url').eq('user_id', user.id).single(),
      ]);

      displayName = staffInfo?.nickname ?? 'Unknown Staff';
      photoURL = photos?.profile_photo_url ?? null;
    }

    // ユーザー情報を返す
    return {
      user: {
        id: user.id,
        email: user.email ?? undefined,
        displayName,
        photoURL,
        userType,
      },
      error: null,
    };
  } catch (error) {
    // 予期せぬエラーのハンドリング
    console.error('Unexpected error in getUserInfo:', error);
    return { user: null, error: 'An unexpected error occurred' };
  }
}