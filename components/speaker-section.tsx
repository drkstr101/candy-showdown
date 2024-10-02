import { Speaker } from '@lib/types';
import Image from 'next/image';
import Link from 'next/link';
import styles from './speaker-section.module.css';

type Props = {
  speaker: Speaker;
};

export default function SpeakerSection({ speaker }: Props) {
  return (
    <>
      <Link href="/speakers" className={styles.backlink}>
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
        Back to speakers
      </Link>
      <div key={speaker.name} className={styles.container}>
        <div style={{ minWidth: '300px' }}>
          <Image
            alt={speaker.name}
            title={speaker.name}
            src={speaker.image.url}
            className={styles.image}
            loading="lazy"
            height={400}
            width={300}
          />
        </div>
        <div className={styles['speaker-details']}>
          <div>
            <h1 className={styles.name}>{speaker.name}</h1>
            <p className={styles.title}>
              {`${speaker.title} @ `}
              <span className={styles.company}>{speaker.company}</span>
            </p>
            <h2 className={styles['bio-header']}>Bio</h2>
            <p className={styles.bio}>{speaker.bio}</p>
          </div>
        </div>
      </div>
      {speaker.talk && (
        <div className={styles['talk-details']}>
          <h3 className={styles['socials-header']}>{speaker.talk.title}</h3>
          <p>{speaker.talk.description}</p>
        </div>
      )}
    </>
  );
}
