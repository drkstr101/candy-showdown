import { GetStaticProps } from 'next';

import Layout from '@components/layout';
import Header from '@components/molecules/header';
import Page from '@components/page';
import Schedule from '@components/views/schedule-view';

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

export default function SchedulePage({ rounds }: Props) {
  const meta = {
    title: 'Schedule - Candy Showdown',
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Schedule" description={meta.description} />
        <Schedule allRounds={rounds} />
      </Layout>
    </Page>
  );
}
