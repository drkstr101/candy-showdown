// import useAppData from '@lib/hooks/use-app-data';
import cn from 'clsx';
import { useCallback, useState } from 'react';

import LoadingDots from './loading-dots';

import isValidEmail from '@lib/helpers/is-valid-email';
import { createClient } from '@lib/supabase/client';
import styles from './form.module.css';
import styleUtils from './utils.module.css';

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
  const [email, setEmail] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [errorTryAgain, setErrorTryAgain] = useState(false);
  const [focused, setFocused] = useState(false);
  const [formState, setFormState] = useState<FormState>('default');
  const supabase = createClient();

  const handleRegister = useCallback(
    async (email: string, token?: string) => {
      // soft-validate email address for convenience
      if (!isValidEmail(email)) {
        setFormState('error');
        setStatusMsg(toStatusMessage('bad_email'));
        return;
      }

      // TODO this should not be hard-coded here
      const options = { emailRedirectTo: '/', shouldCreateUser: true };
      const { data, error } = await supabase.auth.signInWithOtp({ email, options });
      // console.log('data = ', data);

      if (error) {
        console.error(error);
        setFormState('error');
        setStatusMsg(toStatusMessage(error.message));
        return;
      }

      setFormState('success');
      setStatusMsg(toStatusMessage('success'));
      onRegister();
    },
    [onRegister, supabase.auth]
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

  // useQueryParam('email', setEmail);

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
          {formState === 'loading' ? <LoadingDots size={4} /> : <>Register</>}
        </button>
      </div>
    </form>
  );
}
