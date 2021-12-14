import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useModal } from '../utils/ModalProvider';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormSubmit from '../forms/FormSubmit';
import FormField from '../forms/FormField';
import FormHeader from '../forms/FormHeader';
import { httpClient } from '../../lib/axios';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

type Inputs = {
    title: string;
};

const CreatePlatformModal = () => {
    const { isOpen, setIsOpen } = useModal();
    const router = useRouter();
    const form = useForm<Inputs>();
    const { handleSubmit, reset } = form;

    const closeModal = () => {
        setIsOpen(false);
        reset();
    };

    const onSubmit: SubmitHandler<Inputs> = async ({ title }: Inputs) => {
        const response: AxiosResponse<{ id: number }> = await httpClient.post(
            '/platforms',
            {
                title,
            },
        );
        if (response.data) {
            router.push(`/platforms/${response.data.id}`);
            await httpClient.post(`/me/rewards/`, {
                badgeId: response.data.id + 99999,
                badgeName: title,
            });
        }
        closeModal();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="fixed z-10 inset-0 overflow-y-auto"
        >
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />

                <form
                    className="relative bg-white rounded max-w-sm py-10 px-20"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormHeader label="Create Platform" />

                    <FormField form={form} formKey="title" label="" />

                    <div className="inline-flex space-x-2 my-4 items-center">
                        <FormSubmit label="Create" />
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-600 font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};

export default CreatePlatformModal;
