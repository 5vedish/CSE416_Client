import React from 'react';
import { NextPage } from 'next';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormWrapper from '../components/wrapper/FormWrapper';

import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useAuth } from '../components/AuthProvider';
import PasswordField from '../components/forms/PasswordField';
import FormField from '../components/forms/FormField';
import FormHeader from '../components/forms/FormHeader';
import FormSubmit from '../components/forms/FormSubmit';

type Inputs = {
    email: string;
    password: string;
};

const Login: NextPage = () => {
    const form = useForm<Inputs>();

    const { handleSubmit } = form;

    const { logIn } = useAuth();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        logIn(data);
    };

    return (
        <FormWrapper>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <FormHeader label="Login" />
                <FormField
                    form={form}
                    formKey="email"
                    required="Email required"
                    label="Email"
                />

                <PasswordField
                    form={form}
                    formKey="password"
                    label="Password"
                    eyeButton
                />
                <FormSubmit label="Login" />
            </form>
        </FormWrapper>
    );
};

export default Login;
