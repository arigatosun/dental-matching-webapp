'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// クリニックプロフィールデータの型定義
export interface ClinicProfileData {
  clinicName: string;
  directorName: string;
  phoneNumber: string;
  prefecture: string;
  city: string;
  address: string;
  nearestStation: string;
  walkingTimeFromStation: string;
  introduction: string;
  clinicUrl: string;
  photos: {
    director: string;
    exterior: string;
    reception: string;
    unit: string;
  };
}

// クリニックプロフィールを取得する関数
export async function getClinicProfile(userId: string): Promise<{ profile: ClinicProfileData | null; error: string | null }> {
  try {
    const supabase = createServerComponentClient({ cookies });

    // clinic_basic_info テーブルからデータを取得
    const { data: basicInfo, error: basicInfoError } = await supabase
      .from('clinic_basic_info')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (basicInfoError) {
      console.error('Error fetching basic info:', basicInfoError);
      return { profile: null, error: 'Failed to fetch clinic basic information' };
    }

    // clinic_photos テーブルからデータを取得
    const { data: photos, error: photosError } = await supabase
      .from('clinic_photos')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (photosError) {
      console.error('Error fetching photos:', photosError);
      return { profile: null, error: 'Failed to fetch clinic photos' };
    }

    // 取得したデータをClinicProfileData型に整形
    const profile: ClinicProfileData = {
      clinicName: basicInfo.clinic_name || '',
      directorName: `${basicInfo.director_last_name || ''} ${basicInfo.director_first_name || ''}`,
      phoneNumber: basicInfo.phone_number || '',
      prefecture: basicInfo.prefecture || '',
      city: basicInfo.city || '',
      address: basicInfo.address || '',
      nearestStation: basicInfo.nearest_station || '',
      walkingTimeFromStation: basicInfo.walking_time_from_station?.toString() || '',
      introduction: basicInfo.clinic_introduction || '',
      clinicUrl: basicInfo.website_url || '',
      photos: {
        director: photos?.director_photo_url || '',
        exterior: photos?.exterior_photo_url || '',
        reception: photos?.reception_photo_url || '',
        unit: photos?.unit_photo_url || '',
      },
    };

    return { profile, error: null };
  } catch (error) {
    console.error('Unexpected error in getClinicProfile:', error);
    return { profile: null, error: 'An unexpected error occurred' };
  }
}

// クリニックプロフィールを更新する関数
export async function updateClinicProfile(userId: string, profileData: Partial<ClinicProfileData>): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = createServerComponentClient({ cookies });

    // clinic_basic_info テーブルの更新
    const { error: basicInfoError } = await supabase
      .from('clinic_basic_info')
      .update({
        clinic_name: profileData.clinicName,
        director_last_name: profileData.directorName?.split(' ')[0] || '',
        director_first_name: profileData.directorName?.split(' ')[1] || '',
        phone_number: profileData.phoneNumber,
        prefecture: profileData.prefecture,
        city: profileData.city,
        address: profileData.address,
        nearest_station: profileData.nearestStation,
        walking_time_from_station: profileData.walkingTimeFromStation,
        clinic_introduction: profileData.introduction,
        website_url: profileData.clinicUrl,
      })
      .eq('user_id', userId);

    if (basicInfoError) {
      console.error('Error updating basic info:', basicInfoError);
      return { success: false, error: 'Failed to update clinic basic information' };
    }

    // clinic_photos テーブルの更新（写真が提供されている場合のみ）
    if (profileData.photos) {
      const { error: photosError } = await supabase
        .from('clinic_photos')
        .update({
          director_photo_url: profileData.photos.director,
          exterior_photo_url: profileData.photos.exterior,
          reception_photo_url: profileData.photos.reception,
          unit_photo_url: profileData.photos.unit,
        })
        .eq('user_id', userId);

      if (photosError) {
        console.error('Error updating photos:', photosError);
        return { success: false, error: 'Failed to update clinic photos' };
      }
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Unexpected error in updateClinicProfile:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}