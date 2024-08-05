// app/actions/staff.ts
'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database, StaffInfo } from '@/types/supabase';

export async function getStaffList(professions?: string[], skills?: string[]): Promise<{ staffList: StaffInfo[] | null; error: string | null }> {
  try {
    const supabase = createServerComponentClient<Database>({ cookies });

    // Fetch dental_staff data
    const { data: staffData, error: staffError } = await supabase
      .from('dental_staff')
      .select('id, nickname, user_id');

    if (staffError) {
      console.error('Error fetching staff data:', staffError);
      return { staffList: null, error: 'Failed to fetch staff data' };
    }

    // Fetch staff_preferences data
    let preferencesQuery = supabase
      .from('staff_preferences')
      .select('user_id, desired_profession, desired_work_location, min_hourly_rate, max_hourly_rate');

    if (professions && professions.length > 0) {
      preferencesQuery = preferencesQuery.contains('desired_profession', professions);
    }

    const { data: preferencesData, error: preferencesError } = await preferencesQuery;

    if (preferencesError) {
      console.error('Error fetching preferences data:', preferencesError);
      return { staffList: null, error: 'Failed to fetch preferences data' };
    }

    // Fetch staff_skills and staff_auxiliary_skills data
    const { data: skillsData, error: skillsError } = await supabase
      .from('staff_skills')
      .select('user_id, experience_years, srp_light_moderate, srp_moderate_severe, maintenance_child_15min, maintenance_30min, maintenance_45min, maintenance_60min, scaling, pmtc, air_flow, probing_1_4_points, probing_6_points, whitening, tbi');

    if (skillsError) {
      console.error('Error fetching skills data:', skillsError);
      return { staffList: null, error: 'Failed to fetch skills data' };
    }

    const { data: auxSkillsData, error: auxSkillsError } = await supabase
      .from('staff_auxiliary_skills')
      .select('*');

    if (auxSkillsError) {
      console.error('Error fetching auxiliary skills data:', auxSkillsError);
      return { staffList: null, error: 'Failed to fetch auxiliary skills data' };
    }

    // Fetch staff_photos data
    const { data: photosData, error: photosError } = await supabase
      .from('staff_photos')
      .select('user_id, profile_photo_url');

    if (photosError) {
      console.error('Error fetching photos data:', photosError);
      return { staffList: null, error: 'Failed to fetch photos data' };
    }

    if (!staffData || staffData.length === 0) {
      console.log('No staff found');
      return { staffList: null, error: 'No staff found' };
    }

    // Combine the data
    const staffList: StaffInfo[] = staffData
    .filter(staff => preferencesData?.some(p => p.user_id === staff.user_id))
    .map((staff) => {
      const preferences = preferencesData?.find(p => p.user_id === staff.user_id);
      const skills = skillsData?.find(s => s.user_id === staff.user_id);
      const auxSkills = auxSkillsData?.find(s => s.user_id === staff.user_id);
      const photo = photosData?.find(p => p.user_id === staff.user_id);

      const allSkills = [
        ...(skills ? Object.entries(skills).filter(([key, value]) => value === true && key !== 'user_id' && key !== 'experience_years').map(([key]) => key) : []),
        ...(auxSkills ? Object.entries(auxSkills).filter(([key, value]) => value === true && key !== 'user_id').map(([key]) => key) : [])
      ];

      return {
        id: staff.id,
        nickname: staff.nickname || 'Anonymous',
        profession: preferences?.desired_profession || [],
        desired_work_location: preferences?.desired_work_location || '',
        experience_years: skills?.experience_years || '',
        min_hourly_rate: preferences?.min_hourly_rate || 0,
        max_hourly_rate: preferences?.max_hourly_rate || 0,
        profile_photo_url: photo?.profile_photo_url || '',
        skills: allSkills,
      };
    });

  // Filter by skills if provided
  const filteredStaffList = skills && skills.length > 0
    ? staffList.filter(staff => skills.every(skill => staff.skills.includes(skill)))
    : staffList;

  console.log('Processed staff list:', filteredStaffList);
  return { staffList: filteredStaffList, error: null };
} catch (error) {
  console.error('Unexpected error in getStaffList:', error);
  return { staffList: null, error: 'An unexpected error occurred' };
}
}