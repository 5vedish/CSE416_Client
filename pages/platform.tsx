import type { NextPage } from 'next';
import React from 'react';
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
        <Platform
            createQuiz={async () => {}}
            author="Your Mom"
            title="You're a simp"
            quizzes={quizzes}
            rating={0}
        />
    );
};

export default UpdateContact;
