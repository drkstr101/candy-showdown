import { GetStaticPaths, GetStaticProps } from 'next';

import Layout from '@components/layout';
import Page from '@components/page';
import StageContainer from '@components/stage-container';

import { getAllStages } from '@lib/cms-api';
import { META_DESCRIPTION } from '@lib/constants';
import { Stage } from '@lib/types';

type Props = {
  stage: Stage;
  allStages: Stage[];
};

export default function StagePage({ stage, allStages }: Props) {
  const meta = {
    title: 'Candy Showdown',
    description: META_DESCRIPTION,
  };
  return (
    <Page meta={meta} fullViewport>
      <Layout isLive={stage.isLive}>
        <StageContainer stage={stage} allStages={allStages} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;
  const stages = await getAllStages();
  const stage = stages?.find((s: Stage) => s.slug === slug) || null;

  if (!stage) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      stage,
      allStages: stages,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const stages = await getAllStages();
  const slugs = stages?.map((s: Stage) => ({ params: { slug: s.slug } })) || [];

  console.log({ slugs });
  return {
    paths: slugs,
    fallback: false,
  };
};
