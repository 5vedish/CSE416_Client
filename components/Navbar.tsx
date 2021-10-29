import Dropdown from './Dropdown';
import { SearchIcon, PlusIcon } from '@heroicons/react/solid';

export default function Navbar() {
    // referenced https://v1.tailwindcss.com/components/navigation
    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="text-4xl font-logo">Qiz</span>
            </div>
            <div>
                <button>
                    <PlusIcon className="invisible h-5 w-5 text-white" />
                </button>
            </div>
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
            <div>
                <a href="#" className="invisible text-white">
                    Shop
                </a>
            </div>
            <div>
                <Dropdown />
            </div>
        </nav>
    );
}
