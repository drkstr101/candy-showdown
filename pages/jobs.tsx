import { GetStaticProps } from 'next';

import Header from '@components/header';
import JobsGrid from '@components/jobs-grid';
import Layout from '@components/layout';
import Page from '@components/page';

import { getAllJobs } from '@lib/cms-api';
import { META_DESCRIPTION } from '@lib/constants';
import { Job } from '@lib/types';

type Props = {
  jobs: Job[];
};

export default function Jobs({ jobs }: Props) {
  const meta = {
    title: 'Career Fair - Candy Showdown',
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Career Fair" description={meta.description} />
        <JobsGrid jobs={jobs} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const jobs = await getAllJobs();

  return {
    props: {
      jobs: jobs || [],
    },
    revalidate: 60,
  };
};
