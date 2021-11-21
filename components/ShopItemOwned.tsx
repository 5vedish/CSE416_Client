import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { httpClient } from '../lib/axios';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { BadgeCheckIcon, CurrencyDollarIcon } from '@heroicons/react/solid';
import Image from 'next/image';

export default function ShopItem({
    urlString,
    name,
}: {
    urlString: string;
    name: string;
}) {
    const router = useRouter();
    return (
        <div className="inline-block px-3 bg-gray-300 overflow-hidden shadow rounded-lg">
            <div className="flex justify-center py-4 text-center">
                <div className="font-semibold">
                    {name}

                    {/* <div className="rounded-xl w-10/12 bg-white rounded px-4 pt-6 pb-8 mb-4"> */}
                    <div className="text-center font-logo cursor-pointer py-4">
                        <Image
                            src={urlString}
                            alt="me"
                            width="72"
                            height="72"
                        />
                    </div>
                    <div className="flex-inline flex-row flex mt-2"></div>
                </div>
            </div>
        </div>
    );
}
