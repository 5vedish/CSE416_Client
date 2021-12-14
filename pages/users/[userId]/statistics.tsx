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

    const [lifetime, setLifetime] = useState<number[]>([]);
    const [easy, setEasy] = useState<number[]>([]);
    const [med, setMed] = useState<number[]>([]);
    const [hard, setHard] = useState<number[]>([]);

    useEffect(() => {
        (async () => {
            if (user) {
                const result: AxiosResponse<Statistics> = await httpClient.get(
                    '/statistics',
                );
                console.log('STATISTICS');
                console.log(result.data);
                if (result.data) {
                    const { lifetime } = result.data;
                    const { easy } = result.data;
                    const { med } = result.data;
                    const { hard } = result.data;

                    setLifetime(lifetime);
                    setEasy(easy);
                    setMed(med);
                    setHard(hard);
                }
            }
        })();
    }, []);

    return (
        <div className="h-screen overflow-scroll bg-gray-100">
            <Navbar />
            <div className="flex flex-col items-center w-screen">
                <div className="flex flex-col w-1/3 mt-16 bg-white border border-gray-200 sm:border-4 rounded-lg p-4">
                    <label className={`${headerStyle}`}>
                        {' '}
                        {user?.displayName + "'s "} Stats{' '}
                    </label>
                    <hr className={`${dividerStyle}`}></hr>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Lifetime Quizzes Taken:</p>
                        <p className={`font-bold`}>{lifetime[0]}</p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Lifetime Questions Answered:</p>
                        <p className="font-bold">{lifetime[1]}</p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Lifetime Questions Correct:</p>
                        <p className="font-bold">{lifetime[2]}</p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Average Score:</p>
                        <p className="font-bold">
                            {((lifetime[2] / lifetime[1]) * 500).toFixed(2)} (
                            {((lifetime[2] / lifetime[1]) * 100).toFixed(2)}%)
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Time Spent Taking Quizzes:</p>
                        <p className="font-bold">{lifetime[3]} seconds</p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Average Time Per Quiz:</p>
                        <p className="font-bold">
                            {(lifetime[3] / lifetime[0]).toFixed(2)} seconds
                        </p>
                    </div>
                    {/* BREAK */}
                    <label className={`${headerStyle}`}> Easy </label>
                    <hr className={`${dividerStyle}`}></hr>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Quizzes Taken:</p>
                        <p className="font-bold text-green-500">
                            {easy[0]} (
                            {((easy[0] / lifetime[0]) * 100).toFixed(0)}%)
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Questions Answered:</p>
                        <p className="font-bold text-green-500">
                            {easy[1]} (
                            {((easy[1] / lifetime[1]) * 100).toFixed(0)}%)
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Questions Correct:</p>
                        <p className="font-bold text-green-500">
                            {easy[2]} (
                            {((easy[2] / lifetime[2]) * 100).toFixed(0)}%)
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Average Score:</p>
                        <p className="font-bold text-green-500">
                            {((easy[2] / easy[1]) * 500).toFixed(2)} (
                            {((easy[2] / easy[1]) * 100).toFixed(2)}%)
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Time Spent:</p>
                        <p className="font-bold text-green-500">
                            {easy[3]} seconds (
                            {((easy[3] / lifetime[3]) * 100).toFixed(0)}%)
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Average Time:</p>
                        <p className="font-bold text-green-500">
                            {(easy[3] / easy[0]).toFixed(2)} seconds
                        </p>
                    </div>
                    {/* BREAK */}
                    <label className={`${headerStyle}`}> Medium </label>
                    <hr className={`${dividerStyle}`}></hr>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Quizzes Taken:</p>
                        <p className="font-bold text-yellow-500">
                            {med[0]} (
                            {((med[0] / lifetime[0]) * 100).toFixed(0)}%)
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Questions Answered:</p>
                        <p className="font-bold text-yellow-500">
                            {med[1]} (
                            {((med[1] / lifetime[1]) * 100).toFixed(0)}%)
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Questions Correct:</p>
                        <p className="font-bold text-yellow-500">
                            {med[2]} (
                            {((med[2] / lifetime[2]) * 100).toFixed(0)}%)
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Average Score:</p>
                        <p className="font-bold text-yellow-500">
                            {((med[2] / med[1]) * 500).toFixed(2)} (
                            {((med[2] / med[1]) * 100).toFixed(2)}%)
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Time Spent:</p>
                        <p className="font-bold text-yellow-500">
                            {med[3]} seconds (
                            {((med[3] / lifetime[3]) * 100).toFixed(0)}%)
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Average Time:</p>
                        <p className="font-bold text-yellow-500">
                            {(med[3] / med[0]).toFixed(2)} seconds
                        </p>
                    </div>
                    {/* BREAK */}
                    <label className={`${headerStyle}`}> Hard </label>
                    <hr className={`${dividerStyle}`}></hr>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Quizzes Taken:</p>
                        <p className="font-bold text-red-500">
                            {hard[0]} (
                            {((hard[0] / lifetime[0]) * 100).toFixed(0)}%)
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Questions Answered:</p>
                        <p className="font-bold text-red-500">
                            {hard[1]} (
                            {((hard[1] / lifetime[1]) * 100).toFixed(0)}%)
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Questions Correct:</p>
                        <p className="font-bold text-red-500">
                            {hard[2]} (
                            {((hard[2] / lifetime[2]) * 100).toFixed(0)}%)
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Average Score:</p>
                        <p className="font-bold text-red-500">
                            {((hard[2] / hard[1]) * 500).toFixed(2)} (
                            {((hard[2] / hard[1]) * 100).toFixed(2)}%)
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Time Spent:</p>
                        <p className="font-bold text-red-500">
                            {hard[3]} seconds (
                            {((hard[3] / lifetime[3]) * 100).toFixed(0)}%)
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Average Time:</p>
                        <p className="font-bold text-red-500">
                            {(hard[3] / hard[0]).toFixed(2)} seconds
                        </p>
                    </div>

                    {/*
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Medium Quizzes Taken:</p>
                        <p className="font-bold text-yellow-500">{}</p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Hard Quizzes Taken:</p>
                        <p className="font-bold text-red-500">{}</p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Total Time Spent Taking Quizzes:</p>
                        <p className="font-bold">{} seconds</p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">
                            Average Time Spent Taking One Quiz:
                        </p>
                        <p className="font-bold">{} seconds</p>
                    </div> */}
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

                <Link passHref href={`/users/${router.query.userId}`}>
                    <div className="m-10 space-x-2">
                        <a className="bg-gray-300 hover:bg-gray-400 cursor-pointer text-black font-bold py-2 px-4 rounded">
                            Back to profile
                        </a>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default UserStatisticsPage;
