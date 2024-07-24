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