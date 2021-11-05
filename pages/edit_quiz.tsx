import { NextPage } from 'next';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Menu } from '@headlessui/react';

const EditQuiz: NextPage = () => {
    const [title, setTitle] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [totalTime, setTotalTime] = useState(0);

    const handleEdit = async (e: React.FormEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        console.log(e.currentTarget.value);
    };

    const handleTimeEdit = async (e: React.FormEvent<HTMLInputElement>) => {
        setTotalTime(parseInt(e.currentTarget.value));
        console.log(e.currentTarget.value);
    };

    return (
        <div className="h-screen overflow-hidden bg-gray-100">
            <Navbar />

            <div className="flex items-center justify-center mt-8">
                <input
                    className="appearance-none border-2 border-gray-200 rounded w-1/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mr-8"
                    onBlur={handleEdit}
                    defaultValue={'Quiz Title'}
                    type="text"
                ></input>
                <div className="">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full px-4 py-2 text-white rounded-md hover:text-gray-200 border rounded-lg bg-blue-500 font-bold">
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

            <div className="flex items-center justify-center mt-8">
                <input
                    className="appearance-none border-2 border-gray-200 rounded w-1/8 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mr-8"
                    onBlur={handleEdit}
                    defaultValue={'Time Remaining'}
                    type="text"
                ></input>
            </div>
        </div>
    );
};

export default EditQuiz;
