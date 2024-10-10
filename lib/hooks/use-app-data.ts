import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export type PageState = 'registration' | 'lobby';

export type AppUser = {
  id: string;
  username: string;
  status: 'online' | 'offline';
};

export type AppDataContextType = {
  appUser: AppUser;
  setAppUser: Dispatch<SetStateAction<AppUser>>;
};

export const AppDataContext = createContext<AppDataContextType | null>(null);

export default function useAppData() {
  const result = useContext(AppDataContext);
  if (!result) {
    throw new Error();
  }
  return result;
}
