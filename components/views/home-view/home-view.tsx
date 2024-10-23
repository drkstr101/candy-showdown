import { GridList, GridListItem } from '@components/grid-list';
import { useAppContext } from '@components/organisms/ui-provider';
import { Participant } from '@lib/types';
import { useListData } from '@react-stately/data';
import { Selection } from '@react-types/shared';
import Image from 'next/image';
import { useMemo } from 'react';
import SidePanel from './side-panel';

export default function HomeView() {
  const { participantsBySlug, user, selectedItem, setSelectedItem, status } = useAppContext();
  const participants = useMemo(() => Object.values(participantsBySlug), [participantsBySlug]);
  const list = useListData<Participant>({
    initialItems: participants,
    initialSelectedKeys: selectedItem ? new Set([selectedItem.slug]) : new Set(),
    getKey: (item: Participant) => item.slug,
  });

  function handleSelection(keys: Selection): void {
    if (keys === 'all') throw new Error('Unsupported selection mode.');
    // keys is now instanceof Set
    list.setSelectedKeys(keys);
    const slug = keys.values().toArray().at(0) ?? null;
    if (slug) {
      setSelectedItem(participantsBySlug[slug]);
    }
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-7xl flex-row px-4 py-8 sm:px-6 lg:px-8">
      <div className="grow">
        <div className="relative h-full w-full min-w-64 overflow-hidden sm:min-w-72">
          <GridList<Participant>
            className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"
            selectionMode="single"
            selectionBehavior="replace"
            items={list.items}
            onSelectionChange={handleSelection}
            selectedKeys={list.selectedKeys}
            defaultSelectedKeys={list.selectedKeys}
            aria-label="Tournament participants"
          >
            {list.items.map((item) => (
              <GridListItem
                id={item.slug}
                key={item.slug}
                value={item}
                textValue={item.name}
                aria-label={item.name}
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
                    <p className="truncate whitespace-nowrap text-sm text-neutral-400">
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
            selectedItem={selectedItem ?? null}
            status={status}
            className="rounded-lg bg-neutral-900 shadow-sm ring-1 ring-neutral-100/25"
          />
        )}
      </div>
    </div>
  );
}
