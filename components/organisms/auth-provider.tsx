import { Session } from '@supabase/supabase-js';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { createClient } from '@lib/supabase/client';
import { Enums } from '@lib/supabase/database.types';
import type { AuthUser } from '@lib/types';

export type LoginStatus = 'loading' | 'loggedOut' | 'loggedIn';

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

type Props = {
  children: ReactNode;
  initialUser: AuthUser | null;
};

export function AuthProvider({ children, initialUser }: Props) {
  const [loginStatus, setLoginStatus] = useState<LoginStatus>(
    initialUser ? 'loggedIn' : 'loading'
  );
  const [user, setUser] = useState<AuthUser | null>(initialUser);
  const setSession = useState<Session | null>(null)[1];
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    function saveSession(session: Session | null) {
      // console.log('Session Update:', session);
      setSession(session);
      if (session && session.user) {
        const { user, access_token } = session;
        const jwt = jwtDecode<{ user_role: Enums<'app_role'> }>(access_token);
        user.app_metadata['user_role'] = jwt.user_role ?? 'user';

        // console.log('Authenticated User: ', user);
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
      // console.log('onAuthStateChange(event, session)', event, session);
      saveSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setSession, supabase.auth]);

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
