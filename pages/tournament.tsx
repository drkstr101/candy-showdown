import Layout from '@components/layout';
import Page from '@components/page';
import TournamentView from '@components/views/tournament-view';

import { getAllRounds } from '@lib/api/content-api';
import { META_DESCRIPTION } from '@lib/constants';
import { Round } from '@lib/types';
import { GetStaticProps } from 'next';

type Props = {
  allRounds: Round[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allRounds = await getAllRounds();

  return {
    props: {
      allRounds: allRounds || [],
    },
    revalidate: 60,
  };
};

export default function Tournament({ allRounds }: Props) {
  const meta = {
    title: 'Candy Showdown',
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta} fullViewport>
      <Layout>
        <TournamentView rounds={allRounds} />
      </Layout>
    </Page>
  );
}
