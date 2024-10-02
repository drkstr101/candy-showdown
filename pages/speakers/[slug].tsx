import { GetStaticPaths, GetStaticProps } from 'next';

import Layout from '@components/layout';
import Page from '@components/page';
import SpeakerSection from '@components/speaker-section';

import { getAllSpeakers } from '@lib/cms-api';
import { META_DESCRIPTION } from '@lib/constants';
import { Speaker } from '@lib/types';

type Props = {
  speaker: Speaker;
};

export default function SpeakerPage({ speaker }: Props) {
  const meta = {
    title: 'Candy Showdown',
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <Layout>
        <SpeakerSection speaker={speaker} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;
  const speakers = await getAllSpeakers();
  const currentSpeaker = speakers?.find((s: Speaker) => s.slug === slug) || null;

  if (!currentSpeaker) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      speaker: currentSpeaker,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const speakers = await getAllSpeakers();
  const slugs = speakers?.map((s: Speaker) => ({ params: { slug: s.slug } })) || [];

  return {
    paths: slugs,
    fallback: false,
  };
};
