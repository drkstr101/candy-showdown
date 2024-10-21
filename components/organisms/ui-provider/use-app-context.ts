import { useContext } from 'react';

import { AppContext, type AppContextType } from './app-context';

export default function useAppContext() {
  const result = useContext<AppContextType | null>(AppContext);
  if (!result) {
    throw new Error('Context must be wrapped in a provider.');
  }
  return result;
}
