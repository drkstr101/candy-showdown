import { Button } from '@components/atoms/button';
import { INTRO_TEXT } from '@lib/constants';
import { AppUser, Participant } from '@lib/types';
import clsx from 'clsx';
import Image from 'next/image';
import { HtmlHTMLAttributes } from 'react';

export interface SidePanelProps extends HtmlHTMLAttributes<HTMLDivElement> {
  user: AppUser;
  selectedItem: Participant | null;
}

function ParticipantCard({ imageSquare, name, title }: Participant) {
  return (
    <div className="relative -mb-px flex grow select-none gap-3 border-y border-transparent px-3 py-2 text-sm text-neutral-900 -outline-offset-2 first:rounded-t-md first:border-t-0 last:mb-0 last:rounded-b-md last:border-b-0 dark:border-y-neutral-700 dark:text-neutral-200">
      <div className="flex-shrink-0">
        <Image
          alt=""
          width={192}
          height={192}
          src={imageSquare.url}
          className="h-10 w-10 rounded-full"
        />
      </div>
      <div className="min-w-0 flex-1">
        <span aria-hidden="true" className="absolute inset-0" />
        <p className="whitespace-nowrap text-sm font-medium text-neutral-100">{name}</p>
        <p className="truncate whitespace-nowrap text-sm text-neutral-300">{title}</p>
      </div>
    </div>
  );
}
export const SidePanel = ({ user, selectedItem, ...props }: SidePanelProps) => {
  return (
    <div>
      <div {...props}>
        <div className="flex flex-row p-4">
          <div className="grow text-base font-semibold leading-6 text-neutral-100">
            {user.username}
          </div>
          <span
            className={clsx(
              'rounded-md bg-black px-2 py-1 text-sm font-medium opacity-75 ring-1 ring-inset',
              {
                'text-success-300 ring-success-600/25': user.status === 'online',
                'text-danger-300 ring-danger-600/25': user.status === 'offline',
              }
            )}
          >
            {user.status}
          </span>
        </div>
        <div className="border-t border-neutral-100/25 px-3 py-3 text-neutral-200">
          {INTRO_TEXT}
        </div>
        <div className="flex flex-row border-t border-neutral-100/25">
          {selectedItem && <ParticipantCard {...selectedItem} />}
          <Button variant="secondary" className={clsx({ hidden: selectedItem === null })}>
            Use
          </Button>
        </div>
      </div>
      <div className="flex justify-end pt-3"></div>
    </div>
  );
};

export default SidePanel;
