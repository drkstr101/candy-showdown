import useQueryParam from '@lib/hooks/use-query-param';
import { register } from '@lib/user-api';
import cn from 'clsx';
import { useCallback, useState } from 'react';
import styles from './app-entry.module.css';
import LoadingDots from './loading-dots';
import styleUtils from './utils.module.css';

type FormState = 'default' | 'loading' | 'error';

const DEFAULT_ERROR_MSG = 'Error! Please try again.';

function getErrorMsg(code: string) {
  switch (code) {
    case 'bad_email':
      return 'Please enter a valid email';
    default:
      return DEFAULT_ERROR_MSG;
  }
}

export default function AppEntry({ onRegister }: { onRegister: () => void }) {
  const [emailInput, setEmailInput] = useState('');
  const [focused, setFocused] = useState(false);
  const [formState, setFormState] = useState<FormState>('default');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = useCallback(
    async (token?: string) => {
      const res = await register(emailInput, token);

      if (!res.ok) {
        const json = await res.json();
        setErrorMsg(getErrorMsg(json.error.code));
        setFormState('error');
        return;
      }

      onRegister();
    },
    [emailInput, onRegister]
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        setFormState('loading');
        return handleRegister();
      } catch (err) {
        console.error(err);
        setErrorMsg(DEFAULT_ERROR_MSG);
        setFormState('error');
      }
    },
    [handleRegister]
  );

  const onTryAgainClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    setErrorMsg('');
    setFormState('default');
  }, []);

  useQueryParam('login', setEmailInput);

  return (
    <div className={cn(styles.container, styleUtils.appear, styleUtils['appear-first'])}>
      <h1 className={cn(styles.hero)}>Ready to start chatting live?</h1>
      <h2 className={cn(styles.description)}>Enter a valid APS email address to get started</h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles['form-row']}>
          <label
            htmlFor="email-input-field"
            className={cn(styles['input-label'], {
              [styles.focused]: focused,
              [styles.error]: formState === 'error',
            })}
          >
            {formState === 'error' ? (
              <div className={cn(styles.input, styles['input-text'])}>{errorMsg}</div>
            ) : (
              <input
                className={styles.input}
                autoComplete="off"
                type="email"
                id="email-input-field"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter email to join chat"
                aria-label="Your email address"
                required
              />
            )}
          </label>
          <button
            type="submit"
            className={cn(styles.submit, styles.register, styles[formState])}
            disabled={formState === 'loading'}
            onClick={formState === 'error' ? onTryAgainClick : undefined}
          >
            {formState === 'loading' ? (
              <LoadingDots size={4} />
            ) : (
              <>{formState === 'error' ? 'Try Again' : 'Join'}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
