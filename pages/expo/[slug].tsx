import { GetStaticPaths, GetStaticProps } from 'next';

import Layout from '@components/layout';
import Page from '@components/page';
import SponsorSection from '@components/sponsor-section';

import { getAllSponsors } from '@lib/cms-api';
import { META_DESCRIPTION } from '@lib/constants';
import { Sponsor } from '@lib/types';

type Props = {
  sponsor: Sponsor;
};

export default function SponsorPage({ sponsor }: Props) {
  const meta = {
    title: 'Candy Showdown',
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <Layout>
        <SponsorSection sponsor={sponsor} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;
  const sponsors = await getAllSponsors();
  const sponsor = sponsors?.find((s: Sponsor) => s.slug === slug) || null;

  if (!sponsor) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      sponsor,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const sponsors = await getAllSponsors();
  const slugs = sponsors?.map((s: Sponsor) => ({ params: { slug: s.slug } })) || [];

  return {
    paths: slugs,
    fallback: 'blocking',
  };
};
