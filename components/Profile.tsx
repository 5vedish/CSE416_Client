import { CurrencyDollarIcon } from '@heroicons/react/solid';
import React from 'react';
import { ExpTrack } from './ExpTrack';
import Navbar from './Navbar';

const Profile = ({
    displayName,
    currency,
    level,
    experience,
}: {
    displayName: string;
    currency: number;
    level: number;
    experience: number;
}) => {
    return (
        <div className="h-screen overflow-hidden bg-gray-100">
            <Navbar />
            <div className="flex flex-row flex-inline w-full justify-center mt-16 font-logo lg:text-4xl items-center">
                <p>{displayName}</p>
                <CurrencyDollarIcon className="ml-4 w-10 h-10" />
                <p className="ml-1 text-lg">{currency}</p>
            </div>

            <div className="flex flex-inline mt-2 text-center justify-center">
                Lvl.<p className="font-bold">{level}</p>
            </div>

            <div className="relative pt-1 w-1/4 m-auto mt-2">
                <ExpTrack experience={experience} level={level} />
            </div>
        </div>
    );
};

export default Profile;
