import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { httpClient } from '../lib/axios';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { BadgeCheckIcon, CurrencyDollarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useAuth } from './utils/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

export default function ShopItem({
    urlString,
    cost,
    name,
    id,
    refetch,
}: {
    urlString: string;
    cost: number;
    name: string;
    id: number;
    refetch: () => Promise<void>;
}) {
    const router = useRouter();

    const { getUser: refetchUser } = useAuth();

    const purchase = async () => {
        const result = await httpClient
            .put('/me/rewards', { badgeId: id })
            .catch((err: Error) => {
                toast('Not Enough Currency');
            });
        await refetch();
        await refetchUser();
    };

    console.log(cost);

    return (
        <div className="inline-block px-3 bg-white overflow-hidden shadow rounded-lg mx-12">
            <div className="flex justify-center py-4">
                <div className="text-center font-semibold">
                    {name}

                    {/* <div className="rounded-xl w-10/12 bg-white px-4 pt-6 pb-8 mb-4"> */}
                    <div className="text-center font-logo cursor-pointer py-4">
                        <Image
                            src={urlString}
                            alt="me"
                            width="72"
                            height="72"
                        />
                    </div>
                    <div className="text-center">
                        {/* referenced https://austencam.com/posts/tailwind-tidbit-vertically-align-icons-and-text-in-buttons */}
                        <button
                            className="items-center bg-blue-500 text-white hover:text-white hover:bg-blue-700 font-logo rounded "
                            onClick={purchase}
                        >
                            <div className="inline-flex  px-3 py-2px-4 py-2 leading-5">
                                <CurrencyDollarIcon className="inline-block w-5 h-5 mr-1" />
                                {cost}
                            </div>
                            {/* <div className="inline-flex  px-3 py-2px-4 leading-5">
                            Upgrade
                        </div> */}
                        </button>
                    </div>
                    <div className="flex-inline flex-row flex mt-2"></div>
                </div>
                <Toaster />
                {/* referenced react hot toast documentation */}
            </div>
        </div>
    );
}
