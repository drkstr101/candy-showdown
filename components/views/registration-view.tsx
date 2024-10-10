import cn from 'clsx';
import { useState } from 'react';

import Container from '@components/container';
import Form from '@components/form';
import Hero from '@components/hero';
import styleUtils from '@components/utils.module.css';
import { INFO_URL } from '@lib/constants';

import styles from './registration-view.module.css';

type PageState = 'register' | 'welcome';

export default function RegistrationView() {
  const [pageState, setPageState] = useState<PageState>('register');

  return (
    <Container>
      <Hero />
      <Form onRegister={() => setPageState('welcome')} />
      <div className={cn(styleUtils.appear, styleUtils['appear-fifth'], styles.status)}>
        Learn more on{' '}
        <a
          href={INFO_URL}
          className={styles['status-link']}
          target="_blank"
          rel="noopener noreferrer"
        >
          Interactions
        </a>
        .
      </div>
    </Container>
  );
}
