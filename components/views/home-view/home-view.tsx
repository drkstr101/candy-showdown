import { GridList, GridListItem } from '@components/grid-list';
import { AppUser, Participant } from '@lib/types';
import { useListData } from '@react-stately/data';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import SidePanel from './side-panel';

export interface HomeViewProps {
  participants: Participant[];
  user: AppUser | null;
}
export default function HomeView({ participants, user }: HomeViewProps) {
  const [selection, setSelection] = useState<Participant | null>(
    participants.find((p) => p.slug === user?.selection) ?? null
  );
  const list = useListData<Participant>({
    initialItems: participants,
    initialSelectedKeys: selection ? new Set([selection.slug]) : new Set(),
    getKey: (item: Participant) => item.slug,
  });

  // const { setSelectedKeys } = list;
  const handleSelection = useCallback(
    (item: Participant) => {
      // console.log(`handleSelection(${item.slug})`);
      // list.setSelectedKeys(new Set([item.slug]));
      setSelection(item);
    },
    [setSelection]
  );

  return (
    <div className="mx-auto flex h-full w-full max-w-7xl flex-row px-4 py-8 sm:px-6 lg:px-8">
      <div className="grow">
        <div className="relative h-full w-full overflow-hidden p-2">
          <GridList<Participant>
            className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"
            selectedKeys={list.selectedKeys}
            onSelectionChange={list.setSelectedKeys}
            selectionMode="single"
          >
            {list.items.map((item) => (
              <GridListItem
                key={item.slug}
                value={item}
                onAction={() => handleSelection(item)}
                className={selection?.slug === item.slug ? '' : ''}
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
                    <p className="truncate whitespace-nowrap text-sm text-neutral-300">
                      {item.title}
                    </p>
                  </a>
                </div>
              </GridListItem>
            ))}
          </GridList>
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
