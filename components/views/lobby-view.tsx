/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
'use client';

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import {
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  UserCircleIcon,
  XMarkIcon as XMarkIconMini,
} from '@heroicons/react/20/solid';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useState } from 'react';

const invoice = {
  subTotal: '$8,800.00',
  tax: '$1,760.00',
  total: '$10,560.00',
  items: [
    {
      id: 1,
      title: 'Logo redesign',
      description: 'New logo and digital asset playbook.',
      hours: '20.0',
      rate: '$100.00',
      price: '$2,000.00',
    },
    {
      id: 2,
      title: 'Website redesign',
      description: 'Design and program new company website.',
      hours: '52.0',
      rate: '$100.00',
      price: '$5,200.00',
    },
    {
      id: 3,
      title: 'Business cards',
      description: 'Design and production of 3.5" x 2.0" business cards.',
      hours: '12.0',
      rate: '$100.00',
      price: '$1,200.00',
    },
    {
      id: 4,
      title: 'T-shirt design',
      description: 'Three t-shirt design concepts.',
      hours: '4.0',
      rate: '$100.00',
      price: '$400.00',
    },
  ],
};
const activity = [
  {
    id: 1,
    type: 'created',
    person: { name: 'Chelsea Hagon' },
    date: '7d ago',
    dateTime: '2023-01-23T10:32',
  },
  {
    id: 2,
    type: 'edited',
    person: { name: 'Chelsea Hagon' },
    date: '6d ago',
    dateTime: '2023-01-23T11:03',
  },
  {
    id: 3,
    type: 'sent',
    person: { name: 'Chelsea Hagon' },
    date: '6d ago',
    dateTime: '2023-01-23T11:24',
  },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  {
    id: 5,
    type: 'viewed',
    person: { name: 'Alex Curren' },
    date: '2d ago',
    dateTime: '2023-01-24T09:12',
  },
  {
    id: 6,
    type: 'paid',
    person: { name: 'Alex Curren' },
    date: '1d ago',
    dateTime: '2023-01-24T09:20',
  },
];
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

