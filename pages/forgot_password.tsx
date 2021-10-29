import type { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';

import FormWrapper from '../components/Wrapper/FormWrapper';

type ForgotPasswordInputs = {
    email: string;
};

const ForgotPassword: NextPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ForgotPasswordInputs>();
    const onSubmit: SubmitHandler<ForgotPasswordInputs> = (data) =>
        console.log(data);

    console.log(watch('email')); // watch input value by passing the name of it

    return (
        <FormWrapper>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-s"
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-2xl mb-4 font-bold"
                        htmlFor="username"
                    >
                        Forgot password?
                    </label>
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-500 text-sm mb-4 font-medium"
                        htmlFor="username"
                    >
                        Enter your email below and a recovery email will be sent
                        to you shortly.
                    </label>

                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        defaultValue="test"
                        {...register('email', { required: true })}
                    />
                </div>

                {/* errors will return when field validation fails  */}
                {errors.email && <span>This field is required</span>}
                <div className="flex items-center justify-between">
                    <input
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    />
                </div>
            </form>
        </FormWrapper>
    );
};

export default ForgotPassword;
