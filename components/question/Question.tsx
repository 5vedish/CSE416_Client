import { httpClient } from '../../lib/axios';
import React, { useState } from 'react';

export default function Question({
    text,
    id,
    refetch,
    choices,
    correctChoice,
}: {
    text: string;
    id: number;
    refetch: () => Promise<void>;
    choices: string[];
    correctChoice: number;
}) {
    const [isEditing, setEditing] = useState(false);

    const handleEdit = async (e: React.FormEvent<HTMLInputElement>) => {
        console.log(id);
        await httpClient.put(`/questions/${id}`, {
            question: e.currentTarget.value,
            choices,
            correctChoice,
        });
        setEditing(false);
        await refetch();
    };

    return (
        <div className="mb-4">
            {isEditing ? (
                <input
                    className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    onBlur={handleEdit}
                    defaultValue={text}
                    type="text"
                    autoFocus={true}
                ></input>
            ) : (
                <label
                    className="text-center block text-gray-700 text-lg font-bold mb-2"
                    onClick={() => setEditing(true)}
                >
                    {text}
                </label>
            )}
        </div>
    );
}
