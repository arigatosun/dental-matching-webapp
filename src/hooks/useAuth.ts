// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { getSupabase } from '@/utils/supabase-client';
import { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  userType: 'clinic' | 'staff';
}

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const supabase = getSupabase();

    async function fetchAndSetUser(user: User | null) {
      if (user && isMounted) {
        try {
          const profile = await fetchUserProfile(user);
          setUser(profile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUser(null);
        }
      } else if (isMounted) {
        setUser(null);
      }
      if (isMounted) setLoading(false);
    }

    async function initializeAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Initial user check:", user);
      if (isMounted) {
        await fetchAndSetUser(user);
      }

      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("Auth state changed:", event, session?.user);
        if (isMounted) {
          await fetchAndSetUser(session?.user || null);
        }
      });

      return () => {
        isMounted = false;
        authListener.subscription.unsubscribe();
      };
    }

    initializeAuth();
  }, []);

  async function fetchUserProfile(user: User): Promise<UserProfile> {
    console.log("Fetching profile for user ID:", user.id);
    const supabase = getSupabase();
    let photoURL = '';
    let displayName = '';
    let userType: 'clinic' | 'staff' = 'staff';

    userType = (user.user_metadata.user_type as 'clinic' | 'staff') || 'staff';
    console.log("User type from metadata:", userType);

    if (userType === 'clinic') {
      const { data: clinicData, error: clinicError } = await supabase
        .from('clinic_photos')
        .select('director_photo_url')
        .eq('user_id', user.id)
        .maybeSingle();

      if (clinicError) {
        console.error("Error fetching clinic photo:", clinicError);
      } else {
        photoURL = clinicData?.director_photo_url || '';
      }

      const { data: clinicInfo, error: infoError } = await supabase
        .from('clinic_basic_info')
        .select('clinic_name')
        .eq('user_id', user.id)
        .maybeSingle();

      if (infoError) {
        console.error("Error fetching clinic info:", infoError);
      } else {
        displayName = clinicInfo?.clinic_name || '';
      }
    } else {
      const { data: staffData, error: staffError } = await supabase
        .from('staff_photos')
        .select('profile_photo_url')
        .eq('user_id', user.id)
        .single();
      
      if (staffError) {
        console.error("Error fetching staff photo:", staffError);
      } else {
        photoURL = staffData?.profile_photo_url || '';
      }

      const { data: staffInfo, error: infoError } = await supabase
        .from('dental_staff')
        .select('last_name, first_name')
        .eq('user_id', user.id)
        .single();
      
      if (infoError) {
        console.error("Error fetching staff info:", infoError);
      } else {
        displayName = staffInfo ? `${staffInfo.last_name} ${staffInfo.first_name}` : '';
      }
    }

    console.log("Fetched user profile:", { id: user.id, email: user.email, displayName, photoURL, userType });
    return {
      id: user.id,
      email: user.email || '',
      displayName,
      photoURL,
      userType,
    };
  }

  return { user, loading };
}