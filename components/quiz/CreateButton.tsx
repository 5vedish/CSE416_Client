import React, { useState } from 'react';
import Navbar from '../Navbar';
export default function CreateButton({
    label,
    create,
}: {
    label: string;
    create: () => Promise<void>;
}) {
    return (
        <div className="m-10 space-x-2">
            <button
                type="button"
                onClick={create}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
                {label}
            </button>
        </div>
    );
}
