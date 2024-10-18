import { Participant } from '@lib/types';
import Image from 'next/image';
import Link from 'next/link';
import styles from './participants-grid.module.css';

type Props = {
  participants: Participant[];
};

export default function ParticipantsGrid({ participants }: Props) {
  return (
    <div className={styles.grid}>
      {participants?.map((participant) => (
        <Link
          key={participant.name}
          href={`/participants/${participant.slug}`}
          role="button"
          tabIndex={0}
          className={styles.card}
        >
          <div className={styles.imageWrapper}>
            <Image
              alt={participant.name}
              src={participant.image.url}
              className={styles.image}
              loading="lazy"
              quality="50"
              title={participant.name}
              placeholder={participant.image.blurDataURL ? 'blur' : 'empty'}
              blurDataURL={participant.image.blurDataURL}
              width={300}
              height={300}
            />
          </div>
          <div className={styles.cardBody}>
            <div>
              <h2 className={styles.name}>{participant.name}</h2>
              <p className={styles.title}>{participant.title}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
