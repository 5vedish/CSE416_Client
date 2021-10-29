import type { NextPage } from 'next';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormWrapper from '../components/forms/FormWrapper';

import PasswordField from '../components/forms/PasswordField';
import FormField from '../components/forms/FormField';
import FormHeader from '../components/forms/FormHeader';
import FormSubmit from '../components/forms/FormSubmit';
import { useAuth } from '../components/AuthProvider';

type RegisterInputs = {
    password: string;
    email: string;
    displayName: string;
    confirmPassword: string;
};

const Register: NextPage = () => {
    const { signUp } = useAuth();
    const form = useForm<RegisterInputs>();
    const { handleSubmit, watch } = form;
    const [error, setError] = useState('');
    const onSubmit: SubmitHandler<RegisterInputs> = async ({
        email,
        password,
        displayName,
    }) => {
        console.log(email);
        const result = await signUp({
            email: email,
            password: password,
            displayName: displayName,
        });
        if (result !== 200) {
            setError('Error creating an account, email already in use.');
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
                <div
                    className={`text-red-500 mb-4 ${
                        error ? 'visible' : 'invisible'
                    }`}
                >
                    {error}
                </div>
            </form>
        </FormWrapper>
    );
};

export default Register;
