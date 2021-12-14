import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { httpClient } from '../../lib/axios';
import CommentBox from '../comment/CommentBox';
import Navbar from '../Navbar';
import CreateButton from '../quiz/CreateButton';
import QuizCard from '../quiz/QuizCard';
import QuizWrapper from '../wrapper/QuizWrapper';
import GenerateStars from './GenerateStars';
import PlatformBanner from './PlatformBanner';

export default function Platform({
    id,
    title,
    author,
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
    quizzes: Quiz[];
    createQuiz: () => Promise<void>;
    rating: number;
    liked: boolean;
    yourRating: number;
    refetch: () => Promise<void>;
    comments: Comment[];
}) {
    const [userRating, setUserRating] = useState(yourRating);
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
                        platformTitle={String(title)}
                        platformId={id}
                        key={quiz.id}
                        id={quiz.id}
                        title={quiz.title}
                        time={quiz.maxTime}
                        questions={quiz.questions.length}
                        difficulty={quiz.difficulty}
                        quizId={quiz.id}
                        refetch={refetch}
                    />
                ))}
                <CreateButton label="Add Quiz" create={createQuiz} />
            </QuizWrapper>
            <div className="px-8 pt-4">Your Rating:</div>
            <Rating
                className="p-8"
                onClick={handleRating}
                ratingValue={userRating} /* Rating Props */
            />
            <CommentBox comments={comments} platformId={id} refetch={refetch} />
        </div>
    );
}
