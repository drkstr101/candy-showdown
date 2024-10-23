import { Participant } from '@lib/types';
import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
  Button,
  GridListItemProps,
  GridListProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Checkbox } from './checkbox';
import { composeTailwindRenderProps, focusRing } from './ui-helpers';

export function GridList<T extends object>({ children, className, ...props }: GridListProps<T>) {
  return (
    <AriaGridList
      className={composeTailwindRenderProps(
        className,
        'relative overflow-auto rounded-lg border dark:border-neutral-600'
      )}
      {...props}
    >
      {children}
    </AriaGridList>
  );
}

const itemStyles = tv({
  extend: focusRing,
  base: 'relative flex gap-3 cursor-default select-none py-2 px-3 text-sm text-neutral-900 dark:text-neutral-200 border-y dark:border-y-neutral-700 border-transparent first:border-t-0 last:border-b-0 first:rounded-t-md last:rounded-b-md -mb-px last:mb-0 -outline-offset-2',
  variants: {
    isSelected: {
      false: 'hover:bg-neutral-100 dark:hover:bg-neutral-700/70',
      true: 'bg-primary-700 dark:bg-primary-700/35 hover:bg-primary-200 dark:hover:bg-primary-700/40 border-y-primary-200 dark:border-y-primary-900 z-20',
    },
    isDisabled: {
      true: 'text-neutral-300 dark:text-neutral-600 forced-colors:text-[GrayText] z-10',
    },
  },
});

export function GridListItem({ children, ...props }: GridListItemProps<Participant>) {
  const textValue = typeof children === 'string' ? children : undefined;
  return (
    <AriaGridListItem textValue={textValue} {...props} className={itemStyles}>
      {({ selectionMode, selectionBehavior, allowsDragging }) => (
        <>
          {/* Add elements for drag and drop and selection. */}
          {allowsDragging && <Button slot="drag">≡</Button>}
          {selectionMode === 'multiple' && selectionBehavior === 'toggle' && (
            <Checkbox slot="selection" />
          )}
          {children}
        </>
      )}
    </AriaGridListItem>
  );
}
