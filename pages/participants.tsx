import { GetStaticProps } from 'next';

import Layout from '@components/layout';
import Header from '@components/molecules/header';
import ParticipantsGrid from '@components/molecules/participants-grid';
import Page from '@components/page';

import { getAllParticipants, getAllRounds } from '@lib/api/content-api';
import { META_DESCRIPTION } from '@lib/constants';
import { Participant, Round } from '@lib/types';

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

export default function Participants({ participants }: Props) {
  const meta = {
    title: 'Participants - Candy Showdown',
    description: META_DESCRIPTION,
  };
  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Participants" description={meta.description} />
        <ParticipantsGrid participants={participants} />
      </Layout>
    </Page>
  );
}
