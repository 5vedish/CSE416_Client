import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, AdjustmentsIcon } from '@heroicons/react/solid';

import clsx from 'clsx';

export function UserSortDropdown({
    setCriterion,
    setDesc,
}: {
    setCriterion: React.Dispatch<
        React.SetStateAction<
            'displayName' | 'currency' | 'level' | 'experience'
        >
    >;
    setDesc: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                    <AdjustmentsIcon
                        className="text-gray-400 -ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                    />
                    Sort
                    <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={clsx(
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                        'block px-4 py-2 text-sm',
                                    )}
                                    onClick={() => {
                                        setCriterion('displayName');
                                        setDesc(false);
                                    }}
                                >
                                    Display name ascending
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={clsx(
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                        'block px-4 py-2 text-sm',
                                    )}
                                    onClick={() => {
                                        setCriterion('displayName');
                                        setDesc(true);
                                    }}
                                >
                                    Display name descending
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={clsx(
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                        'block px-4 py-2 text-sm',
                                    )}
                                    onClick={() => {
                                        setCriterion('currency');
                                        setDesc(false);
                                    }}
                                >
                                    Currency ascending
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={clsx(
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                        'block px-4 py-2 text-sm',
                                    )}
                                    onClick={() => {
                                        setCriterion('currency');
                                        setDesc(true);
                                    }}
                                >
                                    Currency descending
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={clsx(
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                        'block px-4 py-2 text-sm',
                                    )}
                                    onClick={() => {
                                        setCriterion('level');
                                        setDesc(false);
                                    }}
                                >
                                    Level ascending
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={clsx(
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                        'block px-4 py-2 text-sm',
                                    )}
                                    onClick={() => {
                                        setCriterion('level');
                                        setDesc(true);
                                    }}
                                >
                                    Level descending
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={clsx(
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                        'block px-4 py-2 text-sm',
                                    )}
                                    onClick={() => {
                                        setCriterion('experience');
                                        setDesc(false);
                                    }}
                                >
                                    Experience ascending
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={clsx(
                                        active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                        'block px-4 py-2 text-sm',
                                    )}
                                    onClick={() => {
                                        setCriterion('experience');
                                        setDesc(true);
                                    }}
                                >
                                    Experience descending
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
