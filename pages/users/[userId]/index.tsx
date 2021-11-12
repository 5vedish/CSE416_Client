import { CurrencyDollarIcon } from '@heroicons/react/solid';
import { NextPage } from 'next';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../components/utils/AuthProvider';
import Navbar from '../../../components/Navbar';
import Profile from '../../../components/Profile';
import { httpClient } from '../../../lib/axios';

const UserPage: NextPage = () => {
    const [displayName, setDisplayName] = useState('');
    const [currency, setCurrency] = useState(0);
    const [level, setLevel] = useState(0);
    const [experience, setExperience] = useState(0);

    const router = useRouter();

    const { user } = useAuth();
    // const user = 'sdasdas';

    const refetchUser = async () => {
        const { userId } = router.query;
        if (userId) {
            await httpClient
                .get(userId === 'me' ? '/me' : `/users/${userId}`)
                .then((result) => {
                    if (result.data) {
                        const { displayName, currency, level, experience } =
                            result.data;
                        setDisplayName(displayName);
                        setCurrency(currency);
                        setLevel(level);
                        setExperience(experience);
                    }
                })
                .catch((e) => {
                    return;
                });
        }
    };

    const memoizedRefetch = useCallback(refetchUser, [router.query]);
    useEffect(() => {
        (async () => {
            await memoizedRefetch();
        })();
    }, [router.query, memoizedRefetch]);
    return user ? (
        <Profile
            displayName={displayName}
            currency={currency}
            experience={experience}
            level={level}
        />
    ) : (
        <ErrorPage statusCode={404} />
    );
};

export default UserPage;
