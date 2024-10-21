import { Participant } from '@lib/types';
import Image from 'next/image';
import Link from 'next/link';
import styles from './participant-section.module.css';

type Props = {
  participant: Participant;
};

export default function ParticipantSection({ participant }: Props) {
  return (
    <>
      <Link href="/participants" className={styles.backlink}>
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          shapeRendering="geometricPrecision"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back to participants
      </Link>
      <div key={participant.name} className={styles.container}>
        <div style={{ minWidth: '300px' }}>
          <Image
            alt={participant.name}
            title={participant.name}
            src={participant.image.url}
            className={styles.image}
            loading="lazy"
            height={400}
            width={300}
          />
        </div>
        <div className={styles['participant-details']}>
          <div>
            <h1 className={styles.name}>{participant.name}</h1>
            <p className={styles.title}>
              {`${participant.title} @ `}
              <span className={styles.company}>{participant.company}</span>
            </p>
            <h2 className={styles['bio-header']}>Description</h2>
            <p className={styles.bio}>{participant.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
}
