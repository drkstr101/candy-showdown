import LoadingDots from '@components/atoms/loading-dots';
import { INTRO_TEXT } from '@lib/constants';
import { AppUser, AsyncStatus, Participant } from '@lib/types';
import clsx from 'clsx';
import Image from 'next/image';
import { HtmlHTMLAttributes } from 'react';

export function EmptyState() {
  return (
    <div className="relative block h-full w-full rounded-lg border-2 border-dashed border-neutral-300 px-12 py-2 text-center align-middle">
      <span className="my-5 block text-sm font-semibold text-neutral-100">No selection made</span>
    </div>
  );
}

function ParticipantCard({ participant }: { participant: Participant | null }) {
  return (
    <div className="relative mb-0 flex shrink-0 select-none gap-3 rounded-b-md border-y border-b-0 border-transparent px-3 py-2 text-sm text-neutral-900 animate-in fade-in dark:border-y-neutral-700 dark:text-neutral-200">
      {participant ? (
        <>
          <div className="flex-shrink-0 py-4">
            <Image
              alt=""
              width={192}
              height={192}
              src={participant.imageSquare.url}
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div className="min-w-0 flex-1 py-4">
            <span aria-hidden="true" className="absolute inset-0" />
            <p className="whitespace-nowrap text-sm font-medium text-neutral-100">
              {participant.name}
            </p>
            <p className="truncate whitespace-nowrap text-sm text-neutral-300">
              {participant.title}
            </p>
          </div>
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

export interface SidePanelProps extends HtmlHTMLAttributes<HTMLDivElement> {
  user: AppUser;
  selectedItem: Participant | null;
  status: AsyncStatus;
}

export const SidePanel = ({ user, selectedItem, status, ...props }: SidePanelProps) => {
  return (
    <div>
      <div {...props}>
        <div className="flex flex-row p-4 pb-3">
          <div className="grow text-base font-semibold leading-6 text-neutral-100">
            {user.username}
          </div>
          <span
            className={clsx(
              'rounded-md bg-black px-2 py-1 text-sm font-medium opacity-75 ring-1 ring-inset',
              {
                'text-success-300 ring-success-600/50': true,
                'text-danger-300 ring-danger-600/50': false,
              }
            )}
          >
            online
          </span>
        </div>
        <div className="border-t border-neutral-100/25 p-3 text-neutral-300">
          {INTRO_TEXT}
          <p className="pt-2 text-danger-300">
            Selections cannot be changed once the tournament has started.
          </p>
        </div>
        <h2 className="p-2 text-lg font-semibold leading-7 text-neutral-100">Selection</h2>
        <div className="flex h-24 flex-row justify-center border-t border-neutral-100/25 align-middle">
          {status === 'loading' ? (
            <LoadingDots className="animate-out fade-out" size={16} />
          ) : (
            <ParticipantCard participant={selectedItem} />
          )}
        </div>
      </div>
      <div className="flex justify-end pt-3"></div>
    </div>
  );
};

export default SidePanel;
