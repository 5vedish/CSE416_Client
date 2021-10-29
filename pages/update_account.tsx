import type { NextPage } from 'next';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import GridWrapper from '../components/Wrapper/GridWrapper';
import Navbar from '../components/Navbar';

type Inputs = {
    password: string;
    email: string;
    displayName: string;
    confirmPassword: string;
};

const UpdateContact: NextPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        // update password or update info
        console.log(data);
    };

    const [passwordShown, setPasswordShown] = useState(false);

    return (
        <div>
            <Navbar />
            <div className="min-h-full flex justify-center bg-gray-100">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                    <GridWrapper>
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
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email Address
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
                    </GridWrapper>
                    <div className="flex items-center justify-between">
                        <input
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                            type="submit"
                            value="Update"
                        />
                    </div>
                </form>
            </div>

            <div className="min-h-full flex justify-center bg-gray-100">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                    <GridWrapper>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    {...register('password', {
                                        required: 'New password is required',
                                    })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type={passwordShown ? 'text' : 'password'}
                                />
                                <div
                                    className="absolute top-2 right-2 cursor-pointer select-none"
                                    onClick={() =>
                                        setPasswordShown(!passwordShown)
                                    }
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
                                Confirm New Password
                            </label>
                            <input
                                {...register('confirmPassword', {
                                    required: 'Please confirm new password',
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
                    </GridWrapper>
                    <div className="flex items-center justify-between">
                        <input
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                            type="submit"
                            value="Update"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateContact;
