import type { AppProps } from 'next/app';

import UiProvider from '@components/ui-provider';

import '@styles/chrome-bug.css';
import '@styles/global.css';
import '@styles/nprogress.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UiProvider>
      <Component {...pageProps} />
    </UiProvider>
  );
}
