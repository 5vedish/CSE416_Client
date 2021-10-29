import { useState } from 'react';
import { UseFormReturn, Validate, ValidationRule } from 'react-hook-form';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

const PasswordField = ({
    form,
    formKey,
    eyeButton,
    label,
    validate,
    required,
}: {
    form: UseFormReturn<any, object>;
    formKey: string;
    eyeButton?: boolean;
    label: string;
    required?: string | ValidationRule<boolean>;
    validate?: Validate<string> | Record<string, Validate<string>>;
}) => {
    const {
        register,
        formState: { errors },
    } = form;
    const [passwordShown, setPasswordShown] = useState(false);
    return (
        <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <div className="relative">
                <input
                    {...register(formKey, {
                        required: required ?? 'Password required.',
                        validate,
                    })}
                    className={`shadow appearance-none ${
                        errors[formKey] ? 'border-red-500' : 'border-gray-300'
                    } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    type={passwordShown ? 'text' : 'password'}
                />
                {eyeButton && (
                    <div
                        className={`absolute top-2.5 right-2 cursor-pointer select-none`}
                        onClick={() => setPasswordShown(!passwordShown)}
                    >
                        {passwordShown ? (
                            <EyeOffIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                            <EyeIcon className="h-5 w-5 text-gray-500" />
                        )}
                    </div>
                )}
                <span className="text-red-500 text-sm">
                    {errors[formKey]?.message}
                </span>
            </div>
        </div>
    );
};

export default PasswordField;
