import { BadgeCheckIcon, CurrencyDollarIcon } from '@heroicons/react/solid';
import { NextPage } from 'next';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../components/utils/AuthProvider';
import Navbar from '../../../components/Navbar';
import Profile from '../../../components/Profile';
import { httpClient } from '../../../lib/axios';
import Image from 'next/image';
import CreateButton from '../../../components/platform/CreateButton';
import Link from 'next/link';

const UserPage: NextPage = () => {
    const [rewards, setRewards] = useState<Badge[]>([]);
    const [ownerName, setOwnerName] = useState('');

    const router = useRouter();

    const { user } = useAuth();

    const refetchUser = async () => {
        if (user) {
            const { userId } = router.query;
            if (userId) {
                await httpClient
                    .get<{
                        owner?: string;
                        badges: { badge: Badge; owned: boolean }[];
                    }>(userId === 'me' ? '/me/rewards' : `/rewards/${userId}`)
                    .then((result) => {
                        console.log(result.data);
                        if (result.data) {
                            const { owner } = result.data;
                            const badges = result.data.badges
                                .filter(({ owned }) => owned)
                                .map(({ badge }) => badge);
                            setRewards(badges);
                            if (userId === 'me') {
                                setOwnerName(user.displayName);
                            } else if (owner) {
                                setOwnerName(owner);
                            } else {
                                setRewards([]);
                                setOwnerName('');
                            }
                        }
                    })
                    .catch((e) => {
                        setRewards([]);
                    });
            }
        }
    };

    const memoizedRefetch = useCallback(refetchUser, [router.query, user]);

    useEffect(() => {
        (async () => {
            await memoizedRefetch();
        })();
    }, [router.query, memoizedRefetch]);

    return user ? (
        <div className="h-screen overflow-hidden bg-gray-100">
            <Navbar />
            <div className="flex flex-row flex-inline w-full justify-center mt-16 font-logo lg:text-4xl items-center">
                <p>{ownerName}&apos;s badges: </p>
            </div>
            <ul className="grid grid-cols-6 gap-4 m-10">
                {rewards.map((reward) => (
                    <li key={reward.id}>
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="flex justify-center px-4 py-5 sm:px-6">
                                <span className="font-semibold mr-1">
                                    {reward.name}
                                </span>
                            </div>
                            <div className="px-4 py-5 sm:p-6 flex justify-center">
                                <Image
                                    src={reward.imageUrl}
                                    alt="me"
                                    width="72"
                                    height="72"
                                />
                            </div>
                            <div className="flex justify-center px-4 py-4 sm:px-6">
                                {reward.description}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex items-center justify-center">
                <Link passHref href={`/users/${router.query.userId}`}>
                    <div className="m-10 space-x-2">
                        <a className="bg-gray-300 hover:bg-gray-400 cursor-pointer text-black font-bold py-2 px-4 rounded">
                            Back to profile
                        </a>
                    </div>
                </Link>
            </div>
        </div>
    ) : (
        <ErrorPage statusCode={404} />
    );
};

export default UserPage;
