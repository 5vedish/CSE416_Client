import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import { intervalToDuration, formatDuration, add } from 'date-fns';
import Link from 'next/link';
import { httpClient } from '../../../lib/axios';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

const QuizCompleted: NextPage = () => {
    const [difficultyClass, setDifficultyClass] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [elapsed, setElapsed] = useState('');
    const [questionsCompleted, setQuestionsCompleted] = useState(0);
    const [questionsCorrect, setQuestionsCorrect] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const router = useRouter();

    useEffect(() => {
        // fetch quiz attempt id from query url
        // call api to get quizAttempt
        // this is dummy data for now

        (async () => {
            const { quizId } = router.query;
            // const { platform } = router.query;

            const result: AxiosResponse<QuizAttempt> = await httpClient.get(
                `/quizzes/${quizId}/attempts`,
            );
            const quizResult = result.data;
            console.log('dbg: ', result.data);

            console.log('HERE');
            console.log(quizResult.userId);

            setDifficulty(quizResult.difficulty);

            switch (quizResult.difficulty) {
                case 'HARD':
                    setDifficultyClass('text-red-500');
                    break;
                case 'MEDIUM':
                    setDifficultyClass('text-yellow-500');
                    break;
                case 'EASY':
                    setDifficultyClass('text-green-500');
            }

            const difference = intervalToDuration({
                start: new Date(quizResult.startTime),
                end: new Date(quizResult.endTime),
            });

            const elapsed = formatDuration(difference);
            setElapsed(elapsed);
            setQuestionsCompleted(quizResult.questionsCompleted);
            setQuestionsCorrect(quizResult.questionsCorrect);
            setTotalQuestions(quizResult.totalQuestions);

            await httpClient.put(`/users/rewards/${quizResult.userId}`, {
                currency: quizResult.questionsCorrect * 500,
                experience: quizResult.questionsCorrect * 500,
            });

            // await httpClient.post(`/me/rewards/`, {
            //     badgeId: Number(quizId),
            //     badgeName: platform,
            // });
        })();
    }, []);

    const headerStyle = 'font-logo text-lg text-center';
    const dividerStyle = 'h-1 bg-black mb-2';
    const statStyle = 'inline-flex justify-self-start text-sm';
    return (
        <div className="h-screen overflow-hidden bg-gray-100">
            <Navbar />
            <div className="flex flex-col items-center w-screen">
                <p className="font-logo font-bold lg:text-2xl mt-8">
                    Quiz Completed!
                </p>
                <div className="flex flex-col w-1/3 mt-4 bg-white border border-gray-200 sm:border-4 rounded-lg p-4">
                    <label className={`${headerStyle}`}> Stats </label>
                    <hr className={`${dividerStyle}`}></hr>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Quiz Difficulty:</p>
                        <p className={`${difficultyClass} font-bold`}>
                            {difficulty}
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Questions Completed:</p>
                        <p className="font-bold">
                            {questionsCompleted}/{totalQuestions}
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Questions Correct:</p>
                        <p
                            className={`${
                                questionsCorrect / totalQuestions > 0.5
                                    ? 'text-blue-500'
                                    : 'text-red-500'
                            } font-bold`}
                        >
                            {questionsCorrect}/{totalQuestions}
                        </p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Time Elapsed:</p>
                        <p className="text-blue-500 font-bold">{elapsed}</p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Score:</p>
                        <p className="text-blue-500 font-bold">{0}</p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Previous Best:</p>
                        <p className="text-blue-500 font-bold">{0}</p>
                    </div>
                    <label className={`${headerStyle}`}> Stats </label>
                    <hr className={`${dividerStyle}`}></hr>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Currency Earned:</p>
                        <p className={`font-bold`}>{questionsCorrect * 500}</p>
                    </div>
                    <div className={`${statStyle}`}>
                        <p className="mr-2">Experience Gained:</p>
                        <p className={`font-bold`}>{questionsCorrect * 500}</p>
                    </div>
                </div>

                <button className="mt-8 p-2 bg-blue-500 border rounded-lg shadow-lg font-bold text-white">
                    <Link href="/">Return To Platform</Link>
                </button>
            </div>
        </div>
    );
};

export default QuizCompleted;
