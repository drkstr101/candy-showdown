import NProgress from '@components/nprogress';
import ResizeHandler from '@components/resize-handler';
import '@styles/chrome-bug.css';
import '@styles/global.css';
import '@styles/nprogress.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { OverlayProvider } from 'react-aria';

export default function App({ Component, pageProps }: AppProps) {
  // remove loading effect once app has mounted for the first time
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);
  return (
    <OverlayProvider>
      <Component {...pageProps} />
      <ResizeHandler />
      <NProgress />
    </OverlayProvider>
  );
}
