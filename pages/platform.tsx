import type { NextPage } from 'next';
import React from 'react';
import Navbar from '../components/Navbar';
import QuizWrapper from '../components/wrapper/QuizWrapper';
import QuizCard from '../components/quiz/QuizCard';
import PlatformBanner from '../components/platform/PlatformBanner';

const UpdateContact: NextPage = () => {
    return (
        <div className="min-h-full">
            <Navbar />
            <div className="w-full h-screen bg-gray-100">
                <PlatformBanner title="Planets" author="NASA" stars={3} />
                <QuizWrapper>
                    <QuizCard
                        title={'Quiz Title'}
                        time={'1:00'}
                        questions={10}
                        difficulty={'Easy'}
                    />
                    <QuizCard
                        title={'Quiz Title'}
                        time={'1:00'}
                        questions={10}
                        difficulty={'Medium'}
                    />
                    <QuizCard
                        title={'Quiz Title'}
                        time={'1:00'}
                        questions={10}
                        difficulty={'Hard'}
                    />
                    <QuizCard
                        title={'Quiz Title'}
                        time={'1:00'}
                        questions={10}
                        difficulty={'Hard'}
                    />
                </QuizWrapper>
            </div>
        </div>
    );
};

export default UpdateContact;
