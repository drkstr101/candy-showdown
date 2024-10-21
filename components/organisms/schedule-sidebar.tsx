import { SHORT_DATE } from '@lib/constants';
import { Round } from '@lib/types';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Select from '@components/atoms/select';
import MatchCard from '@components/molecules/match-card';
import styles from './schedule-sidebar.module.css';

type Props = {
  allRounds: Round[];
};

export default function ScheduleSidebar({ allRounds }: Props) {
  const router = useRouter();
  const [currentRoundSlug, setCurrentRoundSlug] = useState('round-a');
  const currentRound = allRounds.find((s: Round) => s.slug === currentRoundSlug);

  // useEffect(() => {
  //   setCurrentRoundSlug('round-a');
  // }, []);

  return (
    <div className={styles.schedule}>
      <h3 className={styles.header}>Schedule</h3>
      <p>{SHORT_DATE}</p>
      <Select
        aria-label="Select a round"
        value={currentRoundSlug}
        onChange={(e) => {
          const slug = e.target.value;
          setCurrentRoundSlug(slug);
          router.push(`/round/${slug}`);
        }}
      >
        {allRounds.map((round) => (
          <option key={round.slug} value={round.slug}>
            {round.name}
          </option>
        ))}
      </Select>
      <div className={styles.matches}>
        {currentRound?.schedule.map((match) => (
          <MatchCard
            key={match.title}
            match={match}
            start={currentRound.start}
            end={currentRound.end}
            showTime
          />
        ))}
      </div>
    </div>
  );
}
