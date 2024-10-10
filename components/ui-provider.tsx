import { ReactNode, useEffect } from 'react';
import { OverlayProvider } from 'react-aria';

import { AuthProvider } from '@components/auth-provider';
import NProgress from '@components/nprogress';
import ResizeHandler from '@components/resize-handler';

export interface UiProviderProps {
  children: ReactNode;
}

export default function UiProvider({ children }: UiProviderProps) {
  // remove loading effect once app has mounted for the first time
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);
  return (
    <OverlayProvider>
      <AuthProvider>{children}</AuthProvider>
      <ResizeHandler />
      <NProgress />
    </OverlayProvider>
  );
}
