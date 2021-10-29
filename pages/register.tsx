import type { NextPage } from 'next';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormWrapper from '../components/Wrapper/FormWrapper';

import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

type Inputs = {
    password: string;
    email: string;
    displayName: string;
    confirmPassword: string;
};

const Register: NextPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        // register now
        console.log(data);
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
                        htmlFor="username"
                    >
                        Create an Account
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
                                required: 'Email is required',
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {errors.email && (
                        <span className="text-red-500 text-sm">
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="displayName"
                    >
                        Display Name
                    </label>
                    <div className="relative">
                        <input
                            {...register('displayName', {
                                required: 'Display name is required',
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {errors.displayName && (
                        <span className="text-red-500 text-sm">
                            {errors.displayName.message}
                        </span>
                    )}
                </div>

                {/* include validation with required or other standard HTML validation rules */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            {...register('password', {
                                required: 'Password is required',
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type={passwordShown ? 'text' : 'password'}
                        />
                        <div
                            className="absolute top-2 right-2 cursor-pointer select-none"
                            onClick={() => setPasswordShown(!passwordShown)}
                        >
                            {passwordShown ? (
                                <EyeOffIcon className="h-5 w-5 text-gray-500" />
                            ) : (
                                <EyeIcon className="h-5 w-5 text-gray-500" />
                            )}
                        </div>
                    </div>
                    {errors.password && (
                        <span className="text-red-500 text-sm">
                            {errors.password.message}
                        </span>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Confirm Password
                    </label>
                    <input
                        {...register('confirmPassword', {
                            required: 'Please confirm password',
                            validate: (p) =>
                                p === watch('password') ||
                                'Passwords must match',
                        })}
                        className={`shadow appearance-none ${
                            errors.confirmPassword?.type === 'validate'
                                ? 'border-red-500'
                                : 'border'
                        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        type="password"
                    />
                    <span className="text-red-500 text-sm">
                        {errors.confirmPassword?.message}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <input
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                        type="submit"
                    />
                </div>
            </form>
        </FormWrapper>
    );
};

export default Register;
