import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon as XMarkIconMini,
} from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useState } from 'react';

const moods = [
  {
    name: 'Excited',
    value: 'excited',
    icon: FireIcon,
    iconColor: 'text-white',
    bgColor: 'bg-red-500',
  },
  {
    name: 'Loved',
    value: 'loved',
    icon: HeartIcon,
    iconColor: 'text-white',
    bgColor: 'bg-pink-400',
  },
  {
    name: 'Happy',
    value: 'happy',
    icon: FaceSmileIcon,
    iconColor: 'text-white',
    bgColor: 'bg-green-400',
  },
  {
    name: 'Sad',
    value: 'sad',
    icon: FaceFrownIcon,
    iconColor: 'text-white',
    bgColor: 'bg-yellow-400',
  },
  {
    name: 'Thumbsy',
    value: 'thumbsy',
    icon: HandThumbUpIcon,
    iconColor: 'text-white',
    bgColor: 'bg-blue-500',
  },
  {
    name: 'I feel nothing',
    value: null,
    icon: XMarkIconMini,
    iconColor: 'text-neutral-400',
    bgColor: 'bg-transparent',
  },
];

const activity = [
  {
    id: 1,
    type: 'comment',
    person: { name: 'Eduardo Benz', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ',
    date: '6d ago',
  },
  {
    id: 4,
    type: 'comment',
    person: { name: 'Jason Meyers', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
    date: '2h ago',
  },
];

function NewMessageInput() {
  const [selected, setSelected] = useState(moods[5]);
  return (
    <form action="#" className="relative flex-auto">
      <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-neutral-300 focus-within:ring-2 focus-within:ring-primary-600">
        <label htmlFor="comment" className="sr-only">
          Add your comment
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={2}
          placeholder="Add your comment..."
          className="block w-full resize-none border-0 bg-transparent py-1.5 text-neutral-100 placeholder:text-neutral-400 focus:ring-0 sm:text-sm sm:leading-6"
          defaultValue={''}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
        <div className="flex items-center space-x-5">
          <div className="flex items-center">
            <button
              type="button"
              className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-neutral-400 hover:text-neutral-500"
            >
              <PaperClipIcon aria-hidden="true" className="h-5 w-5" />
              <span className="sr-only">Attach a file</span>
            </button>
          </div>
          <div className="flex items-center">
            <Listbox value={selected} onChange={setSelected}>
              <Label className="sr-only">Your mood</Label>
              <div className="relative">
                <ListboxButton className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-neutral-400 hover:text-neutral-500">
                  <span className="flex items-center justify-center">
                    {selected.value === null ? (
                      <span>
                        <FaceSmileIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
                        <span className="sr-only">Add your mood</span>
                      </span>
                    ) : (
                      <span>
                        <span
                          className={clsx(
                            selected.bgColor,
                            'flex h-8 w-8 items-center justify-center rounded-full'
                          )}
                        >
                          <selected.icon
                            aria-hidden="true"
                            className="h-5 w-5 flex-shrink-0 text-white"
                          />
                        </span>
                        <span className="sr-only">{selected.name}</span>
                      </span>
                    )}
                  </span>
                </ListboxButton>

                <ListboxOptions
                  transition
                  className="absolute z-10 -ml-6 mt-1 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:ml-auto sm:w-64 sm:text-sm"
                >
                  {moods.map((mood) => (
                    <ListboxOption
                      key={mood.value}
                      value={mood}
                      className="relative cursor-default select-none bg-white px-3 py-2 data-[focus]:bg-neutral-100"
                    >
                      <div className="flex items-center">
                        <div
                          className={clsx(
                            mood.bgColor,
                            'flex h-8 w-8 items-center justify-center rounded-full'
                          )}
                        >
                          <mood.icon
                            aria-hidden="true"
                            className={clsx(mood.iconColor, 'h-5 w-5 flex-shrink-0')}
                          />
                        </div>
                        <span className="ml-3 block truncate font-medium">{mood.name}</span>
                      </div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>
        </div>
        <button
          type="submit"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50"
        >
          Comment
        </button>
      </div>
    </form>
  );
}

// function MessageFeed() {
//   return (
//     <div className="mt-8 flow-root">
//       <ul role="list" className="-mb-8">
//         {activity.map((activityItem, activityItemIdx) => (
//           <li key={activityItem.id}>
//             <div className="relative pb-8">
//               {activityItemIdx !== activity.length - 1 ? (
//                 <span
//                   aria-hidden="true"
//                   className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-neutral-200"
//                 />
//               ) : null}
//               <div className="relative flex items-start space-x-3">
//                 {activityItem.type === 'comment' ? (
//                   <>
//                     <div className="relative">
//                       <img
//                         alt=""
//                         src={activityItem.imageUrl}
//                         className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-400 ring-8 ring-white"
//                       />

//                       <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
//                         <ChatBubbleLeftEllipsisIcon
//                           aria-hidden="true"
//                           className="h-5 w-5 text-neutral-400"
//                         />
//                       </span>
//                     </div>
//                     <div className="min-w-0 flex-1">
//                       <div>
//                         <div className="text-sm">
//                           <a
//                             href={activityItem.person.href}
//                             className="font-medium text-neutral-100"
//                           >
//                             {activityItem.person.name}
//                           </a>
//                         </div>
//                         <p className="mt-0.5 text-sm text-neutral-400">
//                           Commented {activityItem.date}
//                         </p>
//                       </div>
//                       <div className="mt-2 text-sm text-neutral-200">
//                         <p>{activityItem.comment}</p>
//                       </div>
//                     </div>
//                   </>
//                 ) : null}
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default function HomeView() {
  return (
    <div className="mx-auto flex h-full w-full max-w-7xl flex-row px-4 py-8 sm:px-6 lg:px-8">
      <div className="grow">
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-dashed border-neutral-400 opacity-75">
          <svg className="absolute inset-0 h-full w-full stroke-neutral-100/15" fill="none">
            <defs>
              <pattern
                id="pattern-1526ac66-f54a-4681-8fb8-0859d412f251"
                x="0"
                y="0"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
              </pattern>
            </defs>
            <rect
              stroke="none"
              fill="url(#pattern-1526ac66-f54a-4681-8fb8-0859d412f251)"
              width="100%"
              height="100%"
            ></rect>
          </svg>
        </div>
      </div>
      <div className="hidden h-full w-96 flex-none pl-4 sm:pl-6 lg:block">
        <h2 className="sr-only">Summary</h2>
        <div className="rounded-lg bg-neutral-900 shadow-sm ring-1 ring-neutral-100/15">
          <dl className="flex flex-wrap">
            <div className="flex-auto pl-6 pt-6">
              <dd className="mt-1 text-base font-semibold leading-6 text-neutral-100">amiller</dd>
            </div>
            <div className="flex-none self-end px-6 pt-4">
              <dt className="sr-only">Status</dt>
              <dd className="rounded-md bg-black px-2 py-1 text-xs font-medium text-success-300 ring-1 ring-inset ring-success-600/20">
                online
              </dd>
            </div>
          </dl>
          <div className="mt-6 border-t border-neutral-100/15 p-3">
            <NewMessageInput />
            {/* <MessageFeed /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
