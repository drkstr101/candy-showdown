import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { AppProps } from 'next/app';

import UiProvider from '@components/organisms/ui-provider';
import { Participant, Round } from '@lib/types';

import '@styles/chrome-bug.css';
import '@styles/global.css';
import '@styles/nprogress.css';

type Props = {
  // principal: AuthUser | null;
  // selectedItem: Participant | null;
  // setSelectedItem: (selectedItem: Participant) => void;
  participants: Participant[];
  rounds: Round[];
  // user: AppUser | null;
  // status: AsyncStatus;
};

export default function App({ Component, pageProps }: AppProps<Props>) {
  // if (DEBUG) console.log('App(props)', pageProps);
  const { participants = [], rounds = [] } = pageProps;
  return (
    <UiProvider participants={participants} rounds={rounds}>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </UiProvider>
  );
}
