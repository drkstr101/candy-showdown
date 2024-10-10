import { useAuth } from '@components/auth-provider';
import Layout from '@components/layout';
import Page from '@components/page';
import Lobby from '@components/views/lobby-view';
import Registration from '@components/views/registration-view';

import { META_DESCRIPTION } from '@lib/constants';

export default function Index() {
  const meta = {
    title: 'Candy Showdown',
    description: META_DESCRIPTION,
  };

  const { loginStatus } = useAuth();
  return (
    <Page meta={meta} fullViewport>
      <Layout>{loginStatus === 'loggedIn' ? <Lobby /> : <Registration />}</Layout>
    </Page>
  );
}
