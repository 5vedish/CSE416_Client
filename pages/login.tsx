import React from 'react';
import { NextPage } from 'next';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormWrapper from '../components/forms/FormWrapper';

import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useAuth } from '../components/utils/AuthProvider';
import PasswordField from '../components/forms/PasswordField';
import FormField from '../components/forms/FormField';
import FormHeader from '../components/forms/FormHeader';
import FormSubmit from '../components/forms/FormSubmit';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Inputs = {
    email: string;
    password: string;
};

const Login: NextPage = () => {
    const router = useRouter();
    const form = useForm<Inputs>();

    const { handleSubmit } = form;

    const { logIn } = useAuth();

    const [loginError, setLoginError] = useState('');

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const status = await logIn(data);
        if (status !== 200) {
            setLoginError('Error logging in. Please try again.');
        } else {
            router.push('/');
        }
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

                <Link href="/forgot_password" passHref>
                    <div className="text-gray-400 hover:underline cursor-pointer select-none mb-4">
                        Forgot password?
                    </div>
                </Link>
                <FormSubmit label="Login" />
                <div
                    className={`text-red-500 mb-4${
                        loginError ? 'visible' : 'invisible'
                    }`}
                >
                    {loginError}
                </div>
            </form>
        </FormWrapper>
    );
};

export default Login;
