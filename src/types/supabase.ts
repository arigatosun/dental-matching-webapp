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