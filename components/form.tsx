// import useAppData from '@lib/hooks/use-app-data';
import cn from 'clsx';
import { useCallback, useState } from 'react';

import LoadingDots from './loading-dots';

import { register } from '@lib/user-api';
import styles from './form.module.css';
import styleUtils from './utils.module.css';

const DEFAULT_ERROR_MSG = 'Error! Please try again.';

function toStatusMessage(code: string) {
  switch (code) {
    case 'bad_email':
      return 'Please enter a valid email';
    case 'success':
      return 'Login email sent';
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

  const handleRegister = useCallback(
    async (token?: string) => {
      const res = await register(email, token);

      if (!res.ok) {
        const json = await res.json();
        setFormState('error');
        setStatusMsg(toStatusMessage(json.error.code));
        return;
      }

      setFormState('success');
      setStatusMsg(toStatusMessage('success'));
    },
    [email]
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (formState === 'default') {
        setFormState('loading');
        return await handleRegister();
      } else {
        setFormState('default');
      }
    },
    [formState, handleRegister]
  );

  const onTryAgainClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    setFormState('default');
    setErrorTryAgain(true);
  }, []);

  // useQueryParam('email', setEmail);

  return formState === 'error' ? (
    <div className={cn(styles.form)}>
      <div className={styles['form-row']}>
        <div className={cn(styles['input-label'], styles.error)}>
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
