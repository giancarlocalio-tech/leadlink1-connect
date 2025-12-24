import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { PlumberProfile, InterventionType, AvailabilityType } from '@/lib/types';

export function usePlumberProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<PlumberProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('plumber_profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
    } else if (data) {
      setProfile({
        ...data,
        intervention_types: (data.intervention_types as InterventionType[]) || [],
        availability: (data.availability as AvailabilityType[]) || [],
        service_areas: (data.service_areas as string[]) || [],
      });
    }
    setLoading(false);
  };

  const createProfile = async (profileData: Omit<PlumberProfile, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'email_verified' | 'photo_url' | 'rating' | 'review_count'>) => {
    if (!user) return { error: new Error('User not authenticated') };

    const { data, error } = await supabase
      .from('plumber_profiles')
      .insert({
        user_id: user.id,
        ...profileData,
      })
      .select()
      .single();

    if (error) {
      return { error, data: null };
    }

    if (data) {
      setProfile({
        ...data,
        intervention_types: (data.intervention_types as InterventionType[]) || [],
        availability: (data.availability as AvailabilityType[]) || [],
        service_areas: (data.service_areas as string[]) || [],
      });
    }
    return { error: null, data };
  };

  const updateProfile = async (profileData: Partial<PlumberProfile>) => {
    if (!user || !profile) return { error: new Error('Profile not found') };

    const { data, error } = await supabase
      .from('plumber_profiles')
      .update(profileData)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      return { error };
    }

    if (data) {
      setProfile({
        ...data,
        intervention_types: (data.intervention_types as InterventionType[]) || [],
        availability: (data.availability as AvailabilityType[]) || [],
        service_areas: (data.service_areas as string[]) || [],
      });
    }
    return { error: null };
  };

  return {
    profile,
    loading,
    createProfile,
    updateProfile,
    refreshProfile: fetchProfile,
  };
}
