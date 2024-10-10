import { jwtDecode } from 'jwt-decode';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { createClient } from '@lib/supabase/client';
import { Enums } from '@lib/supabase/database.types';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

export type LoginStatus = 'loading' | 'loggedOut' | 'loggedIn';

export type AuthUser = {
  id: string;
  email?: string;
  role: Enums<'app_role'> | null;
};

export type AuthContextType = {
  user: AuthUser | null;
  loginStatus: LoginStatus;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const result = useContext(AuthContext);
  if (!result) {
    throw new Error('AuthContext must be wrapped in a provider.');
  }
  return result;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loginStatus, setLoginStatus] = useState<LoginStatus>('loading');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    function saveSession(session: Session | null) {
      // console.log('Updating Supabase Session: ', session);
      setSession(session);
      if (session && session.user) {
        const { id, email } = session.user;
        const jwt = jwtDecode<{ user_role: string }>(session.access_token);
        const role = (jwt.user_role as Enums<'app_role'>) ?? null;
        const user = { id, email, role };

        console.log('User Logged In: ', user);
        setUser(user);
        setLoginStatus('loggedIn');
      } else {
        setUser(null);
        setLoginStatus('loggedOut');
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => saveSession(session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('onAuthStateChange(event, session)', event, session);
      saveSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase.auth]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginStatus,
        user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
