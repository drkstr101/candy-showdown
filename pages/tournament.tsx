import Layout from '@components/layout';
import Page from '@components/page';
import TournamentView from '@components/views/tournament-view';

import { getAllParticipants, getAllRounds } from '@lib/api/content-api';
import { META_DESCRIPTION } from '@lib/constants';
import { Participant, Round } from '@lib/types';
import { GetStaticProps } from 'next';

type Props = {
  rounds: Round[];
  participants: Participant[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const rounds = (await getAllRounds()) ?? [];
  const participants = (await getAllParticipants()) ?? [];

  return {
    props: {
      rounds,
      participants,
    },
    revalidate: 60,
  };
};

export default function Tournament({ rounds }: Props) {
  const meta = {
    title: 'Candy Showdown',
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta} fullViewport>
      <Layout>
        <TournamentView rounds={rounds} />
      </Layout>
    </Page>
  );
}
