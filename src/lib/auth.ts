import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

export interface AuthUser extends User {
  profile?: {
    display_name: string;
    profession: string;
    avatar_url?: string;
  };
}

export class AuthService {
  private static instance: AuthService;
  private currentUser: AuthUser | null = null;
  private currentSession: Session | null = null;
  private listeners: Array<(user: AuthUser | null, session: Session | null) => void> = [];

  private constructor() {
    this.init();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private async init() {
    // Set up auth state listener first
    supabase.auth.onAuthStateChange(async (event, session) => {
      this.currentSession = session;
      
      if (session?.user) {
        // Fetch user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        this.currentUser = {
          ...session.user,
          profile: profile || undefined
        };
      } else {
        this.currentUser = null;
      }

      // Notify all listeners
      this.listeners.forEach(listener => {
        setTimeout(() => listener(this.currentUser, this.currentSession), 0);
      });
    });

    // Check for existing session
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      this.currentSession = session;
      
      if (session.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        this.currentUser = {
          ...session.user,
          profile: profile || undefined
        };
      }
    }
  }

  getUser(): AuthUser | null {
    return this.currentUser;
  }

  getSession(): Session | null {
    return this.currentSession;
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  onAuthStateChange(callback: (user: AuthUser | null, session: Session | null) => void) {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  async signUp(email: string, password: string, displayName?: string) {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: displayName || 'User'
        }
      }
    });

    return { data, error };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    return { data, error };
  }

  async signInWithOAuth(provider: 'google') {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl
      }
    });

    return { data, error };
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  }

  async updateProfile(updates: {
    display_name?: string;
    profession?: string;
    avatar_url?: string;
  }) {
    if (!this.currentUser) {
      throw new Error('No authenticated user');
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', this.currentUser.id)
      .select()
      .single();

    if (!error && data) {
      this.currentUser.profile = { ...this.currentUser.profile, ...data };
    }

    return { data, error };
  }
}

export const authService = AuthService.getInstance();