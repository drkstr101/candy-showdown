import { SkipNavContent } from '@reach/skip-nav';
import { useRouter } from 'next/router';

import AppContent from '@components/app';
import Page from '@components/page';
import { META_DESCRIPTION } from '@lib/constants';

export default function App() {
  const { query } = useRouter();
  const meta = {
    title: 'Candy Showdown',
    description: META_DESCRIPTION,
  };
  const ticketNumber = query.ticketNumber?.toString();
  const defaultUserData = {
    id: query.id?.toString(),
    ticketNumber: ticketNumber ? parseInt(ticketNumber, 10) : undefined,
    name: query.name?.toString(),
    username: query.username?.toString(),
  };

  return (
    <Page meta={meta} fullViewport>
      <SkipNavContent />
      <AppContent
        defaultUserData={defaultUserData}
        defaultPageState={query.ticketNumber ? 'ticket' : 'registration'}
      />
    </Page>
  );
}
