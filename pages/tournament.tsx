import Header from '@components/header';
import Layout from '@components/layout';
import LoadingDots from '@components/loading-dots';
import Page from '@components/page';
import { META_DESCRIPTION } from '@lib/constants';

export default function Tournament() {
  const meta = {
    title: 'Candy Showdown',
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta} fullViewport>
      <Layout>
        <Header hero="Tournament" description={meta.description} />
      </Layout>
    </Page>
  );
}
