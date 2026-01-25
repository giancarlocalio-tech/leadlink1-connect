import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { PlumberProfile, InterventionType, AvailabilityType } from '@/lib/types';

export function usePlumberProfile() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<PlumberProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('plumber_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
      } else if (data) {
        setProfile({
          ...data,
          intervention_types: (data.intervention_types as InterventionType[]) || [],
          availability: (data.availability as AvailabilityType[]) || [],
          service_areas: (data.service_areas as string[]) || [],
        });
      } else {
        setProfile(null);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setProfile(null);
    }
    setLoading(false);
    setHasFetched(true);
  }, [user]);

  useEffect(() => {
    // Wait for auth to finish loading before fetching profile
    if (authLoading) {
      return;
    }
    
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
      setHasFetched(true);
    }
  }, [user, authLoading, fetchProfile]);

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

      // Send welcome email immediately after profile creation
      // Fire and forget - don't block the registration flow
      supabase.functions.invoke('send-welcome-email', {
        body: {
          email: profileData.email,
          full_name: profileData.full_name,
          business_name: profileData.business_name,
          phone: profileData.phone,
          plan_type: 'basic',
          app_origin: window.location.origin,
        },
      }).then(({ data: emailData, error: emailError }) => {
        if (emailError) {
          console.error('Error sending welcome email:', emailError);
        } else {
          console.log('Welcome email sent successfully:', emailData);
        }
      }).catch((err) => {
        console.error('Error sending welcome email:', err);
      });

      // Notify owner about new plumber registration
      supabase.functions.invoke('notify-owner-registration', {
        body: {
          plumber_name: profileData.full_name,
          plumber_email: profileData.email,
          plumber_phone: profileData.phone,
          business_name: profileData.business_name,
          main_city: profileData.main_city,
          service_areas: profileData.service_areas,
          intervention_types: profileData.intervention_types,
        },
      }).then(({ data: notifyData, error: notifyError }) => {
        if (notifyError) {
          console.error('Error notifying owner:', notifyError);
        } else {
          console.log('Owner notified successfully:', notifyData);
        }
      }).catch((err) => {
        console.error('Error notifying owner:', err);
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
