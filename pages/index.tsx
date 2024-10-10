import AppEntry from '@components/app-entry';
import { useAuth } from '@components/auth-provider';
import Layout from '@components/layout';
import Lobby from '@components/lobby';
import Page from '@components/page';

import { META_DESCRIPTION } from '@lib/constants';

export default function Index() {
  const meta = {
    title: 'Candy Showdown',
    description: META_DESCRIPTION,
  };

  const { loginStatus } = useAuth();
  return (
    <Page meta={meta} fullViewport>
      <Layout>{loginStatus === 'loggedIn' ? <Lobby /> : <AppEntry />}</Layout>
    </Page>
  );
}
