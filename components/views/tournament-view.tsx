import TournamentBrackets from '@components/organisms/tournament-brackets';
import { Round } from '@lib/types';

export default function TournamentView({ rounds }: { rounds: Round[] }) {
  return (
    <div className="h-full w-full overflow-x-auto">
      <TournamentBrackets rounds={rounds} />
    </div>
  );
}
