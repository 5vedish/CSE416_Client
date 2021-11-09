import Dropdown from './Dropdown';
import {
    SearchIcon,
    PlusIcon,
    CurrencyDollarIcon,
} from '@heroicons/react/solid';
import { useAuth } from './AuthProvider';
import Link from 'next/link';

export default function Navbar({ currency }: { currency: boolean }) {
    const { user } = useAuth();

    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 py-2 pl-6 pr-2">
            <div className="flex items-center flex-shrink-0 text-white mr-6 hover:text-gray-200">
                <Link href="/">
                    <a className="text-4xl font-logo">Qiz</a>
                </Link>
            </div>
            <div>
                <button>
                    <PlusIcon className="invisible h-5 w-5 text-white" />
                </button>
            </div>
            {/* <div className="shadow flex">
                <input
                    className="w-full rounded p-2"
                    type="text"
                    placeholder="Search..."
                />
                <button className="bg-white w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400">
                    <SearchIcon className="h-5 w-5 text-black" />
                </button>
            </div> */}
            {currency ? (
                <div>
                    <span>
                        <button>
                            <CurrencyDollarIcon className="h-5  w-5 text-white" />
                        </button>
                    </span>
                    <span className="align-text-bottom font-logo text-white">
                        69420
                    </span>
                </div>
            ) : (
                <div />
            )}
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
