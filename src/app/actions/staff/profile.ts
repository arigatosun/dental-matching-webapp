'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// スタッフプロフィールデータの型定義
export interface StaffProfileData {
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
  nickname: string;
  phoneNumber: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  buildingName: string;
  nearestStation: string;
  maritalStatus: 'married' | 'single';
  spouseDependency: boolean;
  desiredWorkLocation: string;
  profilePhotoUrl: string;
  introduction?: string; 
}

// スタッフプロフィールを取得する関数
export async function getStaffProfile(userId: string): Promise<{ profile: StaffProfileData | null; error: string | null }> {
  try {
    const supabase = createServerComponentClient({ cookies });

    // dental_staff テーブルからデータを取得
    const { data: staffData, error: staffError } = await supabase
      .from('dental_staff')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (staffError) {
      console.error('Error fetching staff data:', staffError);
      return { profile: null, error: 'Failed to fetch staff information' };
    }

    // staff_preferences テーブルからデータを取得
    const { data: preferencesData, error: preferencesError } = await supabase
      .from('staff_preferences')
      .select('desired_work_location')
      .eq('user_id', userId)
      .single();

    if (preferencesError) {
      console.error('Error fetching preferences data:', preferencesError);
      return { profile: null, error: 'Failed to fetch staff preferences' };
    }

    // staff_photos テーブルからデータを取得
    const { data: photoData, error: photoError } = await supabase
      .from('staff_photos')
      .select('profile_photo_url')
      .eq('user_id', userId)
      .single();

    if (photoError) {
      console.error('Error fetching photo data:', photoError);
      return { profile: null, error: 'Failed to fetch staff photo' };
    }

    // 取得したデータをStaffProfileData型に整形
    const profile: StaffProfileData = {
      firstName: staffData.first_name || '',
      lastName: staffData.last_name || '',
      firstNameKana: staffData.first_name_kana || '',
      lastNameKana: staffData.last_name_kana || '',
      nickname: staffData.nickname || '',
      phoneNumber: staffData.phone_number || '',
      postalCode: staffData.postal_code || '',
      prefecture: staffData.prefecture || '',
      city: staffData.city || '',
      address: staffData.address || '',
      buildingName: staffData.building_name || '',
      nearestStation: staffData.nearest_station || '',
      maritalStatus: staffData.marital_status ? 'married' : 'single',
      spouseDependency: staffData.spouse_dependency || false,
      desiredWorkLocation: preferencesData?.desired_work_location || '',
      profilePhotoUrl: photoData?.profile_photo_url || '',
      introduction: staffData.introduction || '',
    };

    return { profile, error: null };
  } catch (error) {
    console.error('Unexpected error in getStaffProfile:', error);
    return { profile: null, error: 'An unexpected error occurred' };
  }
}

// スタッフプロフィールを更新する関数
export async function updateStaffProfile(userId: string, profileData: Partial<StaffProfileData>): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = createServerComponentClient({ cookies });

    // dental_staff テーブルの更新
    const { error: staffError } = await supabase
      .from('dental_staff')
      .update({
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        first_name_kana: profileData.firstNameKana,
        last_name_kana: profileData.lastNameKana,
        nickname: profileData.nickname,
        phone_number: profileData.phoneNumber,
        postal_code: profileData.postalCode,
        prefecture: profileData.prefecture,
        city: profileData.city,
        address: profileData.address,
        building_name: profileData.buildingName,
        nearest_station: profileData.nearestStation,
        marital_status: profileData.maritalStatus === 'married',
        spouse_dependency: profileData.spouseDependency,
        introduction: profileData.introduction,
      })
      .eq('user_id', userId);

    if (staffError) {
      console.error('Error updating staff data:', staffError);
      return { success: false, error: 'Failed to update staff information' };
    }

    // staff_preferences テーブルの更新
    if (profileData.desiredWorkLocation !== undefined) {
      const { error: preferencesError } = await supabase
        .from('staff_preferences')
        .update({ desired_work_location: profileData.desiredWorkLocation })
        .eq('user_id', userId);

      if (preferencesError) {
        console.error('Error updating preferences:', preferencesError);
        return { success: false, error: 'Failed to update staff preferences' };
      }
    }

    // staff_photos テーブルの更新（プロフィール写真が提供されている場合のみ）
    if (profileData.profilePhotoUrl) {
      const { error: photoError } = await supabase
        .from('staff_photos')
        .update({ profile_photo_url: profileData.profilePhotoUrl })
        .eq('user_id', userId);

      if (photoError) {
        console.error('Error updating photo:', photoError);
        return { success: false, error: 'Failed to update staff photo' };
      }
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Unexpected error in updateStaffProfile:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}