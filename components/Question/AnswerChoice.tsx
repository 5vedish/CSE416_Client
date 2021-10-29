import React, { useState } from 'react';
export default function AnswerChoice({
    text,
    index,
    selectChoice,
    selectedIndex,
    editChoices,
    refetch,
}: {
    text: string;
    index: number;
    selectChoice: (num: number) => void;
    selectedIndex: number;
    editChoices: (newChoice: string, index: number) => Promise<void>;
    refetch: () => Promise<void>;
}) {
    const [count, setCount] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = async (e: React.FormEvent<HTMLInputElement>) => {
        editChoices(e.currentTarget.value, index);

        setIsEditing(false);
        await refetch();
    };
    return (
        <div className="mb-4">
            <button
                type="button"
                onClick={() => {
                    setCount(count + 1);
                    selectChoice(index);
                }}
                className={`text-left w-full ${
                    selectedIndex === index
                        ? 'bg-blue-400 hover:bg-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                }  text-black font-bold py-2 px-4 rounded`}
            >
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
                        onClick={() => setIsEditing(true)}
                    >
                        {text}
                    </label>
                )}
            </button>
        </div>
    );
}
