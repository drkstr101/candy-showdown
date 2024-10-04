import { InviteStageIcon } from '@100mslive/react-icons';
import CheckIcon from '@components/icons/icon-check';
import GithubIcon from '@components/icons/icon-github';
import { REPO, SITE_ORIGIN, TicketGenerationState } from '@lib/constants';
import useConfData from '@lib/hooks/use-conf-data';
import isMobileOrTablet from '@lib/is-mobile-or-tablet';
import { scrollTo } from '@lib/smooth-scroll';
import { OAuthData } from '@lib/types';
import { saveGithubToken } from '@lib/user-api';
import cn from 'clsx';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import formStyles from './form.module.css';
import LoadingDots from './loading-dots';
import ticketFormStyles from './ticket-form.module.css';

type FormState = 'default' | 'loading' | 'error';

type Props = {
  defaultUsername?: string;
  setTicketGenerationState: React.Dispatch<React.SetStateAction<TicketGenerationState>>;
};

const githubEnabled = Boolean(process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID);

export default function Form({ defaultUsername = '', setTicketGenerationState }: Props) {
  const [username, setUsername] = useState(defaultUsername);
  const [formState, setFormState] = useState<FormState>('default');
  const [errorMsg, setErrorMsg] = useState('');
  const { userData, setUserData } = useConfData();
  const formRef = useRef<HTMLFormElement>(null);

  return formState === 'error' ? (
    <div>
      <div className={cn(formStyles['form-row'], ticketFormStyles['form-row'])}>
        <div className={cn(formStyles['input-label'], formStyles.error)}>
          <div className={cn(formStyles.input, formStyles['input-text'])}>{errorMsg}</div>
          <button
            type="button"
            className={cn(formStyles.submit, formStyles.error)}
            onClick={() => {
              setFormState('default');
              setTicketGenerationState('default');
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  ) : (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();

        if (formState !== 'default') {
          setTicketGenerationState('default');
          setFormState('default');
          return;
        }

        setFormState('loading');
        setTicketGenerationState('loading');

        if (!process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID) {
          setFormState('error');
          setErrorMsg('GitHub OAuth App must be set up.');
          return;
        }

        const windowWidth = 600;
        const windowHeight = 700;
        // https://stackoverflow.com/a/32261263/114157
        const windowTop = window.top && window.top.outerHeight / 2 + window.top.screenY - 700 / 2;
        const windowLeft = window.top && window.top.outerWidth / 2 + window.top.screenX - 600 / 2;

        const openedWindow = window.open(
          `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(
            process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID
          )}`,
          'githubOAuth',
          `resizable,scrollbars,status,width=${windowWidth},height=${windowHeight},top=${windowTop},left=${windowLeft}`
        );

        new Promise<OAuthData | undefined>((resolve) => {
          const interval = setInterval(() => {
            if (!openedWindow || openedWindow.closed) {
              clearInterval(interval);
              resolve(undefined);
            }
          }, 250);

          window.addEventListener('message', function onMessage(msgEvent) {
            // When devtools is opened the message may be received multiple times
            if (SITE_ORIGIN !== msgEvent.origin || !msgEvent.data.type) {
              return;
            }
            clearInterval(interval);
            if (openedWindow) {
              openedWindow.close();
            }
            resolve(msgEvent.data);
          });
        })
          .then(async (data) => {
            if (!data) {
              setFormState('default');
              setTicketGenerationState('default');
              return;
            }

            let usernameFromResponse: string;
            let name: string;
            if (data.type === 'token') {
              const res = await saveGithubToken({ id: userData.id, token: data.token });

              if (!res.ok) {
                throw new Error('Failed to store oauth result');
              }

              const responseJson = await res.json();
              usernameFromResponse = responseJson.username;
              name = responseJson.name;
            } else {
              usernameFromResponse = data.login;
              name = data.name;
            }

            document.body.classList.add('ticket-generated');
            setUserData({ ...userData, username: usernameFromResponse, name });
            setUsername(usernameFromResponse);
            setFormState('default');
            setTicketGenerationState('default');

            // Prefetch GitHub avatar
            new Image().src = `https://github.com/${usernameFromResponse}.png`;

            // Prefetch the twitter share URL to eagerly generate the page
            fetch(`/tickets/${usernameFromResponse}`).catch((_) => {});
          })
          .catch((err) => {
            console.error(err);
            setFormState('error');
            setErrorMsg('Error! Please try again.');
            setTicketGenerationState('default');
          });
      }}
    >
      <div className={cn(formStyles['form-row'], ticketFormStyles['form-row'])}>
        <div className={cn(formStyles['github-wrapper'])}>
          <button
            type="submit"
            className={cn(
              formStyles.submit,
              formStyles['generate-with-github'],
              formStyles[formState],
              {
                [formStyles['not-allowed']]: !githubEnabled,
              }
            )}
            disabled={
              !process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID ||
              formState === 'loading' ||
              Boolean(username)
            }
            onClick={() => {
              if (formRef && formRef.current && isMobileOrTablet()) {
                scrollTo(formRef.current, formRef.current.offsetHeight);
              }
            }}
          >
            <div className={ticketFormStyles.generateWithGithub}>
              <span className={ticketFormStyles.githubIcon}>
                <GithubIcon color="#fff" size={24} />
              </span>
              {formState === 'loading' ? (
                <LoadingDots size={4} />
              ) : (
                username || 'Generate with GitHub'
              )}
            </div>
            {username ? (
              <span className={ticketFormStyles.checkIcon}>
                <CheckIcon color="#fff" size={24} />
              </span>
            ) : null}
          </button>
          <p className={ticketFormStyles.description}>
            {githubEnabled ? (
              'Only public info will be used.'
            ) : (
              <>
                GitHub OAuth app is required.{' '}
                <a
                  href={`${REPO}#authentication`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ticketFormStyles['learn-more']}
                >
                  Learn more.
                </a>
              </>
            )}
          </p>
        </div>
        <div className={formStyles['or-divider']}>OR</div>
        <Link
          href="/stage/a"
          className={cn(
            formStyles.submit,
            formStyles['generate-with-github'],
            formStyles['stage-btn']
          )}
        >
          <div className={ticketFormStyles.generateWithGithub}>
            <span className={ticketFormStyles.githubIcon}>
              <InviteStageIcon />
            </span>
            Go to Live Stage
          </div>
        </Link>
      </div>
    </form>
  );
}
