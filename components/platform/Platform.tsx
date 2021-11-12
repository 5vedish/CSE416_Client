import React from 'react';
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
    refetch,
}: {
    id: number;
    title: String;
    author: String;
    quizzes: Quiz[];
    createQuiz: () => Promise<void>;
    rating: number;
    refetch: () => Promise<void>;
}) {
    console.log('PLATFORM');
    console.log(id);
    return (
        <div className="min-h-full">
            <div className="w-full h-screen bg-gray-100">
                <PlatformBanner
                    id={id}
                    title={title}
                    author={author}
                    rating={rating}
                    refetch={refetch}
                />
                <QuizWrapper>
                    {quizzes.map((quiz) => (
                        <QuizCard
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
            </div>
        </div>
    );
}
