import Layout from '@components/layout';
import Page from '@components/page';
import HomeView from '@components/views/home-view/home-view';
import Registration from '@components/views/registration-view';
import { type GetServerSideProps } from 'next';

import { useAppContext } from '@components/organisms/ui-provider';
import { getAllParticipants, getAllRounds } from '@lib/api/content-api';
import { UserApi } from '@lib/api/user-api';
import { META_DESCRIPTION } from '@lib/constants';
import { createClient } from '@lib/supabase/server';
import { AppUser, AuthUser, Round } from '@lib/types';

type ServerProps = {
  principal: AuthUser | null;
  // participants: Participant[];
  rounds: Round[];
  user: AppUser | null;
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async (ctx) => {
  const userApi = new UserApi(createClient(ctx));
  const { data, error } = await userApi.getPrincipal();
  if (error) console.error(error);

  const participants = (await getAllParticipants()) ?? [];
  const rounds = (await getAllRounds()) ?? [];

  if (!data.user) return { props: { rounds, principal: null, user: null } };

  const principal = data.user;
  const user: AppUser | null = await userApi.fetchUserById(principal.id);

  return { props: { principal, rounds, participants, user } };
};

// export const getStaticProps: GetStaticProps<StaticProps> = async () => {
//   const rounds = (await getAllRounds()) ?? [];

//   return {
//     props: { rounds },
//     revalidate: 60,
//   };
// };

export interface IndexProps {
  principal: AuthUser | null;
}

// export const getServerSideProps = (async (ctx) => {
//   // Fetch data from external API
//   // const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   // const repo: Repo = await res.json()
//   // Pass data to the page via props
//   const userApi = new UserApi(createClient(ctx));
//   const { data, error } = await userApi.getPrincipal();
//   if (error) console.error(error);

//   return { props: { principal: data.user } };
// }) satisfies GetServerSideProps<IndexProps>;

export default function Index(props: unknown) {
  // console.log('Index(props)', props);

  const meta = {
    title: 'Candy Showdown',
    description: META_DESCRIPTION,
  };

  const { user } = useAppContext();
  return (
    <Page meta={meta} fullViewport>
      <Layout>{user ? <HomeView /> : <Registration />}</Layout>
    </Page>
  );
}
