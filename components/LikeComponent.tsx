import React, { useCallback, useEffect, useState } from 'react';
import { ThumbUpIcon } from '@heroicons/react/solid';
import { ThumbUpIcon as ThumbUpIconOutline } from '@heroicons/react/outline';
import { httpClient } from '../lib/axios';
import { useAuth } from './utils/AuthProvider';

export default function LikeComponent({
    id,
    showNumber,
}: {
    id: number;
    showNumber: boolean;
}) {
    const [likedPlatform, setLikedPlatform] = useState(false);
    const [numberLikes, setNumberLikes] = useState(0);
    const { user } = useAuth();

    const refetch = async () => {
        const platformId = id;
        if (platformId) {
            await httpClient
                .get<Platform>(`/platforms/${platformId}`)
                .then(async (result) => {
                    setNumberLikes(result.data.likers.length);
                    if (result.data) {
                        await httpClient
                            .get<any>(`/me`, { withCredentials: true })
                            .then((meResult) => {
                                for (
                                    let i = 0;
                                    i < result.data.likers.length;
                                    i++
                                ) {
                                    if (
                                        meResult.data.id ===
                                        result.data.likers[i].id
                                    ) {
                                        setLikedPlatform(true);
                                    }
                                }
                            })
                            .catch((e) => {
                                return;
                            });
                    }
                    console.log(result.data);
                })
                .catch((e) => {});
        }
    };

    const like = async () => {
        const result = await httpClient.put(`platforms/${id}/likes`);
        setLikedPlatform(true);
        await refetch();
    };

    const unlike = async () => {
        const result = await httpClient.delete(`platforms/${id}/likes`);
        setLikedPlatform(false);
        await refetch();
    };

    useEffect(() => {
        refetch();
    }, []);

    return (
        <div className="flex-shrink-0 flex pr-5">
            {showNumber ? numberLikes : <div />}
            <div className="content-center">
                <div className="inline-block">
                    <button>
                        {likedPlatform == true ? (
                            <ThumbUpIcon
                                className="ml-4 w-6 h-6 text-blue-500 hover:text-blue-900"
                                onClick={() => {
                                    console.log('User Unliked');
                                    unlike();
                                }}
                            />
                        ) : (
                            <ThumbUpIconOutline
                                className="ml-4 w-6 h-6 text-blue-500 hover:text-blue-900"
                                onClick={() => {
                                    console.log('User Liked');
                                    like();
                                }}
                            />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
