import { GetServerSideProps } from 'next';
import type { AppProps } from 'next/app';

import UiProvider from '@components/ui-provider';
import { UserApi } from '@lib/api/user-api';
import { DEBUG } from '@lib/constants';
import { createClient } from '@lib/supabase/server';
import { AuthUser } from '@lib/types';

import '@styles/chrome-bug.css';
import '@styles/global.css';
import '@styles/nprogress.css';

type Props = { principal: AuthUser | null };

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const api = new UserApi(createClient(ctx));
  const {
    data: { user },
    error,
  } = await api.getPrincipal();
  if (error) console.error(error);

  return { props: { principal: user } };
};

export default function App({ Component, pageProps }: AppProps) {
  if (DEBUG) console.log('App(props)', pageProps);
  const { principal } = pageProps;
  return (
    <UiProvider initialUser={principal}>
      <Component {...pageProps} />
    </UiProvider>
  );
}
