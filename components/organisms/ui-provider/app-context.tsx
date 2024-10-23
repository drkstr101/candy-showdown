import { UserApi } from '@lib/api/user-api';
import { createClient } from '@lib/supabase/client';
import type { AppUser, AsyncStatus, Participant, Round } from '@lib/types';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAuth } from '../auth-provider';

export interface AppContextType {
  selectedItem: Participant | null;
  setSelectedItem: (selectedItem: Participant) => void;
  participantsById: Record<string, Participant>;
  rounds: Round[];
  user: AppUser | null;
  setUser: Dispatch<SetStateAction<AppUser | null>>;
  status: AsyncStatus;
}

export const AppContext = createContext<AppContextType | null>(null);

type Props = {
  children: ReactNode;
  participants: Participant[];
  rounds: Round[];
};

export function AppContextProvider({ children, participants = [], rounds = [] }: Props) {
  // console.log('Initializing application state', { principal, participants, rounds, user });
  const userApi = useMemo(() => new UserApi(createClient()), []);
  const [user, setUser] = useState<AppUser | null>(null);
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
  const { user: principal } = useAuth();

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

  useEffect(() => {
    if (principal) {
      userApi.fetchUserById(principal.id).then(setUser).catch(console.error);
    }
  }, [principal, userApi]);
  return (
    <AppContext.Provider
      value={{
        rounds,
        participantsById,
        selectedItem,
        setSelectedItem,
        status,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
