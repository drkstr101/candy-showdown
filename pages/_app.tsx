import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { AppProps } from 'next/app';

import UiProvider, { AppContextType } from '@components/organisms/ui-provider';

import { DEBUG } from '@lib/constants';
import '@styles/chrome-bug.css';
import '@styles/global.css';
import '@styles/nprogress.css';

// export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
//   const api = new UserApi(createClient(ctx));
//   const {
//     data: { user },
//     error,
//   } = await api.getPrincipal();
//   if (error) console.error(error);

//   return { props: { principal: user } };
// };

export default function App({ Component, pageProps }: AppProps<AppContextType>) {
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