function Header() {
  return (
    <header className="relative isolate">
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
          <div
            style={{
              clipPath:
                'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
            }}
            className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-neutral-900/5" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
          <div className="flex items-center gap-x-6">
            <img
              alt=""
              src="https://tailwindui.com/plus/img/logos/48x48/tuple.svg"
              className="h-16 w-16 flex-none rounded-full ring-1 ring-neutral-900/10"
            />
            <h1>
              <div className="text-sm leading-6 text-neutral-300">
                Invoice <span className="text-neutral-200">#00011</span>
              </div>
              <div className="mt-1 text-base font-semibold leading-6 text-neutral-100">
                Tuple, Inc
              </div>
            </h1>
          </div>
          <div className="flex items-center gap-x-4 sm:gap-x-6">
            <button
              type="button"
              className="hidden text-sm font-semibold leading-6 text-neutral-100 sm:block"
            >
              Copy URL
            </button>
            <a
              href="#"
              className="hidden text-sm font-semibold leading-6 text-neutral-100 sm:block"
            >
              Edit
            </a>
            <a
              href="#"
              className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm shadow-neutral-100 hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Send
            </a>

            <Menu as="div" className="relative sm:hidden">
              <MenuButton className="-m-3 block p-3">
                <span className="sr-only">More</span>
                <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5 text-neutral-300" />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-neutral-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <button
                    type="button"
                    className="block w-full px-3 py-1 text-left text-sm leading-6 text-neutral-100 data-[focus]:bg-black"
                  >
                    Copy URL
                  </button>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-3 py-1 text-sm leading-6 text-neutral-100 data-[focus]:bg-black"
                  >
                    Edit
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Lobby() {
  const [selected, setSelected] = useState(moods[5]);

  return (
    <>
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* Invoice summary */}
          <div className="lg:col-start-3 lg:row-end-1">
            <h2 className="sr-only">Summary</h2>
            <div className="rounded-lg bg-black shadow-sm shadow-neutral-100 ring-1 ring-neutral-900/5">
              <dl className="flex flex-wrap">
                <div className="flex-auto pl-6 pt-6">
                  <dt className="text-sm font-semibold leading-6 text-neutral-100">Amount</dt>
                  <dd className="mt-1 text-base font-semibold leading-6 text-neutral-100">
                    $10,560.00
                  </dd>
                </div>
                <div className="flex-none self-end px-6 pt-4">
                  <dt className="sr-only">Status</dt>
                  <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                    Paid
                  </dd>
                </div>
                <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-neutral-100/5 px-6 pt-6">
                  <dt className="flex-none">
                    <span className="sr-only">Client</span>
                    <UserCircleIcon aria-hidden="true" className="h-6 w-5 text-neutral-400" />
                  </dt>
                  <dd className="text-sm font-medium leading-6 text-neutral-100">Alex Curren</dd>
                </div>
                <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                  <dt className="flex-none">
                    <span className="sr-only">Due date</span>
                    <CalendarDaysIcon aria-hidden="true" className="h-6 w-5 text-neutral-400" />
                  </dt>
                  <dd className="text-sm leading-6 text-neutral-300">
                    <time dateTime="2023-01-31">January 31, 2023</time>
                  </dd>
                </div>
                <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                  <dt className="flex-none">
                    <span className="sr-only">Status</span>
                    <CreditCardIcon aria-hidden="true" className="h-6 w-5 text-neutral-400" />
                  </dt>
                  <dd className="text-sm leading-6 text-neutral-300">Paid with MasterCard</dd>
                </div>
              </dl>
              <div className="mt-6 border-t border-neutral-100/5 px-6 py-6">
                <a href="#" className="text-sm font-semibold leading-6 text-neutral-100">
                  Download receipt <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Invoice */}
          <div className="-mx-4 px-4 py-8 shadow-sm shadow-neutral-100 ring-1 ring-neutral-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
            <h2 className="text-base font-semibold leading-6 text-neutral-100">Invoice</h2>
            <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
              <div className="sm:pr-4">
                <dt className="inline text-neutral-300">Issued on</dt>{' '}
                <dd className="inline text-neutral-200">
                  <time dateTime="2023-23-01">January 23, 2023</time>
                </dd>
              </div>
              <div className="mt-2 sm:mt-0 sm:pl-4">
                <dt className="inline text-neutral-300">Due on</dt>{' '}
                <dd className="inline text-neutral-200">
                  <time dateTime="2023-31-01">January 31, 2023</time>
                </dd>
              </div>
              <div className="mt-6 border-t border-neutral-100/5 pt-6 sm:pr-4">
                <dt className="font-semibold text-neutral-100">From</dt>
                <dd className="mt-2 text-neutral-300">
                  <span className="font-medium text-neutral-100">Acme, Inc.</span>
                  <br />
                  7363 Cynthia Pass
                  <br />
                  Toronto, ON N3Y 4H8
                </dd>
              </div>
              <div className="mt-8 sm:mt-6 sm:border-t sm:border-neutral-100/5 sm:pl-4 sm:pt-6">
                <dt className="font-semibold text-neutral-100">To</dt>
                <dd className="mt-2 text-neutral-300">
                  <span className="font-medium text-neutral-100">Tuple, Inc</span>
                  <br />
                  886 Walter Street
                  <br />
                  New York, NY 12345
                </dd>
              </div>
            </dl>
            <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
              <colgroup>
                <col className="w-full" />
                <col />
                <col />
                <col />
              </colgroup>
              <thead className="border-b border-neutral-200 text-neutral-100">
                <tr>
                  <th scope="col" className="px-0 py-3 font-semibold">
                    Projects
                  </th>
                  <th
                    scope="col"
                    className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
                  >
                    Hours
                  </th>
                  <th
                    scope="col"
                    className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
                  >
                    Rate
                  </th>
                  <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="border-b border-neutral-100">
                    <td className="max-w-0 px-0 py-5 align-top">
                      <div className="truncate font-medium text-neutral-100">{item.title}</div>
                      <div className="truncate text-neutral-300">{item.description}</div>
                    </td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-neutral-200 sm:table-cell">
                      {item.hours}
                    </td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-neutral-200 sm:table-cell">
                      {item.rate}
                    </td>
                    <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-neutral-200">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th
                    scope="row"
                    className="px-0 pb-0 pt-6 font-normal text-neutral-200 sm:hidden"
                  >
                    Subtotal
                  </th>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden px-0 pb-0 pt-6 text-right font-normal text-neutral-200 sm:table-cell"
                  >
                    Subtotal
                  </th>
                  <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-neutral-100">
                    {invoice.subTotal}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="pt-4 font-normal text-neutral-200 sm:hidden">
                    Tax
                  </th>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pt-4 text-right font-normal text-neutral-200 sm:table-cell"
                  >
                    Tax
                  </th>
                  <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-neutral-100">
                    {invoice.tax}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="pt-4 font-semibold text-neutral-100 sm:hidden">
                    Total
                  </th>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pt-4 text-right font-semibold text-neutral-100 sm:table-cell"
                  >
                    Total
                  </th>
                  <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-neutral-100">
                    {invoice.total}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="lg:col-start-3">
            {/* Activity feed */}
            <h2 className="text-sm font-semibold leading-6 text-neutral-100">Activity</h2>
            <ul role="list" className="mt-6 space-y-6">
              {activity.map((activityItem, activityItemIdx) => (
                <li key={activityItem.id} className="relative flex gap-x-4">
                  <div
                    className={clsx(
                      activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-6',
                      'absolute left-0 top-0 flex w-6 justify-center'
                    )}
                  >
                    <div className="w-px bg-neutral-200" />
                  </div>
                  {activityItem.type === 'commented' ? (
                    <>
                      <img
                        alt=""
                        src={activityItem.person.imageUrl}
                        className="relative mt-3 h-6 w-6 flex-none rounded-full bg-black"
                      />
                      <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-neutral-200">
                        <div className="flex justify-between gap-x-4">
                          <div className="py-0.5 text-xs leading-5 text-neutral-300">
                            <span className="font-medium text-neutral-100">
                              {activityItem.person.name}
                            </span>{' '}
                            commented
                          </div>
                          <time
                            dateTime={activityItem.dateTime}
                            className="flex-none py-0.5 text-xs leading-5 text-neutral-300"
                          >
                            {activityItem.date}
                          </time>
                        </div>
                        <p className="text-sm leading-6 text-neutral-300">
                          {activityItem.comment}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                        {activityItem.type === 'paid' ? (
                          <CheckCircleIcon
                            aria-hidden="true"
                            className="h-6 w-6 text-primary-600"
                          />
                        ) : (
                          <div className="h-1.5 w-1.5 rounded-full bg-neutral-100 ring-1 ring-neutral-300" />
                        )}
                      </div>
                      <p className="flex-auto py-0.5 text-xs leading-5 text-neutral-300">
                        <span className="font-medium text-neutral-100">
                          {activityItem.person.name}
                        </span>{' '}
                        {activityItem.type} the invoice.
                      </p>
                      <time
                        dateTime={activityItem.dateTime}
                        className="flex-none py-0.5 text-xs leading-5 text-neutral-300"
                      >
                        {activityItem.date}
                      </time>
                    </>
                  )}
                </li>
              ))}
            </ul>

            {/* New comment form */}
            <div className="mt-6 flex gap-x-3">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="h-6 w-6 flex-none rounded-full bg-black"
              />
              <form action="#" className="relative flex-auto">
                <div className="overflow-hidden rounded-lg pb-12 shadow-sm shadow-neutral-100 ring-1 ring-inset ring-neutral-300 focus-within:ring-2 focus-within:ring-primary-600">
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
                        className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-neutral-400 hover:text-neutral-300"
                      >
                        <PaperClipIcon aria-hidden="true" className="h-5 w-5" />
                        <span className="sr-only">Attach a file</span>
                      </button>
                    </div>
                    <div className="flex items-center">
                      <Listbox value={selected} onChange={setSelected}>
                        <Label className="sr-only">Your mood</Label>
                        <div className="relative">
                          <ListboxButton className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-neutral-400 hover:text-neutral-300">
                            <span className="flex items-center justify-center">
                              {selected.value === null ? (
                                <span>
                                  <FaceSmileIcon
                                    aria-hidden="true"
                                    className="h-5 w-5 flex-shrink-0"
                                  />
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
                                  <span className="ml-3 block truncate font-medium">
                                    {mood.name}
                                  </span>
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
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-neutral-100 shadow-sm shadow-neutral-100 ring-1 ring-inset ring-neutral-300 hover:bg-black"
                  >
                    Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
