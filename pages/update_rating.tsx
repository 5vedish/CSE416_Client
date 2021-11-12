import type { NextPage } from 'next';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import GridWrapper from '../components/wrapper/GridWrapper';
import Navbar from '../components/Navbar';
import FormField from '../components/forms/FormField';
import FormSubmit from '../components/forms/FormSubmit';
import PasswordField from '../components/forms/PasswordField';
import { httpClient } from '../lib/axios';
import router from 'next/router';
import { useAuth } from '../components/AuthProvider';

type AccountInputs = {
    displayName: string;
    email: string;
};

type PasswordInputs = {
    password: string;
    confirmPassword: string;
};

const UpdateRating: NextPage = () => {
    const accountForm = useForm<AccountInputs>();
    const passwordForm = useForm<PasswordInputs>();

    const { user, updateUser } = useAuth();

    const onSubmit: SubmitHandler<AccountInputs | PasswordInputs> = async (
        data,
    ) => {
        await Promise.all([router.push('/'), router.push('/')]);
        console.log('DATA');
        console.log(data);
        // https://stackoverflow.com/questions/35612428/call-async-await-functions-in-parallel
    };

    return (
        <div className="min-h-full">
            <Navbar currency={false} />
            <div className="w-full h-screen bg-gray-100">
                <div className="flex justify-center py-10">
                    <form
                        onSubmit={accountForm.handleSubmit(onSubmit)}
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    >
                        <GridWrapper>
                            <FormField
                                form={accountForm}
                                formKey="platform"
                                label="Display Name"
                                required="Display Name is required"
                                defaultValue={user?.displayName}
                            />
                            <FormField
                                form={accountForm}
                                formKey="rating"
                                label="Email"
                                required="Email is required"
                                defaultValue={user?.email}
                            />
                        </GridWrapper>
                        <FormSubmit label="Update" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateRating;
