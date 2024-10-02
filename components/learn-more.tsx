import { INFO_URL } from '@lib/constants';
import cn from 'clsx';
import styles from './contact.module.css';
import styleUtils from './utils.module.css';

export default function LearnMore() {
  return (
    <div className={cn(styleUtils.appear, styleUtils['appear-fifth'], styles.contact)}>
      Learn more on{' '}
      <a
        href={INFO_URL}
        className={styles['contact-email']}
        target="_blank"
        rel="noopener noreferrer"
      >
        Interactions
      </a>
      .
    </div>
  );
}
