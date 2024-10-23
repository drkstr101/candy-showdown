import { MatchType, ParticipantType } from '@g-loot/react-tournament-brackets';
import { Round } from '@lib/types';
import { ListData, useListData } from '@react-stately/data';

export default function useMatchData(rounds: Round[]): ListData<MatchType> {
  return useListData<MatchType>({
    initialItems: rounds.flatMap((round) =>
      round.schedule.map((m) => {
        return {
          id: m.id,
          name: m.title,
          nextMatchId: m.nextMatch?.id ?? null,
          // nextLooserMatchId: null,
          tournamentRoundText: round.slug,
          startTime: round.start,
          state: 'SCHEDULED',
          participants: m.participants.map((p) => {
            return {
              id: p.slug,
              resultText: '0',
              isWinner: false,
              status: null,
              name: p.name,
              picture: p.imageSquare.url,
            } as ParticipantType;
          }),
        } as MatchType;
      })
    ),
  });
}
