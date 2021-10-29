import React, { useState } from 'react';
import Navbar from '../Navbar';
export default function CreateQuiz({
    createQuiz,
}: {
    createQuiz: () => Promise<void>;
}) {
    return (
        <div className="mb-4 space-x-2">
            <Navbar />
            <button
                type="button"
                onClick={() => {
                    console.log('Creating...');
                    createQuiz();
                }}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
                Create Quiz
            </button>
        </div>
    );
}
