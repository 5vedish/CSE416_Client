import { NextPage } from 'next';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/solid';

const OwnProfile: NextPage = () => {
    const userInfo = {
        displayName: 'Jan Wik',
        currency: 69420,
        level: 54,
        experience: 55000,
    };

    useEffect(() => {
        //use dummy data above
        //fetch data here
    }, []);
    return (
        <div className="h-screen overflow-hidden bg-gray-100">
            <Navbar />
            <div className="flex flex-row flex-inline w-full justify-center mt-16 font-logo lg:text-4xl items-center">
                <p>{userInfo.displayName}</p>
                <CurrencyDollarIcon className="ml-4 w-10 h-10" />
                <p className="ml-1 text-lg">{userInfo.currency}</p>
            </div>

            <div className="flex flex-inline mt-2 text-center justify-center">
                Lvl.<p className="font-bold">{userInfo.level}</p>
            </div>

            <div className="relative pt-1 w-1/4 m-auto mt-2">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div
                        style={{ width: '10%' }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    ></div>
                </div>
                <div className="flex mb-2 items-center justify-center">
                    <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-gray-200">
                            {userInfo.experience}/
                            {(userInfo.level + 1) * 100000}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnProfile;
