import Layout from '@components/layout';
import Page from '@components/page';
import HomeView from '@components/views/home-view/home-view';
import Registration from '@components/views/registration-view';

import { useAuth } from '@components/organisms/auth-provider';
import { getAllParticipants, getAllRounds } from '@lib/api/content-api';
import { META_DESCRIPTION } from '@lib/constants';
import { Participant, Round } from '@lib/types';
import { GetStaticProps } from 'next';

type Props = {
  rounds: Round[];
  participants: Participant[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const rounds = (await getAllRounds()) ?? [];
  const participants = (await getAllParticipants()) ?? [];

  return {
    props: {
      rounds,
      participants,
    },
    revalidate: 60,
  };
};

export default function Index(props: Props) {
  // console.log('Index(props)', props);

  const meta = {
    title: 'Candy Showdown',
    description: META_DESCRIPTION,
  };

  const { loginStatus } = useAuth();
  return (
    <Page meta={meta} fullViewport>
      <Layout>{loginStatus === 'loggedIn' ? <HomeView /> : <Registration />}</Layout>
    </Page>
  );
}
