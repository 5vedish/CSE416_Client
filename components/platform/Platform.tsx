import React from 'react';
import Navbar from '../Navbar';
import CreateButton from '../quiz/CreateButton';
import QuizCard from '../quiz/QuizCard';
import QuizWrapper from '../wrapper/QuizWrapper';
import GenerateStars from './GenerateStars';
import PlatformBanner from './PlatformBanner';

export default function Platform({
    title,
    author,
    quizzes,
    createQuiz,
}: {
    title: String;
    author: String;
    quizzes: Quiz[];
    createQuiz: () => Promise<void>;
}) {
    return (
        <div className="min-h-full">
            <div className="w-full h-screen bg-gray-100">
                <PlatformBanner title={title} author={author} />
                <QuizWrapper>
                    {quizzes.map((quiz) => (
                        <QuizCard
                            key={quiz.id}
                            title={quiz.title}
                            time={quiz.maxTime}
                            questions={quiz.questions.length}
                            difficulty={quiz.difficulty}
                        />
                    ))}
                    <CreateButton label="Add Quiz" create={createQuiz} />
                </QuizWrapper>
            </div>
        </div>
    );
}
