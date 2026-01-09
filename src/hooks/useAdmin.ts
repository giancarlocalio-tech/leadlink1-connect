// @refresh reset
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export function useAdmin(user: User | null) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkedUserId, setCheckedUserId] = useState<string | null>(null);
  const [inFlight, setInFlight] = useState(false);

  // Key idea: when user changes, `checkedUserId !== user.id` becomes true immediately
  // (same render), so consumers won’t redirect based on stale isAdmin=false.
  const loading = !!user && (checkedUserId !== user.id || inFlight);

  const checkAdminStatus = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('id')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .limit(1);

    if (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    } else {
      setIsAdmin((data?.length ?? 0) > 0);
    }

    setCheckedUserId(userId);
    setInFlight(false);
  };

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      setCheckedUserId(null);
      setInFlight(false);
      return;
    }

    setInFlight(true);
    checkAdminStatus(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return {
    isAdmin,
    loading,
    refreshStatus: () => {
      if (!user) return;
      setInFlight(true);
      return checkAdminStatus(user.id);
    },
  };
}

