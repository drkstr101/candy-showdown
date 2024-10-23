import { UserApi } from '@lib/api/user-api';
import { DEBUG } from '@lib/constants';
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
  participantsBySlug: Record<string, Participant>;
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
  const [status, setStatus] = useState<AsyncStatus>('loading');
  const participantsBySlug = useMemo(
    () =>
      participants.reduce((memo, p) => {
        memo[p.slug] = p;
        return memo;
      }, {} as Record<string, Participant>),
    [participants]
  );
  const [selectedItem, _setSelectedItem] = useState<Participant | null>(null);
  const { user: principal } = useAuth();

  async function setSelectedItem(item: Participant) {
    if (DEBUG) console.log(`Selected: ${item.slug}`);
    if (selectedItem?.slug !== item.slug) {
      _setSelectedItem(item);
      if (user) {
        setStatus('loading');
        user.selection = item.slug;
        const { error } = await userApi.updateSelection(user.id, item.slug);
        if (error) {
          console.error(error);
          setStatus('error');
        } else {
          setStatus('ready');
        }
      }
    }
  }

  useEffect(() => {
    if (principal) {
      userApi
        .fetchUserById(principal.id)
        .then((u) => {
          setUser(u);
          if (u && u.selection) {
            _setSelectedItem(participantsBySlug[u.selection]);
          }
          setStatus('ready');
        })
        .catch((err) => {
          console.error(err);
          setStatus('error');
        });
    } else {
      setStatus('ready');
    }
  }, [principal, userApi]);
  return (
    <AppContext.Provider
      value={{
        rounds,
        participantsBySlug,
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
