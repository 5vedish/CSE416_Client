import type { NextPage } from 'next';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormWrapper from '../components/wrapper/FormWrapper';

import { AxiosResponse } from 'axios';
import { httpClient } from '../lib/axios';
import PasswordField from '../components/forms/PasswordField';
import FormField from '../components/forms/FormField';
import FormHeader from '../components/forms/FormHeader';
import FormSubmit from '../components/forms/FormSubmit';

type RegisterInputs = {
    password: string;
    email: string;
    displayName: string;
    confirmPassword: string;
};

const Register: NextPage = () => {
    const form = useForm<RegisterInputs>();
    const { handleSubmit, watch } = form;
    const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
        try {
            const answerResult: AxiosResponse<{ id: number }> =
                await httpClient.post('/users', {
                    displayName: data.displayName,
                    email: data.email,
                    password: data.password,
                });
            if (!answerResult) {
                console.log('error');
                return;
            }
            console.log(answerResult.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <FormWrapper>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <FormHeader label="Create An Account" />
                <FormField
                    form={form}
                    formKey="email"
                    label="Email"
                    required="Email is required"
                />
                <FormField
                    form={form}
                    formKey="displayName"
                    label="Display Name"
                    required="Display Name is required"
                />

                <PasswordField
                    form={form}
                    formKey="password"
                    label="Password"
                    eyeButton
                />

                <PasswordField
                    form={form}
                    formKey="confirmPassword"
                    label="Confirm Password"
                    required="Please confirm password"
                    validate={(p) =>
                        p === watch('password') || 'Passwords must match'
                    }
                />
                <FormSubmit label="Create account" />
            </form>
        </FormWrapper>
    );
};

export default Register;
