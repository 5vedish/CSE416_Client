import { NextPage } from 'next';
import React, { memo, useCallback, useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import { intervalToDuration, formatDuration, add } from 'date-fns';
import Link from 'next/link';
import { httpClient } from '../../../lib/axios';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import Quiz from '../../../components/quiz/Quiz';
import { useAuth } from '../../../components/utils/AuthProvider';
import Platform from '../../../components/platform/Platform';

const PlatformPage: NextPage = () => {
    const router = useRouter();
    const [platformId, setPlatformId] = useState(-1);
    const [likedPlatform, setLikedPlatform] = useState(false);
    const [platformData, setPlatformData] = useState<Platform | null>(null);
    const { user } = useAuth();

    const refetchPlatform = async () => {
        const { platformId } = router.query;
        if (platformId) {
            await httpClient
                .get<Platform>(`/platforms/${platformId}`)
                .then(async (result) => {
                    if (result.data) {
                        setPlatformData(result.data);

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
                            });
                    }
                    setPlatformId(parseInt(platformId.toString()));
                    console.log(result.data);
                })
                .catch((e) => {
                    setPlatformId(-1);
                    setPlatformData(null);
                });
        }
    };

    const createQuiz = async () => {
        console.log('CREATE QUIZ FROM FRONTEND');
        console.log(platformId);
        if (platformId > 0) {
            await httpClient.post<{ platformId: number }>('/quizzes', {
                platformId: platformId,
            });
            await refetchPlatform();
        }
    };

    const memoizedRefetch = useCallback(refetchPlatform, [router.query]);

    useEffect(() => {
        (async () => {
            await memoizedRefetch();
        })();
    }, [router.query, memoizedRefetch]);

    return (
        <div className="h-screen overflow-hidden">
            <Navbar />

            <div
                className={`h-full ${
                    !user && 'bg-welcome bg-no-repeat bg-center bg-blue-500'
                }`}
            >
                {user &&
                    (platformData ? (
                        <Platform
                            id={platformData.id}
                            quizzes={platformData.quizzes}
                            title={platformData.title}
                            author={platformData.owner}
                            rating={platformData.averageRating}
                            yourRating={platformData.yourRating}
                            createQuiz={createQuiz}
                            refetch={memoizedRefetch}
                            liked={likedPlatform}
                        />
                    ) : (
                        'Platform not found'
                    ))}
            </div>
        </div>
    );
};

export default PlatformPage;
