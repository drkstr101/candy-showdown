import { Match, Round } from '@lib/types';
import cn from 'clsx';
import MatchCard from './match-card';
import styles from './schedule.module.css';

function RoundRow({ stage }: { stage: Round }) {
  // Group matches by the time block
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeBlocks = stage.schedule.reduce((allBlocks: any, match) => {
    allBlocks[match.start] = [...(allBlocks[match.start] || []), match];
    return allBlocks;
  }, {});

  return (
    <div key={stage.name} className={styles.row}>
      <h3 className={cn(styles['stage-name'], styles[stage.slug])}>
        <span>{stage.name}</span>
      </h3>
      <div className={cn(styles.matches, styles[stage.slug])}>
        {Object.keys(timeBlocks).map((startTime: string) => (
          <div key={startTime}>
            {timeBlocks[startTime].map((match: Match, index: number) => (
              <MatchCard key={match.title} match={match} showTime={index === 0} />
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
        {allRounds.map((stage) => (
          <RoundRow key={stage.slug} stage={stage} />
        ))}
      </div>
    </div>
  );
}
