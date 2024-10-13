import { ReactNode, useEffect } from 'react';
import { OverlayProvider } from 'react-aria';

import { AuthProvider } from '@components/auth-provider';
import NProgress from '@components/nprogress';
import ResizeHandler from '@components/resize-handler';
import { AuthUser } from '@lib/types';

export interface UiProviderProps {
  children: ReactNode;
  initialUser?: AuthUser | null;
}

export default function UiProvider({ children, initialUser }: UiProviderProps) {
  // remove loading effect once app has mounted for the first time
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);
  return (
    <OverlayProvider>
      <AuthProvider initialUser={initialUser ?? null}>{children}</AuthProvider>
      <ResizeHandler />
      <NProgress />
    </OverlayProvider>
  );
}
