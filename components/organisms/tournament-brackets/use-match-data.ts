import { getAllParticipants } from '@lib/api/content-api';
import { useAsyncList } from '@react-stately/data';
import chunk from 'lodash/chunk';
import shuffle from 'lodash/shuffle';

export default function useMatchData() {
  return useAsyncList({
    async load({ signal }) {
      const items = chunk(shuffle(await getAllParticipants()), 2).map(([a, b]) => {
        return {
          id: 19936,
          name: 'Match A-32',
          nextMatchId: 19934,
          // nextLooserMatchId: null,
          tournamentRoundText: 'A',
          startTime: '2024-10-21T00:00:00.000Z',
          state: 'SCHEDULED',
          participants: [
            {
              id: a.slug,
              resultText: '0',
              isWinner: false,
              status: null,
              name: a.name,
              picture: a.imageSquare.url,
            },
            {
              id: b.slug,
              resultText: '0',
              isWinner: false,
              status: null,
              name: b.name,
              picture: b.imageSquare.url,
            },
          ],
        };
      });

      return { items };
    },
  });
}
