import { useState } from 'react';
import { UseFormReturn, Validate, ValidationRule } from 'react-hook-form';

const FormField = ({
    form,
    formKey,
    label,
    defaultValue,
    labelStyle,
    validate,
    required,
    isNumber,
    isMultiLine,
    placeholder,
}: {
    form: UseFormReturn<any, object>;
    formKey: string;
    label: string;
    defaultValue?: string;
    labelStyle?: string;
    required?: string | ValidationRule<boolean>;
    validate?: Validate<string> | Record<string, Validate<string>>;
    isNumber?: boolean;
    isMultiLine?: boolean;
    placeholder?: string;
}) => {
    const {
        register,
        formState: { errors },
    } = form;
    return (
        <div className="mb-4 relative">
            <label
                className={
                    labelStyle ?? 'block text-gray-700 text-sm font-bold mb-2'
                }
            >
                {label}
            </label>
            <div className="relative">
                {isMultiLine ? (
                    <textarea
                        rows={3}
                        {...register(formKey, {
                            required,
                            validate,
                        })}
                        className={`border p-2 rounded w-full ${
                            errors[formKey]
                                ? 'border-red-500'
                                : 'border-gray-300'
                        }`}
                        placeholder={placeholder ?? ''}
                        defaultValue={defaultValue ?? ''}
                    ></textarea>
                ) : (
                    <input
                        {...register(formKey, {
                            required,
                            validate,
                        })}
                        className={`shadow appearance-none ${
                            errors[formKey]
                                ? 'border-red-500'
                                : 'border-gray-300'
                        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        defaultValue={defaultValue ?? ''}
                        type={isNumber ? 'number' : 'text'}
                    />
                )}
            </div>
            <span className="text-red-500 text-sm">
                {errors[formKey]?.message}
            </span>
        </div>
    );
};

export default FormField;
