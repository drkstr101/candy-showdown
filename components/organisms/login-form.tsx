// import useAppData from '@lib/hooks/use-app-data';
import cn from 'clsx';
import { useCallback, useMemo, useState } from 'react';

import LoadingDots from '../atoms/loading-dots';

import styleUtils from '@components/style-utils.module.css';
import { UserApi } from '@lib/api/user-api';
import isValidEmail from '@lib/helpers/is-valid-email';
import { useLocalStorage } from '@lib/hooks/use-local-storage';
import { createClient } from '@lib/supabase/client';
import styles from './login-form.module.css';

const DEFAULT_ERROR_MSG = 'Error! Please try again.';

function toStatusMessage(code: 'bad_email' | 'success' | string) {
  switch (code) {
    case 'bad_email':
      return 'Please enter a valid email';
    case 'success':
      return 'Please check your inbox for the login URL.';
    default:
      return DEFAULT_ERROR_MSG;
  }
}

type FormState = 'default' | 'loading' | 'error' | 'success';

export default function Form({ onRegister }: { onRegister: () => void }) {
  const [username, setUsername] = useLocalStorage<string | null>('user.username', null);
  const [email, setEmail] = useState(username ? `${username}@aps.org` : '');
  const [statusMsg, setStatusMsg] = useState('');
  const [errorTryAgain, setErrorTryAgain] = useState(false);
  const [focused, setFocused] = useState(false);
  const [formState, setFormState] = useState<FormState>('default');
  const userApi = useMemo(() => new UserApi(createClient()), []);

  const handleRegister = useCallback(
    async (email: string, token?: string) => {
      // soft-validate email address for convenience
      if (!isValidEmail(email)) {
        setFormState('error');
        setStatusMsg(toStatusMessage('bad_email'));
        return;
      }

      const { error } = await userApi.signIn(email);
      if (error) {
        console.error(error);
        setFormState('error');
        setStatusMsg(toStatusMessage(error.message));
      } else {
        setUsername(email.split('@').at(0) ?? null);
        setFormState('success');
        setStatusMsg(toStatusMessage('success'));
        onRegister();
      }
    },
    [onRegister, setUsername, userApi]
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (formState === 'default') {
        setFormState('loading');
        return await handleRegister(email);
      } else {
        setFormState('default');
      }
    },
    [email, formState, handleRegister]
  );

  const onTryAgainClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    setFormState('default');
    setErrorTryAgain(true);
  }, []);

  return formState === 'error' || formState === 'success' ? (
    <div className={cn(styles.form)}>
      <div className={styles['form-row']}>
        <div
          className={cn(styles['input-label'], {
            [styles.error]: formState === 'error',
            [styles.success]: formState === 'success',
          })}
        >
          <div className={cn(styles.input, styles['input-text'])}>{statusMsg}</div>
          <button
            type="button"
            className={cn(styles.submit, styles.register, styles.error)}
            onClick={onTryAgainClick}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  ) : (
    <form
      className={cn(styles.form, {
        [styleUtils.appear]: !errorTryAgain,
        [styleUtils['appear-fifth']]: !errorTryAgain,
      })}
      onSubmit={onSubmit}
    >
      <div className={styles['form-row']}>
        <label
          htmlFor="email-input-field"
          className={cn(styles['input-label'], {
            [styles.focused]: focused,
          })}
        >
          <input
            className={styles.input}
            autoComplete="off"
            type="email"
            id="email-input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Enter email to register"
            aria-label="Your email address"
            required
          />
        </label>
        <button
          type="submit"
          className={cn(styles.submit, styles.register, styles[formState])}
          disabled={formState === 'loading'}
        >
          {formState === 'loading' ? (
            <LoadingDots size={4} />
          ) : username ? (
            <>Login</>
          ) : (
            <>Register</>
          )}
        </button>
      </div>
    </form>
  );
}
