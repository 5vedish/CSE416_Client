import { CurrencyDollarIcon } from '@heroicons/react/solid';
import React from 'react';
import { ExpTrack } from './ExpTrack';
import Navbar from './Navbar';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { httpClient } from '../lib/axios';
import { useAuth } from './utils/AuthProvider';

const Profile = ({
    displayName,
    currency,
    level,
    experience,
}: {
    displayName: string;
    currency: number;
    level: number;
    experience: number;
}) => {
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
                    }>(userId === 'me' ? '/me/rewards' : `/rewards/${userId}`)
                    .then((result) => {
                        console.log(result.data);
                        if (result.data) {
                            const { owner } = result.data;
                            const badges = result.data.badges
                                .filter(({ owned }) => owned)
                                .map(({ badge }) => badge);
                            setRewardsOwned(badges);
                            if (userId === 'me') {
                            } else if (owner) {
                            } else {
                                setRewardsOwned([]);
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

    console.log(rewardsOwned);

    return (
        <div className="h-screen overflow-hidden bg-gray-100">
            <Navbar />
            <div className="flex flex-row flex-inline w-full justify-center mt-16 font-logo lg:text-4xl items-center">
                <p>{displayName}</p>
                <CurrencyDollarIcon className="ml-4 w-10 h-10" />
                <p className="ml-1 text-lg">{currency}</p>
            </div>

            <div className="flex flex-inline mt-2 text-center justify-center">
                Lvl.<p className="font-bold">{level}</p>
            </div>

            <div className="relative pt-1 w-1/4 m-auto mt-2">
                <ExpTrack experience={experience} level={level} />
            </div>

            <div className="flex-col inline-flex mt-8 h-auto w-full justify-center items-center">
                <p className="font-bold text-2xl">Badges</p>

                <div className="inline-flex w-1/4 h-full mt-4 justify-between items-center border-2 p-4 rounded-lg border-gray-300">
                    {rewardsOwned.map((reward, index) => (
                        <img
                            key={index}
                            className="w-24 h-24 "
                            src={reward.imageUrl}
                        />
                    ))}
                </div>

                <button className="mt-4 w-32 h-16 bg-blue-500 rounded-md">
                    <p className="font-bold text-white text-lg"> Statistics</p>
                </button>
            </div>
        </div>
    );
};

export default Profile;
