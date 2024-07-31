'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database, MatchedStaff } from '@/types/supabase'

export async function getInitialMatchingPreferences() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('matching_preferences')
    .select('desired_profession, recruitment_start_date, required_skills, experience_years')
    .eq('user_id', session.user.id)
    .single()

  if (error) {
    console.error('Error fetching matching preferences:', error)
    throw new Error('Failed to fetch matching preferences')
  }

  return data
}

export async function getMatchingStaff(profession: string, skills: string[], experience: string, date: string | null): Promise<MatchedStaff[]> {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase.rpc('match_staff', {
    p_profession: profession,
    p_skills: skills,
    p_experience: experience,
    p_date: date ? new Date(date).toISOString() : null
  })

  if (error) {
    console.error('Error matching staff:', error)
    throw new Error('Failed to match staff')
  }

  return data
}