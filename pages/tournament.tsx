import Layout from '@components/layout';
import TournamentView from '@components/views/tournament-view';
import Page from '@components/page';

import { META_DESCRIPTION } from '@lib/constants';

export default function Index() {
  const meta = {
    title: 'Candy Showdown',
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta} fullViewport>
      <Layout>
        <TournamentView />
      </Layout>
    </Page>
  );
}
