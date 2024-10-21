import { Match, Round } from '@lib/types';
import cn from 'clsx';
import MatchCard from '../molecules/match-card';
import styles from './schedule-view.module.css';

function RoundRow({ round }: { round: Round }) {
  // Group matches by the time block

  // console.log('round = ', round);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeBlocks = round.schedule.reduce((allBlocks: Record<string, any>, match) => {
    allBlocks[round.start] = [...(allBlocks[round.start] || []), match];
    return allBlocks;
  }, {});

  // console.log('timeBlocks = ', timeBlocks);

  return (
    <div key={round.name} className={styles.row}>
      <h3 className={cn(styles['round-name'], styles[round.slug])}>
        <span>{round.name}</span>
      </h3>
      <div className={cn(styles.matches, styles[round.slug])}>
        {Object.keys(timeBlocks).map((startTime: string) => (
          <div key={startTime}>
            {timeBlocks[startTime].map((match: Match, index: number) => (
              <MatchCard
                key={match.title}
                match={match}
                showTime={index === 0}
                start={round.start}
                end={round.end}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

type Props = {
  allRounds: Round[];
};

export default function Schedule({ allRounds }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles['row-wrapper']}>
        {allRounds.map((round) => (
          <RoundRow key={round.slug} round={round} />
        ))}
      </div>
    </div>
  );
}
