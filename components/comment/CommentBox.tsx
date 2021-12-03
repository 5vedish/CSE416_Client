import FormHeader from '../forms/FormHeader';
import FormField from '../forms/FormField';
import FormSubmit from '../forms/FormSubmit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import Comment from './Comment';
import { httpClient } from '../../lib/axios';

const CommentBox = ({
    platformId,
    comments,
    refetch,
}: {
    platformId: number;
    comments: Comment[];
    refetch: () => Promise<void>;
}) => {
    const form = useForm<{ comment: string }>();

    const { handleSubmit, reset } = form;

    const onSubmit: SubmitHandler<{ comment: string }> = async ({
        comment,
    }) => {
        if (comment) {
            await httpClient.post<any>(`/comments/${platformId}`, {
                content: comment,
            });
            await refetch();
            reset();
        }
    };

    return (
        <form className="w-1/2 p-2 pt-4" onSubmit={handleSubmit(onSubmit)}>
            <FormHeader label="Write a comment" additionalStyles="mt-10" />
            <FormField
                form={form}
                formKey="comment"
                label=""
                isMultiLine
                placeholder="Write a comment."
            />
            <FormSubmit label="Submit" />
            <FormHeader
                label={`${comments.length} comment${
                    comments.length > 1 || comments.length === 0 ? 's' : ''
                }`}
                additionalStyles="mt-10"
            />
            {comments.map(({ id, author, createdAt, content }, index) => (
                <Comment
                    key={id}
                    id={id}
                    authorName={author.displayName}
                    authorId={author.id}
                    createdAt={createdAt}
                    content={content}
                    refetch={refetch}
                />
            ))}
        </form>
    );
};

export default CommentBox;
