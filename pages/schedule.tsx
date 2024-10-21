import { GetStaticProps } from 'next';

import Layout from '@components/layout';
import Header from '@components/molecules/header';
import Page from '@components/page';
import Schedule from '@components/schedule';

import { getAllRounds } from '@lib/api/content-api';
import { META_DESCRIPTION } from '@lib/constants';
import { Round } from '@lib/types';

type Props = {
  allRounds: Round[];
};

export default function SchedulePage({ allRounds }: Props) {
  const meta = {
    title: 'Schedule - Candy Showdown',
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Schedule" description={meta.description} />
        <Schedule allRounds={allRounds} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allRounds = await getAllRounds();

  return {
    props: {
      allRounds: allRounds || [],
    },
    revalidate: 60,
  };
};
