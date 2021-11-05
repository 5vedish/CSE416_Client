import type { NextPage } from 'next';
import React from 'react';
import Navbar from '../components/Navbar';
import QuizWrapper from '../components/wrapper/QuizWrapper';
import QuizCard from '../components/quiz/QuizCard';
import PlatformBanner from '../components/platform/PlatformBanner';
import Platform from '../components/platform/Platform';

const UpdateContact: NextPage = () => {
    const quizzes: Quiz[] = [
        {
            id: 1,
            title: 'Quiz Title',
            maxTime: 60,
            questions: [],
            difficulty: 'Easy',
        },
        {
            id: 2,
            title: 'Quiz Title',
            maxTime: 60,
            questions: [],
            difficulty: 'Medium',
        },
        {
            id: 3,
            title: 'Quiz Title',
            maxTime: 60,
            questions: [],
            difficulty: 'Hard',
        },
    ];
    return (
        <Platform author="Your Mom" title="You're a simp" quizzes={quizzes} />
    );
};

export default UpdateContact;
