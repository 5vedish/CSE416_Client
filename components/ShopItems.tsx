import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import CreateButton from './quiz/CreateButton';
import QuizCard from './quiz/QuizCard';
import QuizWrapper from './wrapper/QuizWrapper';
import PlatformBanner from './platform/PlatformBanner';
import ShopItem from './ShopItem';
import ShopItemWrapper from './wrapper/ShopItemWrapper';
import { httpClient } from '../lib/axios';

export default function ShopItems() {
    const [check, idkcheck] = useState(0);
    const [shop, setShop] = useState<{
        Shop: {
            id: number;
            badgeId: number;
            tier: number;
            imageUrl: string;
        }[];
    }>({
        Shop: [],
    });

    useEffect(() => {
        (async () => {
            const response = await httpClient.get<any>('/me', {
                withCredentials: true,
            });

            console.log(response.data.badges);

            setShop({
                ...shop,
                Shop: response.data.badges,
            });
            console.log(shop);
        })();
    }, [check]);

    return (
        <div className="min-h-full">
            <div className="w-full h-screen bg-gray-100">
                <ShopItemWrapper>
                    {Object.values(shop).map((results, idx) =>
                        results.map((result) => (
                            // check that result.tier === 0  to display the badge
                            <ShopItem
                                title="2"
                                time={2}
                                questions={2}
                                difficulty={'EASY'}
                                key={result.id}
                                // refetch={refetch}
                            />
                        )),
                    )}
                </ShopItemWrapper>
            </div>
        </div>
    );
}
