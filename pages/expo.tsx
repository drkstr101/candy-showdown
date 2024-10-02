import { GetStaticProps } from 'next';

import Header from '@components/header';
import Layout from '@components/layout';
import Page from '@components/page';
import SponsorsGrid from '@components/sponsors-grid';

import { getAllSponsors } from '@lib/cms-api';
import { META_DESCRIPTION } from '@lib/constants';
import { Sponsor } from '@lib/types';

type Props = {
  sponsors: Sponsor[];
};

export default function ExpoPage({ sponsors }: Props) {
  const meta = {
    title: 'Expo - Candy Showdown',
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Expo" description={meta.description} />
        <SponsorsGrid sponsors={sponsors} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const sponsors = await getAllSponsors();

  return {
    props: {
      sponsors: sponsors || [],
    },
    revalidate: 60,
  };
};
