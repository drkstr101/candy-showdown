import { GetStaticProps } from 'next';

import Header from '@components/header';
import Layout from '@components/layout';
import Page from '@components/page';
import ParticipantsGrid from '@components/participants-grid';

import { getAllParticipants } from '@lib/cms-api';
import { META_DESCRIPTION } from '@lib/constants';
import { Participant } from '@lib/types';

type Props = {
  participants: Participant[];
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const participants = await getAllParticipants();

  return {
    props: {
      participants: participants || [],
    },
    revalidate: 60,
  };
};
