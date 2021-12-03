import FormField from '../forms/FormField';
import FormSubmit from '../forms/FormSubmit';
import { UserCircleIcon } from '@heroicons/react/solid';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../utils/AuthProvider';
import { httpClient } from '../../lib/axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const Comment = ({
    id,
    content,
    authorName,
    authorId,
    createdAt,
    refetch,
}: {
    id: number;
    content: string;
    authorName: string;
    authorId: number;
    createdAt: Date;
    refetch: () => Promise<void>;
}) => {
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);

    const deleteComment = async () => {
        await httpClient.delete(`/comments/${id}`);
        await refetch();
    };

    const form = useForm<{ comment: string }>();

    const { handleSubmit, reset } = form;

    const onSubmit: SubmitHandler<{ comment: string }> = async ({
        comment,
    }) => {
        if (comment) {
            await httpClient.put(`/comments/${id}`, { content: comment });
            await refetch();
            reset();
        }
    };

    return (
        <div className="flex ml-3 py-4">
            <div className="mr-3">
                <UserCircleIcon className="h-10 w-10 text-gray-400" />
            </div>
            <div>
                <div className="inline-flex space-x-5 items-center mb-2">
                    <h1 className="font-bold text-base">{authorName}</h1>
                    <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(createdAt))}
                    </p>
                    {user && user.id === authorId && (
                        <>
                            {/* <div>
                                <PencilIcon
                                    className={`${
                                        editing ? 'invisible' : ''
                                    } h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer`}
                                    onClick={() => setEditing(true)}
                                />
                            </div> */}
                            <div>
                                <TrashIcon
                                    className={`${
                                        editing ? 'invisible' : ''
                                    } h-5 w-5 text-gray-400 hover:text-red-400 cursor-pointer`}
                                    onClick={deleteComment}
                                />
                            </div>
                        </>
                    )}
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`${editing ? '' : 'hidden'}`}
                >
                    <FormField
                        form={form}
                        formKey="comment"
                        label=""
                        isMultiLine
                        defaultValue={content}
                    />
                    <div className="inline-flex space-x-2 items-center">
                        <FormSubmit label="Update" />
                        <button
                            type="button"
                            onClick={() => {
                                setEditing(false);
                                reset();
                            }}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-600 font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
                <p className={`${editing ? 'hidden' : ''}`}>{content}</p>
            </div>
        </div>
    );
};

export default Comment;
