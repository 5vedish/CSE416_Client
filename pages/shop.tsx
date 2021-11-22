import { BadgeCheckIcon, CurrencyDollarIcon } from '@heroicons/react/solid';
import { NextPage } from 'next';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../components/utils/AuthProvider';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import { httpClient } from '../lib/axios';
import Image from 'next/image';
import CreateButton from '../components/platform/CreateButton';
import Link from 'next/link';
import ShopItemWrapper from '../components/wrapper/ShopItemWrapper';
import ShopItem from '../components/ShopItem';
import ShopItemOwned from '../components/ShopItemOwned';

const BadgesPage: NextPage = () => {
    const [rewards, setRewards] = useState<Badge[]>([]);
    const [ownerName, setOwnerName] = useState('');
    const [rewardsOwned, setRewardsOwned] = useState<Badge[]>([]);

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
                    }>('/me/rewards')
                    .then((result) => {
                        console.log(result.data);
                        if (result.data) {
                            const { owner } = result.data;
                            const badges = result.data.badges
                                .filter(({ owned }) => !owned)
                                .map(({ badge }) => badge);
                            console.log(badges);
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

                await httpClient
                    .get<{
                        owner?: string;
                        badges: { badge: Badge; owned: boolean }[];
                    }>('/me/rewards')
                    .then((result) => {
                        console.log(result.data);
                        if (result.data) {
                            const { owner } = result.data;
                            const badges = result.data.badges
                                .filter(({ owned }) => owned)
                                .map(({ badge }) => badge);
                            setRewardsOwned(badges);
                            if (userId === 'me') {
                                setOwnerName(user.displayName);
                            } else if (owner) {
                                setOwnerName(owner);
                            } else {
                                setRewardsOwned([]);
                                setOwnerName('');
                            }
                        }
                    })
                    .catch((e) => {
                        setRewardsOwned([]);
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

            <ShopItemWrapper>
                {rewards.map((reward) => (
                    <ShopItem
                        refetch={refetchUser}
                        id={reward.id}
                        name={reward.name}
                        urlString={reward.imageUrl}
                        cost={500}
                        key={reward.id}
                    />
                ))}
                {/* <button onClick={buyBadge}> hi </button> */}
            </ShopItemWrapper>

            <ShopItemWrapper>
                {rewardsOwned.map((reward) => (
                    <ShopItemOwned
                        name={reward.name}
                        urlString={reward.imageUrl}
                        key={reward.id}
                    />
                ))}
            </ShopItemWrapper>

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

export default BadgesPage;
