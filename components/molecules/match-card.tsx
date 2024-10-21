import { Match } from '@lib/types';
import cn from 'clsx';
import { isAfter, isBefore } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './match-card.module.css';

type Props = {
  key: string;
  match: Match;
  showTime: boolean;
  start: string;
  end: string;
};

const formatDate = (date: string) => {
  // https://github.com/date-fns/date-fns/issues/946
  return Date.parse(date).toLocaleString();
};

export default function MatchCard({
  match: { title, participants },
  start,
  end,
  showTime,
}: Props) {
  const [isMatchLive, setIsMatchLive] = useState(false);
  const [startAndEndTime, setStartAndEndTime] = useState('');

  useEffect(() => {
    const now = Date.now();
    setIsMatchLive(isAfter(now, Date.parse(start)) && isBefore(now, Date.parse(end)));
    setStartAndEndTime(`${formatDate(start)} – ${formatDate(end)}`);
  }, [end, start]);

  const firstParticipantLink =
    participants.length === 0 ? '#' : `/participants/${participants[0]?.slug}`;

  return (
    <div key={title} className={styles.match}>
      {showTime && <p className={styles.time}>{startAndEndTime || <>&nbsp;</>}</p>}
      <Link
        href={firstParticipantLink}
        className={cn(styles.card, {
          [styles['is-live']]: isMatchLive,
        })}
      >
        <div className={styles['card-body']}>
          <h4 title={title} className={styles.title}>
            {title}
          </h4>
          <div className={styles.participant}>
            <div className={styles['avatar-group']}>
              {participants.map((s) => (
                <div key={s.name} className={styles['avatar-wrapper']}>
                  <Image
                    loading="lazy"
                    alt={s.name}
                    className={styles.avatar}
                    src={s.image.url}
                    title={s.name}
                    width={24}
                    height={24}
                  />
                </div>
              ))}
            </div>
            <h5 className={styles.name}>
              {participants.length === 1
                ? participants[0].name
                : `${participants.length} participants`}
            </h5>
          </div>
        </div>
      </Link>
    </div>
  );
}
