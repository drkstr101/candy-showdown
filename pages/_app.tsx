import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { AppProps } from 'next/app';

import UiProvider from '@components/organisms/ui-provider';
import { AuthUser } from '@lib/types';

import '@styles/chrome-bug.css';
import '@styles/global.css';
import '@styles/nprogress.css';

type ServerProps = { principal: AuthUser | null };

// export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
//   const api = new UserApi(createClient(ctx));
//   const {
//     data: { user },
//     error,
//   } = await api.getPrincipal();
//   if (error) console.error(error);

//   return { props: { principal: user } };
// };

export default function App({ Component, pageProps }: AppProps<ServerProps>) {
  // if (DEBUG) console.log('App(props)', pageProps);
  const { principal } = pageProps;
  return (
    <UiProvider principal={principal} participants={[]} rounds={[]} user={null}>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </UiProvider>
  );
}
