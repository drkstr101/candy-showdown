import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { AppProps } from 'next/app';

import UiProvider from '@components/organisms/ui-provider';

import { AppUser, AsyncStatus, Participant, Round } from '@lib/types';
import '@styles/chrome-bug.css';
import '@styles/global.css';
import '@styles/nprogress.css';
import { AuthUser } from '@supabase/supabase-js';

type Props = {
  principal: AuthUser | null;
  selectedItem: Participant | null;
  setSelectedItem: (selectedItem: Participant) => void;
  participants: Participant[];
  rounds: Round[];
  user: AppUser | null;
  status: AsyncStatus;
};

export default function App({ Component, pageProps }: AppProps<Props>) {
  // if (DEBUG) console.log('App(props)', pageProps);
  const { principal = null, participants = [], rounds = [], user = null } = pageProps;
  return (
    <UiProvider principal={principal} participants={participants} rounds={rounds} user={user}>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </UiProvider>
  );
}
