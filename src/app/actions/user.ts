'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export interface UserInfo {
  id: string;
  email?: string;
  displayName: string;
  photoURL: string | null;
}

export async function getUserInfo(): Promise<{ user: UserInfo | null; error: string | null }> {
  try {
    const supabase = createServerComponentClient({ cookies });

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error('Error fetching auth user:', authError);
      return { user: null, error: 'Failed to authenticate user' };
    }

    if (!user) {
      return { user: null, error: 'User not found' };
    }

    // clinic_basic_info と clinic_photos から同時にデータを取得
    const [{ data: basicInfo, error: basicInfoError }, { data: photos, error: photosError }] =
      await Promise.all([
        supabase.from('clinic_basic_info').select('clinic_name').eq('user_id', user.id).single(),
        supabase.from('clinic_photos').select('director_photo_url').eq('user_id', user.id).single(),
      ]);

    if (basicInfoError) {
      console.error('Error fetching clinic basic info:', basicInfoError);
      return { user: null, error: 'Failed to fetch clinic basic information' };
    }

    if (photosError) {
      console.error('Error fetching clinic photos:', photosError);
      return { user: null, error: 'Failed to fetch clinic photos' };
    }

    console.log('photos', photos);

    return {
      user: {
        id: user.id,
        email: user.email ?? undefined,
        displayName: basicInfo?.clinic_name ?? 'Unknown Clinic',
        photoURL: photos?.director_photo_url ?? null,
      },
      error: null,
    };
  } catch (error) {
    console.error('Unexpected error in getUserInfo:', error);
    return { user: null, error: 'An unexpected error occurred' };
  }
}
