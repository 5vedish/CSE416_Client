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

    const refetchBadges = async () => {
        console.log(user);
        if (user) {
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
                        const badgesOwned = result.data.badges
                            .filter(({ owned }) => owned)
                            .map(({ badge }) => badge);
                        setRewardsOwned(badgesOwned);
                    }
                })
                .catch((e) => {
                    setRewards([]);
                    setRewardsOwned([]);
                });
        }
    };

    const memoizedRefetch = useCallback(refetchBadges, [user, rewards]);

    useEffect(() => {
        (async () => {
            await memoizedRefetch();
        })();
    }, [router.query, memoizedRefetch, user]);

    return user ? (
        <div className="h-screen overflow-hidden bg-gray-100">
            <Navbar />

            <ShopItemWrapper>
                {rewards.map((reward) => (
                    <ShopItem
                        refetch={memoizedRefetch}
                        id={reward.id}
                        name={reward.name}
                        urlString={reward.imageUrl}
                        cost={reward.cost}
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
        </div>
    ) : (
        <ErrorPage statusCode={404} />
    );
};

export default BadgesPage;
