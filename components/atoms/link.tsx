import {
  Link as AriaLink,
  LinkProps as AriaLinkProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from '../ui-helpers';

interface LinkProps extends AriaLinkProps {
  variant?: 'primary' | 'secondary';
}

const styles = tv({
  extend: focusRing,
  base: 'underline disabled:no-underline disabled:cursor-default forced-colors:disabled:text-[GrayText] transition rounded',
  variants: {
    variant: {
      primary:
        'text-primary-600 dark:text-primary-500 underline decoration-primary-600/60 hover:decoration-primary-600 dark:decoration-primary-500/60 dark:hover:decoration-primary-500',
      secondary:
        'text-neutral-700 dark:text-neutral-300 underline decoration-neutral-700/50 hover:decoration-neutral-700 dark:decoration-neutral-300/70 dark:hover:decoration-neutral-300',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export function Link(props: LinkProps) {
  return (
    <AriaLink
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className, variant: props.variant })
      )}
    />
  );
}
