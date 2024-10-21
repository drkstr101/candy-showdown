import { ReactNode, useEffect } from 'react';
import { OverlayProvider } from 'react-aria';

import NProgress from '@components/nprogress';
import ResizeHandler from '@components/resize-handler';
import { AppUser, AuthUser, Participant, Round } from '@lib/types';
import { AppContextProvider } from './app-context';

export interface UiProviderProps {
  children: ReactNode;
  principal: AuthUser | null;
  participants: Participant[];
  rounds: Round[];
  user: AppUser | null;
}

export default function UiProvider({ ...props }: UiProviderProps) {
  // remove loading effect once app has mounted for the first time
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);
  return (
    <OverlayProvider>
      <AppContextProvider {...props} />
      <ResizeHandler />
      <NProgress />
    </OverlayProvider>
  );
}
