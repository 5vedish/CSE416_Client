import React, { useState } from 'react';
export default function Submit({
    choice,
    func,
    setCorrect,
    setChosen,
}: {
    choice: number;
    func: (num: number) => Promise<void>;
    setCorrect: any;
    setChosen: any;
}) {
    return (
        <div className="mb-4 space-x-2">
            <button
                type="button"
                onClick={() => {
                    func(choice);
                    console.log('Submitting...');
                }}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
                Submit
            </button>
            <button
                type="button"
                onClick={() => {
                    setCorrect(null);
                    setChosen(-1);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
                Reset
            </button>
        </div>
    );
}
