import React, { useState } from 'react';
export default function DeleteQuiz({
    deleteQuiz,
}: {
    deleteQuiz: () => Promise<void>;
}) {
    return (
        <div className="mb-4 space-x-2">
            <button
                type="button"
                onClick={() => {
                    console.log('Creating...');
                    deleteQuiz();
                }}
                className="bg-red-300 hover:bg-red-400 text-black font-bold py-2 px-4 rounded"
            >
                Delete Quiz
            </button>
        </div>
    );
}
