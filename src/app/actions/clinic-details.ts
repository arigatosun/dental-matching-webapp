'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export interface ClinicDetailsData {
  staff_count: string;
  unit_count: string;
  average_patients_per_day: string;
  has_intercom: string;
  business_hours_start: string;
  business_hours_end: string;
  recall_time_slot: string;
  clinic_equipment: string[];
  staff_brings: string[];
  appearance: string[];
  job_details: string[];
}

export async function getClinicDetails(userId: string): Promise<{ details: ClinicDetailsData | null; error: string | null }> {
  try {
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase
      .from('clinic_basic_info')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching clinic details:', error);
      return { details: null, error: `Failed to fetch clinic details: ${error.message}` };
    }

    const details: ClinicDetailsData = {
      staff_count: data.staff_count || '',
      unit_count: data.unit_count || '',
      average_patients_per_day: data.average_patients_per_day || '',
      has_intercom: data.has_intercom || '',
      business_hours_start: data.business_hours_start 
        ? new Date(data.business_hours_start).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Tokyo' }) 
        : '',
      business_hours_end: data.business_hours_end 
        ? new Date(data.business_hours_end).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Tokyo' }) 
        : '',
      recall_time_slot: data.recall_time_slot || '',
      clinic_equipment: data.clinic_equipment || [],
      staff_brings: data.staff_brings || [],
      appearance: data.appearance || [],
      job_details: data.job_details || [],
    };

    return { details, error: null };
  } catch (error) {
    console.error('Unexpected error in getClinicDetails:', error);
    return { details: null, error: `An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}` };
  }
}

export async function updateClinicDetails(userId: string, details: Partial<ClinicDetailsData>): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = createServerComponentClient({ cookies });

    const updateData = {
      staff_count: details.staff_count,
      unit_count: details.unit_count,
      average_patients_per_day: details.average_patients_per_day,
      has_intercom: details.has_intercom,
      business_hours_start: details.business_hours_start 
        ? new Date(`2000-01-01T${details.business_hours_start}:00+09:00`).toISOString() 
        : null,
      business_hours_end: details.business_hours_end 
        ? new Date(`2000-01-01T${details.business_hours_end}:00+09:00`).toISOString() 
        : null,
      recall_time_slot: details.recall_time_slot,
      clinic_equipment: details.clinic_equipment,
      staff_brings: details.staff_brings,
      appearance: details.appearance,
      job_details: details.job_details,
    };

    const { error } = await supabase
      .from('clinic_basic_info')
      .update(updateData)
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating clinic details:', error);
      return { success: false, error: `Failed to update clinic details: ${error.message}` };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Unexpected error in updateClinicDetails:', error);
    return { success: false, error: `An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}` };
  }
}