import { GetStaticProps } from 'next';

import Header from '@components/header';
import Layout from '@components/layout';
import Page from '@components/page';
import Schedule from '@components/schedule';

import { getAllStages } from '@lib/api/content-api';
import { META_DESCRIPTION } from '@lib/constants';
import { Stage } from '@lib/types';

type Props = {
  allStages: Stage[];
};

export default function SchedulePage({ allStages }: Props) {
  const meta = {
    title: 'Schedule - Candy Showdown',
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Schedule" description={meta.description} />
        <Schedule allStages={allStages} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allStages = await getAllStages();

  return {
    props: {
      allStages: allStages || [],
    },
    revalidate: 60,
  };
};
