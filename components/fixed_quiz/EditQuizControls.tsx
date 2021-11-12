import { NextPage } from 'next';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Menu } from '@headlessui/react';
import { httpClient } from '../../lib/axios';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormSubmit from '../forms/FormSubmit';
import FormField from '../forms/FormField';
import FormHeader from '../forms/FormHeader';
import { AxiosResponse } from 'axios';

type Inputs = {
    quizTitle: string;
    time: number;
    difficulty: string;
};

export default function EditQuizControls({
    quizId,
    quizTitle,
    time,
    difficulty,
    refetch,
}: {
    quizId: number;
    quizTitle: string;
    time: number;
    difficulty: string;
    refetch: () => Promise<void>;
}) {
    const form = useForm<Inputs>();
    const { handleSubmit } = form;

    const onSubmit: SubmitHandler<Inputs> = async ({
        quizTitle,
        time,
        difficulty,
    }: Inputs) => {
        console.log(quizTitle);
        console.log(time);
        console.log(difficulty);
        const response: AxiosResponse<{ id: number }> = await httpClient.put(
            `/quizzes/${quizId}`,
            {
                title: quizTitle,
                totalTime: time,
                difficulty: difficulty,
            },
        );

        refetch();
    };

    const handleTitle = async (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === '') {
            alert('Error: Quiz Title is empty!');
            return;
        }

        await httpClient.put(`/quizzes/${quizId}`, {
            title: e.currentTarget.value,
            difficulty: difficulty,
            maxTime: time,
        });

        await refetch();
    };

    const handleTime = async (e: React.FormEvent<HTMLInputElement>) => {
        const newTime = parseInt(e.currentTarget.value);
        alert(typeof newTime);
        if (newTime < 0 || newTime > 9999) {
            alert('Error: Time out of bounds!');
            return;
        }

        await httpClient.put(`/quizzes/${quizId}`, {
            title: quizTitle,
            difficulty: difficulty,
            totalTime: newTime,
        });

        await refetch();
    };

    const handleDifficulty = async (newDifficulty: String) => {
        await httpClient.put(`/quizzes/${quizId}`, {
            title: quizTitle,
            difficulty: newDifficulty,
            time: time,
        });

        await refetch();
    };

    return (
        // <div className="flex flex-col h-auto w-1/4 justify-center">
        //     <input
        //         className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mb-8"
        //         onBlur={handleTitle}
        //         defaultValue={quizTitle}
        //         type="text"
        //     ></input>

        //     <input
        //         className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mb-8"
        //         onBlur={handleTime}
        //         defaultValue={time}
        //         type="number"
        //         min="1"
        //         max="9999"
        //         autoFocus
        //     ></input>

        //     <div className="flex flex-row w-full justify-center items-center">
        //         <div className="">
        //             <Menu as="div" className="relative inline-block text-left">
        //                 <div>
        //                     <Menu.Button className="inline-flex w-full px-4 py-2 text-white rounded-md hover:text-gray-200 border bg-blue-500 font-bold">
        //                         Set Difficulty: {difficulty}
        //                     </Menu.Button>
        //                 </div>
        //                 <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
        //                     <div className="px-1 py-1 ">
        //                         <Menu.Item>
        //                             {({ active }) => (
        //                                 <button
        //                                     className={`${
        //                                         active
        //                                             ? 'text-gray-300'
        //                                             : 'text-gray-900'
        //                                     } group flex rounded-md items-center w-full px-3 py-3 text-sm hover:text-green-500`}
        //                                     onClick={() => {
        //                                         handleDifficulty('EASY');
        //                                     }}
        //                                 >
        //                                     Easy
        //                                 </button>
        //                             )}
        //                         </Menu.Item>
        //                     </div>
        //                     <div className="px-1 py-1">
        //                         <Menu.Item>
        //                             {({ active }) => (
        //                                 <button
        //                                     className={`${
        //                                         active
        //                                             ? 'text-gray-300'
        //                                             : 'text-gray-900'
        //                                     } group flex rounded-md items-center w-full px-3 py-3 text-sm hover:text-yellow-500`}
        //                                     onClick={() => {
        //                                         handleDifficulty('MEDIUM');
        //                                     }}
        //                                 >
        //                                     Medium
        //                                 </button>
        //                             )}
        //                         </Menu.Item>
        //                     </div>
        //                     <div className="px-1 py-1">
        //                         <Menu.Item>
        //                             {({ active }) => (
        //                                 <button
        //                                     className={`${
        //                                         active
        //                                             ? 'text-gray-300'
        //                                             : 'text-gray-900'
        //                                     } group flex rounded-md items-center w-full px-3 py-3 text-sm hover:text-red-500`}
        //                                     onClick={() => {
        //                                         handleDifficulty('HARD');
        //                                     }}
        //                                 >
        //                                     Hard
        //                                 </button>
        //                             )}
        //                         </Menu.Item>
        //                     </div>{' '}
        //                 </Menu.Items>
        //             </Menu>
        //         </div>
        //     </div>
        // </div>
        <form
            className="relative bg-white rounded max-w-sm py-10 px-20"
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormField
                form={form}
                formKey="quizTitle"
                label="Quiz Title"
                defaultValue={quizTitle}
            />
            <FormField
                form={form}
                formKey="difficulty"
                label="Difficulty"
                defaultValue={difficulty}
            />
            <FormField
                form={form}
                formKey="time"
                label="Time Remaining (s)"
                isNumber
                defaultValue={String(time)}
            />

            <div className="inline-flex space-x-2 my-4 items-center">
                <FormSubmit label="Save Changes" />
            </div>
        </form>
    );
}
