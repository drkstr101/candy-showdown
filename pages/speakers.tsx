import { GetStaticProps } from 'next';

import Header from '@components/header';
import Layout from '@components/layout';
import Page from '@components/page';
import SpeakersGrid from '@components/speakers-grid';

import { getAllSpeakers } from '@lib/cms-api';
import { META_DESCRIPTION } from '@lib/constants';
import { Speaker } from '@lib/types';

type Props = {
  speakers: Speaker[];
};

export default function Speakers({ speakers }: Props) {
  const meta = {
    title: 'Speakers - Candy Showdown',
    description: META_DESCRIPTION,
  };
  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Speakers" description={meta.description} />
        <SpeakersGrid speakers={speakers} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const speakers = await getAllSpeakers();

  return {
    props: {
      speakers: speakers || [],
    },
    revalidate: 60,
  };
};
