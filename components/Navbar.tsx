import Dropdown from './Dropdown';
import {
    SearchIcon,
    PlusIcon,
    CurrencyDollarIcon,
    ShoppingCartIcon,
} from '@heroicons/react/solid';
import { useAuth } from './utils/AuthProvider';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import CreatePlatformModal from './platform/CreatePlatformModal';
import { useModal } from './utils/ModalProvider';
import { httpClient } from '../lib/axios';
import { AxiosResponse } from 'axios';

export default function Navbar() {
    const { user } = useAuth();

    const { setIsOpen } = useModal();

    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 py-2 pl-6 pr-2">
            <div className="flex items-center flex-shrink-0 text-white mr-6 hover:text-gray-200">
                <Link href="/">
                    <a className="text-4xl font-logo">Qiz</a>
                </Link>
            </div>
            <div>
                {user && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-gray-100 hover:bg-gray-300 text-blue-500 font-bold py-1 px-1 rounded inline-flex items-center"
                    >
                        <PlusIcon className=" h-7 w-7 text-blue-500 " />
                    </button>
                )}
            </div>

            {user && (
                <div className="inline-flex flex-row justify-center items-center">
                    <span>
                        <CurrencyDollarIcon className="h-5 w-5 text-white mr-2" />
                    </span>
                    <span className="align-text bottom font-logo text-white mr-2">
                        {user.currency}
                    </span>
                    <span>
                        <Link href={`/shop`} passHref>
                            <a>
                                <ShoppingCartIcon className="w-12 h-12 text-white cursor-pointer hover:text-gray-200" />
                            </a>
                        </Link>
                    </span>
                </div>
            )}

            <div className="invisible shadow flex">
                <input
                    className="w-full rounded p-2"
                    type="text"
                    placeholder="Search..."
                />
                <button className="bg-white w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400">
                    <SearchIcon className="h-5 w-5 text-black" />
                </button>
            </div>

            {/* <div>
                <a href="#" className="invisible text-white">
                    Shop
                </a>
            </div> */}
            <div>
                {user ? (
                    <Dropdown />
                ) : (
                    <div className="space-x-4 text-white mr-4">
                        <Link href="/login">
                            <a className="font-semibold hover:text-gray-300">
                                Sign In
                            </a>
                        </Link>

                        <Link href="/register">
                            <a
                                onClick={() => {}}
                                className="border-2 border-white hover:border-gray-300 hover:text-gray-300 font-semibold rounded-md px-2 py-1"
                            >
                                Sign Up
                            </a>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
