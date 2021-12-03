import { NextPage } from 'next';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../components/utils/AuthProvider';
import Navbar from '../../../components/Navbar';
import { httpClient } from '../../../lib/axios';
import { AxiosResponse } from 'axios';
import Link from 'next/dist/client/link';

const UserStatisticsPage: NextPage = () => {
    const headerStyle = 'font-logo text-lg text-center';
    const dividerStyle = 'h-1 bg-black mb-2';
    const statStyle = 'inline-flex justify-self-start text-sm';

    const router = useRouter();
    const { user } = useAuth();

    const [averageScore, setAverageScore] = useState(-1);
    const [lifetimeQuizzes, setLifetimeQuizzes] = useState(-1);
    const [diffs, setDiffs] = useState<number[]>([]);

    useEffect(() => {
        (async () => {
            const result: AxiosResponse<Statistics> = await httpClient.get(
                '/statistics',
            );
            console.log('STATISTICS2');
            if (result.data) {
                const { questionsCorrect } = result.data.averageScore;
                const { quizAttempts } = result.data.lifetimeQuizzes;

                const diffs = result.data.diffs;

                const diffsList = [diffs.e, diffs.m, diffs.h];

                setAverageScore(questionsCorrect * 500);
                setLifetimeQuizzes(quizAttempts);
                setDiffs(diffsList);
            }
        })();
    }, []);

    return (
        <div className="h-screen overflow-hidden bg-gray-100">
            <Navbar />
            <div className="flex flex-col items-center w-screen">
                <div className="flex flex-col w-1/3 mt-16 bg-white border border-gray-200 sm:border-4 rounded-lg p-4">
                    <label className={`${headerStyle}`}>
                        {' '}
                        {user?.displayName + "'s "} Stats{' '}
                    </label>
                    <hr className={`${dividerStyle}`}></hr>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Average Quiz Score:</p>
                        <p className={`font-bold`}>{averageScore.toFixed(2)}</p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Lifetime Quizzes Taken:</p>
                        <p className="font-bold">{lifetimeQuizzes}</p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Easy Quizzes Taken:</p>
                        <p className="font-bold text-green-500">{diffs[0]}</p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Medium Quizzes Taken:</p>
                        <p className="font-bold text-yellow-500">{diffs[1]}</p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Hard Quizzes Taken:</p>
                        <p className="font-bold text-red-500">{diffs[2]}</p>
                    </div>
                    {/* 
                <div className={`${statStyle}`}>
                    <p className="mr-2">Questions Correct:</p>
                    <p
                        className={`${
                            questionsCorrect / totalQuestions > 0.5
                                ? 'text-blue-500'
                                : 'text-red-500'
                        } font-bold`}
                    >
                        {questionsCorrect}/{totalQuestions}
                    </p>
                </div>
                <div className={`${statStyle}`}>
                    <p className="mr-2">Time Elapsed:</p>
                    <p className="text-blue-500 font-bold">{elapsed}</p>
                </div>
                <div className={`${statStyle}`}>
                    <p className="mr-2">Score:</p>
                    <p className="text-blue-500 font-bold">{0}</p>
                </div>
                <div className={`${statStyle}`}>
                    <p className="mr-2">Previous Best:</p>
                    <p className="text-blue-500 font-bold">{0}</p>
                </div>
                <label className={`${headerStyle}`}> Stats </label>
                <hr className={`${dividerStyle}`}></hr>
                <div className={`${statStyle}`}>
                    <p className="mr-2">Currency Earned:</p>
                    <p className={`font-bold`}>{questionsCorrect * 500}</p>
                </div>
                <div className={`${statStyle}`}>
                    <p className="mr-2">Experience Gained:</p>
                    <p className={`font-bold`}>{questionsCorrect * 500}</p>
                </div> */}
                </div>

                <button className="mt-8 p-2 bg-blue-500 border rounded-lg shadow-lg font-bold text-white">
                    <Link href="/">Return To Platform</Link>
                </button>
            </div>
        </div>
    );
};

export default UserStatisticsPage;
