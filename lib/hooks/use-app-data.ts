import { createContext, useContext } from 'react';

export type PageState = 'registration' | 'lobby';

export type UserData = {
  id?: string;
  ticketNumber?: number;
  username?: string;
  name?: string;
};

type AppDataContextType = {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setPageState: React.Dispatch<React.SetStateAction<PageState>>;
};

export const AppDataContext = createContext<AppDataContextType | null>(null);

export default function useAppData() {
  const result = useContext(AppDataContext);
  if (!result) {
    throw new Error();
  }
  return result;
}
