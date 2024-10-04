import { AppDataContext, PageState, UserData } from '@lib/hooks/use-app-data';
import { useState } from 'react';
import AppContainer from './app-container';
import Form from './form';
import Hero from './hero';
import Layout from './layout';
import LearnMore from './learn-more';
import Ticket from './ticket';

type Props = {
  defaultUserData: UserData;
  sharePage?: boolean;
  defaultPageState?: PageState;
};

export default function App({
  defaultUserData,
  sharePage,
  defaultPageState = 'registration',
}: Props) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [pageState, setPageState] = useState<PageState>(defaultPageState);

  return (
    <AppDataContext.Provider
      value={{
        userData,
        setUserData,
        setPageState,
      }}
    >
      <Layout>
        <AppContainer>
          {pageState === 'registration' && !sharePage ? (
            <>
              <Hero />
              <Form />
              <LearnMore />
            </>
          ) : (
            <Ticket
              username={userData.username}
              name={userData.name}
              ticketNumber={userData.ticketNumber}
              sharePage={sharePage}
            />
          )}
        </AppContainer>
      </Layout>
    </AppDataContext.Provider>
  );
}
