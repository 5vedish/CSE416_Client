import { Menu } from '@headlessui/react';
import { ChevronDownIcon, UserIcon } from '@heroicons/react/solid';
import { useAuth } from './AuthProvider';
import Link from 'next/link';

export default function Dropdown() {
    const { logOut } = useAuth();
    return (
        <div className="">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full px-4 py-2 text-white rounded-md hover:text-gray-200">
                        <UserIcon className="w-10 h-10" />
                        <ChevronDownIcon className="w-10 h-10" />
                    </Menu.Button>
                </div>
                <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active
                                            ? 'text-gray-300'
                                            : 'text-gray-900'
                                    } group flex rounded-md items-center w-full px-3 py-3 text-sm`}
                                >
                                    Profile
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <Link href="/account">
                                    <a
                                        className={`${
                                            active
                                                ? 'text-gray-300'
                                                : 'text-gray-900'
                                        } group flex rounded-md items-center w-full px-3 py-3 text-sm`}
                                    >
                                        Account
                                    </a>
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active
                                            ? 'text-gray-300'
                                            : 'text-gray-900'
                                    } group flex rounded-md items-center w-full px-3 py-3 text-sm`}
                                    onClick={logOut}
                                >
                                    Sign Out
                                </button>
                            )}
                        </Menu.Item>
                    </div>{' '}
                </Menu.Items>
            </Menu>
        </div>
    );
}
