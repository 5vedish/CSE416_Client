import { NextPage } from 'next';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../components/utils/AuthProvider';
import Navbar from '../../../components/Navbar';
import { httpClient } from '../../../lib/axios';

const UserStatisticsPage: NextPage = () => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        (async () => {
            const { data } = await httpClient.get('/statistics');
            console.log(data);
        })();
    }, []);

    return <Navbar></Navbar>;
};

export default UserStatisticsPage;
