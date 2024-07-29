import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clinic_certifications: {
        Row: {
          id: string
          user_id: string
          certification_url: string
          uploaded_at: string
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          certification_url: string
          uploaded_at?: string
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          certification_url?: string
          uploaded_at?: string
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      prior_consent_items: {
        Row: {
          id: string
          user_id: string
          consent_items: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          consent_items: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          consent_items?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      clinic_photos: {
        Row: {
          id: string
          user_id: string
          director_photo_url: string | null
          exterior_photo_url: string | null
          unit_photo_url: string | null
          reception_photo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          director_photo_url?: string | null
          exterior_photo_url?: string | null
          unit_photo_url?: string | null
          reception_photo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          director_photo_url?: string | null
          exterior_photo_url?: string | null
          unit_photo_url?: string | null
          reception_photo_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      matching_preferences: {
        Row: {
          id: string
          user_id: string
          desired_profession: string[]
          hourly_rate_min: number
          hourly_rate_max: number
          recruitment_start_date: string
          recruitment_end_date: string
          required_skills: string[]
          work_start_time: string
          work_end_time: string
          experience_years: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          desired_profession: string[]
          hourly_rate_min: number
          hourly_rate_max: number
          recruitment_start_date: string
          recruitment_end_date: string
          required_skills: string[]
          work_start_time: string
          work_end_time: string
          experience_years: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          desired_profession?: string[]
          hourly_rate_min?: number
          hourly_rate_max?: number
          recruitment_start_date?: string
          recruitment_end_date?: string
          required_skills?: string[]
          work_start_time?: string
          work_end_time?: string
          experience_years?: string
          created_at?: string
          updated_at?: string
        }
      }
      dental_staff: {
        Row: {
          id: string
          user_id: string
          last_name: string
          first_name: string
          last_name_kana: string
          first_name_kana: string
          nickname: string | null
          phone_number: string
          postal_code: string
          prefecture: string
          city: string
          address: string
          building_name: string | null
          nearest_station: string | null
          marital_status: boolean
          spouse_dependency: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          last_name: string
          first_name: string
          last_name_kana: string
          first_name_kana: string
          nickname?: string | null
          phone_number: string
          postal_code: string
          prefecture: string
          city: string
          address: string
          building_name?: string | null
          nearest_station?: string | null
          marital_status: boolean
          spouse_dependency?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          last_name?: string
          first_name?: string
          last_name_kana?: string
          first_name_kana?: string
          nickname?: string | null
          phone_number?: string
          postal_code?: string
          prefecture?: string
          city?: string
          address?: string
          building_name?: string | null
          nearest_station?: string | null
          marital_status?: boolean
          spouse_dependency?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      staff_preferences: {
        Row: {
          id: string
          user_id: string
          desired_profession: string[] // 変更: string から string[] へ
          min_hourly_rate: number
          max_hourly_rate: number
          desired_work_location: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          desired_profession: string[] // 変更: string から string[] へ
          min_hourly_rate: number
          max_hourly_rate: number
          desired_work_location: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          desired_profession?: string[] // 変更: string から string[] へ
          min_hourly_rate?: number
          max_hourly_rate?: number
          desired_work_location?: string
          created_at?: string
          updated_at?: string
        }
      }
      staff_skills: {
        Row: {
          id: string
          user_id: string
          srp_light_moderate: boolean
          srp_moderate_severe: boolean
          maintenance_child_15min: boolean
          maintenance_30min: boolean
          maintenance_45min: boolean
          maintenance_60min: boolean
          scaling: boolean
          pmtc: boolean
          air_flow: boolean
          probing_1_4_points: boolean
          probing_6_points: boolean
          whitening: boolean
          tbi: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          srp_light_moderate?: boolean
          srp_moderate_severe?: boolean
          maintenance_child_15min?: boolean
          maintenance_30min?: boolean
          maintenance_45min?: boolean
          maintenance_60min?: boolean
          scaling?: boolean
          pmtc?: boolean
          air_flow?: boolean
          probing_1_4_points?: boolean
          probing_6_points?: boolean
          whitening?: boolean
          tbi?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          srp_light_moderate?: boolean
          srp_moderate_severe?: boolean
          maintenance_child_15min?: boolean
          maintenance_30min?: boolean
          maintenance_45min?: boolean
          maintenance_60min?: boolean
          scaling?: boolean
          pmtc?: boolean
          air_flow?: boolean
          probing_1_4_points?: boolean
          probing_6_points?: boolean
          whitening?: boolean
          tbi?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      staff_auxiliary_skills: {
        Row: {
          id: string
          user_id: string
          impression_taking: boolean
          optical_impression: boolean
          alginate_stone_casting: boolean
          night_guard_creation: boolean
          vacuum_operation: boolean
          surgical_assist: boolean
          tek_creation: boolean
          mft_instruction: boolean
          attachment_placement: boolean
          intraoral_photography: boolean
          home_care_maintenance: boolean
          orthodontic_wire_removal: boolean
          general_treatment_assist: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          impression_taking?: boolean
          optical_impression?: boolean
          alginate_stone_casting?: boolean
          night_guard_creation?: boolean
          vacuum_operation?: boolean
          surgical_assist?: boolean
          tek_creation?: boolean
          mft_instruction?: boolean
          attachment_placement?: boolean
          intraoral_photography?: boolean
          home_care_maintenance?: boolean
          orthodontic_wire_removal?: boolean
          general_treatment_assist?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          impression_taking?: boolean
          optical_impression?: boolean
          alginate_stone_casting?: boolean
          night_guard_creation?: boolean
          vacuum_operation?: boolean
          surgical_assist?: boolean
          tek_creation?: boolean
          mft_instruction?: boolean
          attachment_placement?: boolean
          intraoral_photography?: boolean
          home_care_maintenance?: boolean
          orthodontic_wire_removal?: boolean
          general_treatment_assist?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      staff_desired_fields: {
        Row: {
          id: string
          user_id: string
          orthodontics: boolean
          home_care_dentistry: boolean
          pediatric_dentistry: boolean
          oral_surgery: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          orthodontics?: boolean
          home_care_dentistry?: boolean
          pediatric_dentistry?: boolean
          oral_surgery?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          orthodontics?: boolean
          home_care_dentistry?: boolean
          pediatric_dentistry?: boolean
          oral_surgery?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      staff_equipment: {
        Row: {
          id: string
          user_id: string
          scrub_white: boolean
          scrub_other: boolean
          pants_white: boolean
          pants_black: boolean
          shoes_white: boolean
          shoes_black: boolean
          goggles_white: boolean
          goggles_black: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          scrub_white?: boolean
          scrub_other?: boolean
          pants_white?: boolean
          pants_black?: boolean
          shoes_white?: boolean
          shoes_black?: boolean
          goggles_white?: boolean
          goggles_black?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          scrub_white?: boolean
          scrub_other?: boolean
          pants_white?: boolean
          pants_black?: boolean
          shoes_white?: boolean
          shoes_black?: boolean
          goggles_white?: boolean
          goggles_black?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      work_experiences: {
        Row: {
          id: string
          user_id: string
          hospital_name: string
          start_date: string
          end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          hospital_name: string
          start_date: string
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          hospital_name?: string
          start_date?: string
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      work_responsibilities: {
        Row: {
          id: string
          work_experience_id: string
          responsibility: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          work_experience_id: string
          responsibility: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          work_experience_id?: string
          responsibility?: string
          created_at?: string
          updated_at?: string
        }
      }
      education: {
        Row: {
          id: string
          user_id: string
          school_name: string
          graduation_year: number
          graduation_month: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          school_name: string
          graduation_year: number
          graduation_month: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          school_name?: string
          graduation_year?: number
          graduation_month?: number
          created_at?: string
          updated_at?: string
        }
      }
      staff_photos: {
        Row: {
          id: string
          user_id: string
          profile_photo_url: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          profile_photo_url: string
          is_public: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          profile_photo_url?: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      identification_documents: {
        Row: {
          id: string
          user_id: string
          document_type: 'drivers_license' | 'passport' | 'my_number_card' | 'residence_card'
          front_image_url: string
          back_image_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          document_type: 'drivers_license' | 'passport' | 'my_number_card' | 'residence_card'
          front_image_url: string
          back_image_url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          document_type?: 'drivers_license' | 'passport' | 'my_number_card' | 'residence_card'
          front_image_url?: string
          back_image_url?: string
          created_at?: string
          updated_at?: string
        }
      }

      professional_licenses: {
        Row: {
          id: string
          user_id: string
          license_type: 'dental_hygienist' | 'dental_student' | 'dental_assistant' | 'dental_technician'
          image_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          license_type: 'dental_hygienist' | 'dental_student' | 'dental_assistant' | 'dental_technician'
          image_url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          license_type?: 'dental_hygienist' | 'dental_student' | 'dental_assistant' | 'dental_technician'
          image_url?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)