import React from 'react';
import { NextPage } from 'next';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormWrapper from '../components/Wrapper/FormWrapper';

import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useAuth } from '../components/AuthProvider';

type Inputs = {
    email: string;
    password: string;
};

const Login: NextPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const { logIn } = useAuth();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        logIn(data);
    };

    const [passwordShown, setPasswordShown] = useState(false);

    return (
        <FormWrapper>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-2xl mb-4 font-bold"
                        htmlFor="header"
                    >
                        Login
                    </label>
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <input
                            {...register('email', {
                                required: 'Email required.',
                            })}
                            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </div>

                <div className="mb-4 relative">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        {...register('password', {
                            required: 'Password required.',
                        })}
                        className={`shadow appearance-none ${
                            errors.password?.type === 'validate'
                                ? 'border-red-500'
                                : 'border-gray-300'
                        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        type={passwordShown ? 'text' : 'password'}
                    />
                    <div
                        className="absolute top-9 right-2 cursor-pointer select-none"
                        onClick={() => setPasswordShown(!passwordShown)}
                    >
                        {passwordShown ? (
                            <EyeOffIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                            <EyeIcon className="h-5 w-5 text-gray-500" />
                        )}
                    </div>
                </div>
                <span className="text-red-500 text-sm">
                    {errors.password?.message}
                </span>
                <div className="flex items-center justify-between">
                    <input
                        value="Login"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                        type="submit"
                    />
                </div>
            </form>
        </FormWrapper>
    );
};

export default Login;
