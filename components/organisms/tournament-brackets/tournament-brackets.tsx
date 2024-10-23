import { SingleEliminationBracket } from '@g-loot/react-tournament-brackets';

import { Round } from '@lib/types';
import Match from './match';
import theme from './theme';
import useMatchData from './use-match-data';

export default function TournamentBrackets({ rounds }: { rounds: Round[] }) {
  const list = useMatchData(rounds);
  return (
    <SingleEliminationBracket
      matches={list.items}
      matchComponent={Match}
      theme={theme}
      options={{
        style: {
          roundHeader: {
            backgroundColor: theme.roundHeaders.background,
            fontColor: theme.textColor.main,
          },
          connectorColor: theme.border.color,
          connectorColorHighlight: theme.border.highlightedColor,
        },
      }}
    />
  );
}
