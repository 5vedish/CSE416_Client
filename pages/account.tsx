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
import { useAuth } from '../components/utils/AuthProvider';

type AccountInputs = {
    displayName: string;
    email: string;
};

type PasswordInputs = {
    password: string;
    confirmPassword: string;
};

const UpdateContact: NextPage = () => {
    const accountForm = useForm<AccountInputs>();
    const passwordForm = useForm<PasswordInputs>();

    const { user, updateUser } = useAuth();

    const onSubmit: SubmitHandler<AccountInputs | PasswordInputs> = async (
        data,
    ) => {
        await updateUser(data);
    };

    return (
        <div className="min-h-full">
            <Navbar />
            <div className="w-full h-screen bg-gray-100">
                <div className="flex justify-center py-10">
                    <form
                        onSubmit={accountForm.handleSubmit(onSubmit)}
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    >
                        <GridWrapper>
                            <FormField
                                form={accountForm}
                                formKey="displayName"
                                label="Display Name"
                                required="Display Name is required"
                                defaultValue={user?.displayName}
                            />
                            <FormField
                                form={accountForm}
                                formKey="email"
                                label="Email"
                                required="Email is required"
                                defaultValue={user?.email}
                            />
                        </GridWrapper>
                        <FormSubmit label="Update" />
                    </form>
                </div>

                <div className="flex justify-center">
                    <form
                        onSubmit={passwordForm.handleSubmit(onSubmit)}
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    >
                        <GridWrapper>
                            <PasswordField
                                form={passwordForm}
                                formKey="password"
                                label="New Password"
                                required="New password is required"
                                eyeButton
                            />

                            <PasswordField
                                form={passwordForm}
                                formKey="confirmPassword"
                                label="Confirm Password"
                                required="Please confirm your password"
                                validate={(p) =>
                                    p === passwordForm.watch('password') ||
                                    'Passwords must match'
                                }
                            />
                        </GridWrapper>
                        <FormSubmit label="Update" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateContact;
