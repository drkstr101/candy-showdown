import {
  composeRenderProps,
  Button as RACButton,
  ButtonProps as RACButtonProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from '../ui-helpers';

export interface ButtonProps extends RACButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 'icon';
}

const button = tv({
  extend: focusRing,
  base: 'px-5 py-2 text-sm text-center transition border border-black/10 dark:border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-none pointer-default',
  variants: {
    variant: {
      primary: 'bg-primary-600 hover:bg-primary-700 rounded-lg pressed:bg-primary-800 text-white',
      secondary:
        'bg-neutral-100 hover:bg-neutral-200 rounded-md pressed:bg-neutral-300 text-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:pressed:bg-neutral-400 dark:text-neutral-900',
      destructive: 'bg-red-700 hover:bg-red-800 pressed:bg-red-900 text-white',
      icon: 'border-0 p-1 flex items-center justify-center text-neutral-600 hover:bg-black/[5%] pressed:bg-black/10 dark:text-neutral-400 dark:hover:bg-white/10 dark:pressed:bg-white/20 disabled:bg-transparent',
    },
    isDisabled: {
      true: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-300 dark:text-neutral-300 forced-colors:text-[neutralText] border-black/5 dark:border-white/5',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, variant: props.variant, className })
      )}
    />
  );
}
