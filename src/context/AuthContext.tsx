import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserAuth } from '../types';

interface AuthContextType {
  user: UserAuth | null;
  loading: boolean;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signInWithEmail: (email: string, password: string) => Promise<{ error?: string }>;
  loginAsDemo: () => void;
  signOut: () => Promise<void>;
  isSupabaseLive: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: UserAuth = {
  id: 'usr-admin-demo',
  email: 'admin@autogo.com.br',
  name: 'Gestor AutoGO',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  role: 'admin'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAuth | null>(() => {
    try {
      const stored = localStorage.getItem('autogo_auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // Checa sessão atual do Supabase
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const authUser: UserAuth = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Usuário',
            avatar_url: session.user.user_metadata?.avatar_url,
            role: 'admin'
          };
          setUser(authUser);
          localStorage.setItem('autogo_auth_user', JSON.stringify(authUser));
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const authUser: UserAuth = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Usuário',
            avatar_url: session.user.user_metadata?.avatar_url,
            role: 'admin'
          };
          setUser(authUser);
          localStorage.setItem('autogo_auth_user', JSON.stringify(authUser));
        } else {
          // Se não houver sessão Supabase e não for demo local
          const stored = localStorage.getItem('autogo_auth_user');
          if (!stored || stored.includes('usr-admin-demo')) {
            // Mantém se for demo local
          } else {
            setUser(null);
            localStorage.removeItem('autogo_auth_user');
          }
        }
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = async (): Promise<{ error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/admin'
        }
      });
      if (error) return { error: error.message };
      return {};
    } else {
      // Simulação instantânea caso as chaves ainda não estejam no .env
      loginAsDemo();
      return {};
    }
  };

  const signInWithEmail = async (email: string, password: string): Promise<{ error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };
      if (data.user) {
        const authUser: UserAuth = {
          id: data.user.id,
          email: data.user.email || email,
          name: data.user.user_metadata?.full_name || email.split('@')[0],
          avatar_url: data.user.user_metadata?.avatar_url,
          role: 'admin'
        };
        setUser(authUser);
        localStorage.setItem('autogo_auth_user', JSON.stringify(authUser));
      }
      return {};
    } else {
      // Fallback local: aceita qualquer login ou cria demo
      const authUser: UserAuth = {
        id: `usr-${Date.now()}`,
        email,
        name: email.split('@')[0] || 'Gestor AutoGO',
        role: 'admin'
      };
      setUser(authUser);
      localStorage.setItem('autogo_auth_user', JSON.stringify(authUser));
      return {};
    }
  };

  const loginAsDemo = () => {
    setUser(DEMO_USER);
    localStorage.setItem('autogo_auth_user', JSON.stringify(DEMO_USER));
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('autogo_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        loginAsDemo,
        signOut,
        isSupabaseLive: isSupabaseConfigured
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de AuthProvider');
  }
  return context;
};
