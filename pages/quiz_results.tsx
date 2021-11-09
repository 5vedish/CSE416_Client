import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { intervalToDuration, formatDuration, add } from 'date-fns';
import Link from 'next/link';

const QuizResults: NextPage = () => {
    const startDate = new Date();
    const quizResult = {
        questionsCompleted: 2,
        totalQuestions: 5,
        startTime: startDate,
        endTime: add(startDate, { minutes: 5, seconds: 5 }),
        score: 0,
        previousBest: 0,
        quizDifficulty: 'Easy',
    };
    const [difficulty, setDifficulty] = useState('');
    const [elapsed, setElapsed] = useState('');
    useEffect(() => {
        // fetch quiz attempt id from query url
        // call api to get quizAttempt
        // this is dummy data for now

        switch (quizResult.quizDifficulty) {
            case 'Hard':
                setDifficulty('text-red-500');
                break;
            case 'Medium':
                setDifficulty('text-yellow-500');
                break;
            case 'Easy':
                setDifficulty('text-green-500');
        }

        const difference = intervalToDuration({
            start: quizResult.startTime,
            end: quizResult.endTime,
        });

        const elapsed = formatDuration(difference);
        setElapsed(elapsed);
    }, []);

    const headerStyle = 'font-logo text-lg text-center';
    const dividerStyle = 'h-1 bg-black mb-2';
    const statStyle = 'inline-flex justify-self-start text-sm';
    return (
        <div className="h-screen overflow-hidden bg-gray-100">
            <Navbar currency={false} />
            <div className="flex flex-col items-center w-screen">
                <p className="font-logo font-bold lg:text-2xl mt-8">
                    Quiz Completed!
                </p>
                <div className="flex flex-col w-1/3 mt-4 bg-white border border-gray-200 sm:border-4 rounded-lg p-4">
                    <label className={`${headerStyle}`}> Stats </label>
                    <hr className={`${dividerStyle}`}></hr>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Quiz Difficulty:</p>
                        <p className={`${difficulty} font-bold`}>
                            {quizResult.quizDifficulty}
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Questions Completed:</p>
                        <p className="text-blue-500 font-bold">
                            {quizResult.questionsCompleted}/
                            {quizResult.totalQuestions}
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Time Elapsed:</p>
                        <p className="text-blue-500 font-bold">{elapsed}</p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Score:</p>
                        <p className="text-blue-500 font-bold">
                            {quizResult.score}
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Previous Best:</p>
                        <p className="text-blue-500 font-bold">
                            {quizResult.previousBest}
                        </p>
                    </div>
                </div>
                <button className="mt-8 p-2 bg-blue-500 border rounded-lg shadow-lg font-bold text-white">
                    <Link href="/platform">Return To Platform</Link>
                </button>
            </div>
        </div>
    );
};

export default QuizResults;
