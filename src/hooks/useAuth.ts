import { useState, useEffect } from 'react';
import { authService, AuthUser } from '@/lib/auth';
import { Session } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(authService.getUser());
  const [session, setSession] = useState<Session | null>(authService.getSession());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((user, session) => {
      setUser(user);
      setSession(session);
      setLoading(false);
    });

    // Set initial loading to false after a brief moment if no auth state change occurs
    const timeout = setTimeout(() => setLoading(false), 1000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  return {
    user,
    session,
    loading,
    isAuthenticated: authService.isAuthenticated(),
    signUp: authService.signUp.bind(authService),
    signIn: authService.signIn.bind(authService),
    signInWithOAuth: authService.signInWithOAuth.bind(authService),
    signOut: authService.signOut.bind(authService),
    updateProfile: authService.updateProfile.bind(authService)
  };
}