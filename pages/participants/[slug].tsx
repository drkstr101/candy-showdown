import { GetStaticPaths, GetStaticProps } from 'next';

import Layout from '@components/layout';
import Page from '@components/page';
import ParticipantSection from '@components/participant-section';

import { getAllParticipants } from '@lib/cms-api';
import { META_DESCRIPTION } from '@lib/constants';
import { Participant } from '@lib/types';

type Props = {
  participant: Participant;
};

export default function ParticipantPage({ participant }: Props) {
  const meta = {
    title: 'Candy Showdown',
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <Layout>
        <ParticipantSection participant={participant} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;
  const participants = await getAllParticipants();
  const currentParticipant = participants?.find((s: Participant) => s.slug === slug) || null;

  if (!currentParticipant) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      participant: currentParticipant,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const participants = await getAllParticipants();
  const slugs = participants?.map((s: Participant) => ({ params: { slug: s.slug } })) || [];

  return {
    paths: slugs,
    fallback: false,
  };
};
