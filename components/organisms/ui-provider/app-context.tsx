import { UserApi } from '@lib/api/user-api';
import { createClient } from '@lib/supabase/client';
import type { AppUser, AsyncStatus, AuthUser, Participant, Round } from '@lib/types';
import { createContext, ReactNode, useMemo, useState } from 'react';
import { AuthProvider } from '../auth-provider';

export interface AppContextType {
  principal: AuthUser | null;
  selectedItem: Participant | null;
  setSelectedItem: (selectedItem: Participant) => void;
  participantsById: Record<string, Participant>;
  rounds: Round[];
  user: AppUser | null;
  status: AsyncStatus;
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
  const [status, setStatus] = useState<AsyncStatus>('ready');
  const [selectedItem, _setSelectedItem] = useState<Participant | null>(
    participants.find((p) => p.id === user?.selection) ?? null
  );
  const participantsById = useMemo(
    () =>
      participants.reduce((memo, p) => {
        memo[p.id] = p;
        return memo;
      }, {} as Record<string, Participant>),
    [participants]
  );
  const userApi = useMemo(() => new UserApi(createClient()), []);

  async function setSelectedItem(item: Participant) {
    if (selectedItem?.id !== item.id) {
      _setSelectedItem(item);
      setStatus('loading');
      if (user) {
        user.selection = item.id;
        const { error, statusText } = await userApi.updateSelection(user.id, item.id);
        if (error) {
          console.error(error);
          setStatus('error');
        } else {
          console.info('Update Response:', statusText);
          setStatus('ready');
        }
      }
    }
  }

  return (
    <AppContext.Provider
      value={{
        rounds,
        participantsById,
        principal,
        selectedItem,
        setSelectedItem,
        status,
        user,
      }}
    >
      <AuthProvider initialUser={principal}>{children}</AuthProvider>
    </AppContext.Provider>
  );
}
