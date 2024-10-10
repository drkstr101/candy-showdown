import AppEntry from '@components/app-entry';
import Layout from '@components/layout';
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
        <AppEntry />
      </Layout>
    </Page>
  );
}
