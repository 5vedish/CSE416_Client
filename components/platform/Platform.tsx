import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { httpClient } from '../../lib/axios';
import CommentBox from '../comment/CommentBox';
import Navbar from '../Navbar';
import CreateButton from '../quiz/CreateButton';
import QuizCard from '../quiz/QuizCard';
import { useAuth } from '../utils/AuthProvider';
import QuizWrapper from '../wrapper/QuizWrapper';
import GenerateStars from './GenerateStars';
import PlatformBanner from './PlatformBanner';

export default function Platform({
    id,
    title,
    author,
    authorId,
    quizzes,
    createQuiz,
    rating,
    yourRating,
    liked,
    refetch,
    comments,
}: {
    id: number;
    title: String;
    author: String;
    authorId: number;
    quizzes: Quiz[];
    createQuiz: () => Promise<void>;
    rating: number;
    liked: boolean;
    yourRating: number;
    refetch: () => Promise<void>;
    comments: Comment[];
}) {
    const [userRating, setUserRating] = useState(yourRating);
    const { user } = useAuth();
    console.log(authorId, user);
    const handleRating = async (newRating: number) => {
        await httpClient
            .put(`/platforms/${id}/ratings`, { rating: newRating })
            .catch((e) => {
                console.log(e);
            });
        console.log(`/platforms/${id}/ratings/${newRating}`);
        setUserRating(newRating);
        await refetch();
    };
    return (
        <div>
            <PlatformBanner
                id={id}
                title={title}
                author={author}
                rating={rating}
            />
            <QuizWrapper>
                {quizzes.map((quiz) => (
                    <QuizCard
                        key={quiz.id}
                        id={quiz.id}
                        editable={user.id === authorId}
                        title={quiz.title}
                        time={quiz.maxTime}
                        questions={quiz.questions.length}
                        difficulty={quiz.difficulty}
                        quizId={quiz.id}
                        refetch={refetch}
                    />
                ))}
                {user.id === authorId && (
                    <CreateButton label="Add Quiz" create={createQuiz} />
                )}
            </QuizWrapper>
            {user && user.id !== authorId && (
                <>
                    <div className="px-8 pt-4">Your Rating:</div>
                    <Rating
                        className="p-8"
                        onClick={handleRating}
                        ratingValue={userRating} /* Rating Props */
                    />
                </>
            )}

            <CommentBox comments={comments} platformId={id} refetch={refetch} />
        </div>
    );
}
