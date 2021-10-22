import React, { useState } from 'react';
export default function AnswerChoice({ text, index, func, selectedIndex}:
    {
        text: string, index: number, func: (num: number) => Promise<void>, selectedIndex: number
    }) {
    const [count, setCount] = useState(0);
    return (
        <div className="mb-4">
            <button
                type="button"
                onClick={() => {
                    setCount(count + 1)
                    func(index)
                }
                }
                className={`text-left w-full ${selectedIndex === index ? "bg-blue-400 hover:bg-blue-500" : "bg-gray-50 hover:bg-gray-100"}  text-black font-bold py-2 px-4 rounded`}>
                {text}
            </button>
        </div>
    )
}