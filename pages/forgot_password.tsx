import type { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';

import FormWrapper from '../components/forms/FormWrapper';
import FormHeader from '../components/forms/FormHeader';
import FormField from '../components/forms/FormField';
import FormSubmit from '../components/forms/FormSubmit';

type ForgotPasswordInputs = {
    email: string;
};

const ForgotPassword: NextPage = () => {
    const form = useForm<ForgotPasswordInputs>();
    const { handleSubmit, watch } = form;
    const onSubmit: SubmitHandler<ForgotPasswordInputs> = (data) =>
        console.log(data);

    return (
        <FormWrapper>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-s"
            >
                <FormHeader label="Forgot password?" />
                <FormField
                    form={form}
                    formKey="email"
                    label="Enter your email below and a recovery email will be sent to you shortly."
                    labelStyle="block text-gray-500 text-sm mb-4 font-medium"
                    required="Please enter email"
                />

                <FormSubmit />
            </form>
        </FormWrapper>
    );
};

export default ForgotPassword;
