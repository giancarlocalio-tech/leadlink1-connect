import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let sessionRestored = false;

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;

        // On mobile the INITIAL_SESSION event can arrive before storage is fully
        // restored. Keep the app in auth-loading until getSession() resolves, so
        // protected pages don't query with auth.uid() still empty.
        if (event === 'INITIAL_SESSION' && !sessionRestored) {
          if (session) {
            setSession(session);
            setUser(session.user);
          }
          return;
        }

        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      sessionRestored = true;
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    // Try normal sign out first
    const { error } = await supabase.auth.signOut({ scope: 'global' });

    // Even if the API call fails, we want to ensure the user is logged out locally
    if (error) {
      console.error('[auth] signOut error:', error);
      toast.error('Logout non riuscito, riprova.');

      // Best-effort local cleanup
      try {
        for (const key of Object.keys(localStorage)) {
          if (key.includes('auth-token') || key.includes('code-verifier')) {
            localStorage.removeItem(key);
          }
        }
      } catch {
        // ignore
      }

      setSession(null);
      setUser(null);
      return { error };
    }

    setSession(null);
    setUser(null);
    return { error: null };
  };

  const resetPassword = async (email: string) => {
    const redirectUrl = `${window.location.origin}/login?mode=reset-password`;
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });
    return { error };
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { error };
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
  };
}
