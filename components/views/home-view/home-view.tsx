import { GridList, GridListItem } from '@components/grid-list';
import { INTRO_TEXT } from '@lib/constants';
import { AppUser, Participant } from '@lib/types';
import { ListData, useListData } from '@react-stately/data';
import clsx from 'clsx';
import Image from 'next/image';
import { HtmlHTMLAttributes, useState } from 'react';

export interface SelectableParticipantList {
  list: ListData<Participant>;
  onSelect: (item: Participant) => void;
}

export function SelectableParticipantList({ list, onSelect }: SelectableParticipantList) {
  return (
    <GridList
      className="grid min-w-64 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"
      selectedKeys={list.selectedKeys}
      onSelectionChange={list.setSelectedKeys}
      selectionMode="single"
    >
      {list.items.map((item) => (
        <GridListItem
          key={item.slug}
          onAction={() => onSelect(item)}
          className="relative flex items-center space-x-3 rounded-lg border border-neutral-100/25 bg-neutral-900 p-1 shadow-sm focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:border-neutral-100/35 lg:p-2"
        >
          <div className="flex-shrink-0">
            <Image
              alt=""
              width={192}
              height={192}
              src={item.imageSquare.url}
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div className="min-w-0 flex-1">
            <a href="#" className="focus:outline-none">
              <span aria-hidden="true" className="absolute inset-0" />
              <p className="whitespace-nowrap text-sm font-medium text-neutral-100">
                {item.name}
              </p>
              <p className="truncate whitespace-nowrap text-sm text-neutral-300">{item.title}</p>
            </a>
          </div>
        </GridListItem>
      ))}
    </GridList>
  );
}

export interface SidePanelProps extends HtmlHTMLAttributes<HTMLDivElement> {
  user: AppUser;
  selectedItem: Participant | null;
}

const SidePanel = ({ user, selectedItem, ...props }: SidePanelProps) => {
  return (
    <div {...props}>
      <h2 className="px-3 pt-3 text-base font-semibold leading-6 text-neutral-100">User</h2>
      <dl className="flex flex-wrap">
        <div className="flex-auto px-3">
          <dd className="text-base font-semibold leading-6 text-neutral-100">{user.username}</dd>
        </div>
        <div className="flex-none self-end px-3 pb-2">
          <dt className="sr-only">Status</dt>
          <dd
            className={clsx('rounded-md bg-black text-xs font-medium ring-1 ring-inset', {
              'text-success-300 ring-success-600/25': user.status === 'online',
              'text-danger-300 ring-danger-600/25': user.status === 'offline',
            })}
          >
            {user.status}
          </dd>
        </div>
      </dl>
      <div className="border-t border-neutral-100/25 px-3 py-3 text-neutral-200">
        {INTRO_TEXT}
      </div>
      <div className="flex flex-row border-t border-neutral-100/25 p-6">
        <p className="flex-1 text-sm font-semibold leading-6 text-neutral-200">
          Selected <span aria-hidden="true">&rarr;</span>
        </p>
        <span className="text-neutral-200">{selectedItem ? selectedItem.name : 'none'}</span>
      </div>
    </div>
  );
};

export interface HomeViewProps {
  participants: Participant[];
  // rounds: Round[];
  user: AppUser | null;
}
export default function HomeView({ participants, user }: HomeViewProps) {
  const [selection, setSelection] = useState<Participant | null>(
    participants.find((p) => p.slug === user?.selection) ?? null
  );
  const list = useListData<Participant>({
    initialItems: participants,
    initialSelectedKeys: selection?.slug ? new Set([selection.slug]) : new Set(),
    getKey: (item: Participant) => item.slug,
  });

  // console.log('selection = ', selection);

  // const handleSelect = useCallback(
  //   (item: Participant) => {
  //     // console.log('item = ', item);
  //     // setSelectedKeys(sel);
  //     setSelection(item);
  //   },
  //   [setSelection]
  // );

  return (
    <div className="mx-auto flex h-full w-full max-w-7xl flex-row px-4 py-8 sm:px-6 lg:px-8">
      <div className="grow">
        <div className="relative h-full w-full overflow-hidden p-2">
          <SelectableParticipantList list={list} onSelect={setSelection} />
        </div>
      </div>
      <div className="h-full w-72 flex-none pl-4 sm:pl-6 lg:block">
        <h2 className="sr-only">Summary</h2>
        {user && (
          <SidePanel
            user={user}
            selectedItem={selection ?? null}
            className="rounded-lg bg-neutral-900 shadow-sm ring-1 ring-neutral-100/25"
          />
        )}
      </div>
    </div>
  );
}
