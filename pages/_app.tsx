import { GetServerSideProps } from 'next';
import type { AppProps } from 'next/app';

import UiProvider from '@components/ui-provider';
import { adminUser } from '@lib/constants';
import { AppUser } from '@lib/hooks/use-app-data';

import '@styles/chrome-bug.css';
import '@styles/global.css';
import '@styles/nprogress.css';

export const getServerSideProps = (async (ctx) => {
  // mock current user by auto-logging admin user
  return { props: { user: adminUser } };
}) satisfies GetServerSideProps<{ user: AppUser | null }>;

export default function App({ Component, pageProps }: AppProps) {
  // console.log('App(props)', pageProps);
  return (
    <UiProvider>
      <Component {...pageProps} />
    </UiProvider>
  );
}
