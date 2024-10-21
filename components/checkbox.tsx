import { Check, Minus } from 'lucide-react';
import { ReactNode } from 'react';
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  CheckboxGroupProps as AriaCheckboxGroupProps,
  CheckboxProps,
  ValidationResult,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Description, FieldError, Label } from './atoms/field';
import { composeTailwindRenderProps, focusRing } from './ui-helpers';

export interface CheckboxGroupProps extends Omit<AriaCheckboxGroupProps, 'children'> {
  label?: string;
  children?: ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup
      {...props}
      className={composeTailwindRenderProps(props.className, 'flex flex-col gap-2')}
    >
      <Label>{props.label}</Label>
      {props.children}
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </AriaCheckboxGroup>
  );
}

const checkboxStyles = tv({
  base: 'flex gap-2 items-center group text-sm transition',
  variants: {
    isDisabled: {
      false: 'text-neutral-800 dark:text-neutral-200',
      true: 'text-neutral-300 dark:text-neutral-600 forced-colors:text-[GrayText]',
    },
  },
});

const boxStyles = tv({
  extend: focusRing,
  base: 'w-5 h-5 flex-shrink-0 rounded flex items-center justify-center border-2 transition',
  variants: {
    isSelected: {
      false:
        'bg-white dark:bg-neutral-900 border-[--color] [--color:theme(colors.neutral.400)] dark:[--color:colors.neutral-400)] group-pressed:[--color:theme(colors.neutral.500)] dark:group-pressed:[--color:theme(colors.neutral.300)]',
      true: 'bg-[--color] border-[--color] [--color:theme(colors.neutral.700)] group-pressed:[--color:theme(colors.neutral.800)] dark:[--color:theme(colors.slate.300)] dark:group-pressed:[--color:theme(colors.slate.200)] forced-colors:![--color:Highlight]',
    },
    isInvalid: {
      true: '[--color:theme(colors.red.700)] dark:[--color:theme(colors.red.600)] forced-colors:![--color:Mark] group-pressed:[--color:theme(colors.red.800)] dark:group-pressed:[--color:theme(colors.red.700)]',
    },
    isDisabled: {
      true: '[--color:theme(colors.neutral.200)] dark:[--color:theme(colors.neutral.700)] forced-colors:![--color:GrayText]',
    },
  },
});

const iconStyles =
  'w-4 h-4 text-white group-disabled:text-neutral-400 dark:text-slate-900 dark:group-disabled:text-slate-600 forced-colors:text-[HighlightText]';

export function Checkbox(props: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className })
      )}
    >
      {({ isSelected, isIndeterminate, ...renderProps }) => (
        <>
          <div
            className={boxStyles({ isSelected: isSelected || isIndeterminate, ...renderProps })}
          >
            {isIndeterminate ? (
              <Minus aria-hidden className={iconStyles} />
            ) : isSelected ? (
              <Check aria-hidden className={iconStyles} />
            ) : null}
          </div>
          {props.children}
        </>
      )}
    </AriaCheckbox>
  );
}
