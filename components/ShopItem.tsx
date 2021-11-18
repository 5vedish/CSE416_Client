import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { httpClient } from '../lib/axios';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { BadgeCheckIcon, CurrencyDollarIcon } from '@heroicons/react/solid';

export default function ShopItem() {
    const router = useRouter();
    return (
        <div className="inline-block px-3">
            <div className="flex justify-center py-8">
                <div>
                    {/* <div className="rounded-xl w-10/12 bg-white rounded px-4 pt-6 pb-8 mb-4"> */}
                    <div className="text-center font-logo cursor-pointer">
                        <BadgeCheckIcon className="object-fill border-black border-2 rounded-xl bg-white" />
                    </div>
                    <div className="text-center mt-8">
                        {/* referenced https://austencam.com/posts/tailwind-tidbit-vertically-align-icons-and-text-in-buttons */}
                        <button className="items-center bg-blue-500 text-white hover:text-white hover:bg-blue-700 font-logo rounded ">
                            <div className="inline-flex  px-3 py-2px-4 py-2 leading-5">
                                <CurrencyDollarIcon className="inline-block w-5 h-5 mr-1" />
                                499
                            </div>
                            {/* <div className="inline-flex  px-3 py-2px-4 leading-5">
                            Upgrade
                        </div> */}
                        </button>
                    </div>
                    <div className="flex-inline flex-row flex mt-2"></div>
                </div>
            </div>
        </div>
    );
}
