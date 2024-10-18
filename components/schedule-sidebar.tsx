import { SHORT_DATE } from '@lib/constants';
import { Round } from '@lib/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MatchCard from './match-card';
import styles from './schedule-sidebar.module.css';
import Select from './select';

type Props = {
  allRounds: Round[];
};

export default function ScheduleSidebar({ allRounds }: Props) {
  const router = useRouter();
  const [currentRoundSlug, setCurrentRoundSlug] = useState(router.query.slug);
  const currentRound = allRounds.find((s: Round) => s.slug === currentRoundSlug);

  useEffect(() => {
    setCurrentRoundSlug(router.query.slug);
  }, [router.query.slug]);

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
          <MatchCard key={match.title} match={match} showTime />
        ))}
      </div>
    </div>
  );
}
