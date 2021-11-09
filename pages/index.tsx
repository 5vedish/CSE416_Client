import axios, { AxiosResponse } from 'axios';
import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import Quiz from '../components/quiz/Quiz';
import CreateButton from '../components/quiz/CreateButton';
import { httpClient } from '../lib/axios';
import { useAuth } from '../components/AuthProvider';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Platform from '../components/platform/Platform';

const Home: NextPage = () => {
    const [platformId, setPlatformId] = useState(-1);
    const [platformData, setPlatformData] = useState<Platform | null>(null);
    const { user } = useAuth();

    const refetchPlatform = async () => {
        if (platformId > 0) {
            await httpClient
                .get<Platform>(`/platforms/${platformId}`)
                .then((result) => {
                    if (result.data) {
                        setPlatformData(result.data);
                    }
                })
                .catch((e) => {
                    setPlatformId(-1);
                    setPlatformData(null);
                });
        }
    };

    const refetchPlatformId = async () => {
        await httpClient
            .get<{ platformId: number }>('/me/platform')
            .then((result) => {
                if (result.data) {
                    setPlatformId(result.data.platformId);
                }
            })
            .catch((e) => {
                setPlatformId(-1);
            });
    };

    const createPlatform = async () => {
        await httpClient.post<{ title: string }>('/platforms', {
            title: 'New Platform',
        });
        await refetchPlatformId();
    };

    const deletePlatform = async () => {
        if (platformId < 0) return;
        await httpClient.delete(`/platforms/${platformId}`);
        setPlatformId(-1);
    };

    const createQuiz = async () => {
        if (platformId > 0) {
            await httpClient.post<{ platformId: number }>('/quizzes', {
                platformId: platformId,
            });
            await refetchPlatform();
        }
    };

    const memoizedRefetch = useCallback(refetchPlatform, [platformId]);

    useEffect(() => {
        (async () => {
            await refetchPlatformId();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await memoizedRefetch();
        })();
    }, [platformId, memoizedRefetch]);

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
                            quizzes={platformData.quizzes}
                            title={platformData.title}
                            author={platformData.owner}
                            createQuiz={createQuiz}
                            rating={platformData.rating}
                        />
                    ) : (
                        <CreateButton
                            create={createPlatform}
                            label="Create Platform"
                        />
                    ))}
            </div>
        </div>
    );
};

export default Home;
