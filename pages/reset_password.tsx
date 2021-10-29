import type { NextPage } from 'next';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormWrapper from '../components/forms/FormWrapper';

import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import FormHeader from '../components/forms/FormHeader';
import PasswordField from '../components/forms/PasswordField';
import FormSubmit from '../components/forms/FormSubmit';
import { useRouter } from 'next/router';
import { httpClient } from '../lib/axios';
import { useAuth } from '../components/AuthProvider';

type Inputs = {
    password: string;
    confirmPassword: string;
};

const ResetPassword: NextPage = () => {
    const form = useForm<Inputs>();
    const { handleSubmit, watch } = form;
    const router = useRouter();
    const { resetPassword } = useAuth();
    const onSubmit: SubmitHandler<Inputs> = async ({ password }) => {
        const { token } = router.query;
        if (token) {
            await resetPassword(token as string, password);
        }
    };

    return (
        <FormWrapper>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <FormHeader label="Reset Password" />

                <PasswordField
                    form={form}
                    formKey="password"
                    eyeButton
                    required="New password is required"
                    label="New Password"
                />

                <PasswordField
                    form={form}
                    formKey="confirmPassword"
                    label="Confirm Password"
                    required="Please confirm new password"
                    validate={(p) =>
                        p === watch('password') || 'Passwords must match'
                    }
                />
                <FormSubmit label="Reset password" />
            </form>
        </FormWrapper>
    );
};

export default ResetPassword;
