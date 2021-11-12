import { NextPage } from 'next';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Menu } from '@headlessui/react';
import { httpClient } from '../../lib/axios';
import { useRouter } from 'next/router';

const EditQuizControls: NextPage = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [difficulty, setDifficulty] = useState('Medium');
    const [totalTime, setTotalTime] = useState(0);

    const { quizId } = router.query;
    console.log(quizId);

    const handleEdit = async (e: React.FormEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        console.log(e.currentTarget.value);
    };

    const handleTimeEdit = async (e: React.FormEvent<HTMLInputElement>) => {
        setTotalTime(parseInt(e.currentTarget.value));
        console.log(e.currentTarget.value);
    };

    const handleSave = async () => {
        await httpClient.put('/quizzes', {
            quizId: quizId,
            title: title,
            totalTime: totalTime,
            difficulty: difficulty,
        });
    };

    return (
        <div className="flex flex-col h-auto w-1/4 justify-center">
            <input
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mb-8"
                onBlur={handleEdit}
                defaultValue={'Quiz Title'}
                type="text"
            ></input>

            <input
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mb-8"
                onBlur={handleTimeEdit}
                defaultValue={'Time Remaining'}
                type="text"
            ></input>

            <div className="flex flex-row w-full justify-center items-center">
                <div className="">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full px-4 py-2 text-white rounded-md hover:text-gray-200 border bg-blue-500 font-bold">
                                Set Difficulty
                            </Menu.Button>
                        </div>
                        <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="px-1 py-1 ">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active
                                                    ? 'text-gray-300'
                                                    : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-3 py-3 text-sm hover:text-green-500`}
                                            onClick={() => {
                                                setDifficulty('Easy');
                                            }}
                                        >
                                            Easy
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active
                                                    ? 'text-gray-300'
                                                    : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-3 py-3 text-sm hover:text-yellow-500`}
                                            onClick={() => {
                                                setDifficulty('Medium');
                                            }}
                                        >
                                            Medium
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active
                                                    ? 'text-gray-300'
                                                    : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-3 py-3 text-sm hover:text-red-500`}
                                            onClick={() => {
                                                setDifficulty('Hard');
                                            }}
                                        >
                                            Hard
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>{' '}
                        </Menu.Items>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default EditQuizControls;
