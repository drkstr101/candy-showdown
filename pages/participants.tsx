import { GetStaticProps } from 'next';

import Layout from '@components/layout';
import Header from '@components/molecules/header';
import Page from '@components/page';
import ParticipantsGrid from '@components/molecules/participants-grid';

import { getAllParticipants } from '@lib/api/content-api';
import { META_DESCRIPTION } from '@lib/constants';
import { Participant } from '@lib/types';
import shuffle from 'lodash/shuffle';

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
  const participants = shuffle(await getAllParticipants());

  return {
    props: {
      participants: participants || [],
    },
    revalidate: 60,
  };
};
