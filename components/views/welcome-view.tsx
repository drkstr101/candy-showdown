import clsx from 'clsx';
import { HtmlHTMLAttributes } from 'react';

export interface WelcomeViewProps extends HtmlHTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

const defaultTitle = 'Page title';
const defaultDescription =
  'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.';
export default function WelcomeView({
  className,
  title = defaultTitle,
  description = defaultDescription,
  ...props
}: WelcomeViewProps) {
  return (
    <div className={clsx('px-6 py-24 sm:py-32 lg:px-8', className)} {...props}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{title}</h2>
        <p className="mt-6 text-lg leading-8 text-neutral-300"></p>
      </div>
    </div>
  );
}
