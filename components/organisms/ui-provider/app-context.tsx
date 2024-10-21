import type { AppUser, AsyncStatus, AuthUser, Participant, Round } from '@lib/types';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { AuthProvider } from '../auth-provider';

export interface AppContextType {
  principal: AuthUser | null;
  status: AsyncStatus;
  setStatus: Dispatch<SetStateAction<AsyncStatus>>;
  participants: Participant[];
  rounds: Round[];
  user: AppUser | null;
}

export const AppContext = createContext<AppContextType | null>(null);

type Props = {
  children: ReactNode;
  participants: Participant[];
  rounds: Round[];
  principal: AuthUser | null;
  user: AppUser | null;
};

export function AppContextProvider({
  children,
  participants = [],
  rounds = [],
  principal = null,
  user = null,
}: Props) {
  // console.log('Initializing application state', { principal, participants, rounds, user });
  const [status, setStatus] = useState<AsyncStatus>('loading');

  useEffect(() => {
    if (user) setStatus('ready');
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        rounds,
        participants,
        principal,
        status,
        setStatus,
        user,
      }}
    >
      <AuthProvider initialUser={principal}>{children}</AuthProvider>
    </AppContext.Provider>
  );
}
