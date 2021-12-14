import { useEffect, useState } from 'react';
import QuestionCard from './QuestionCard';
import { PlusCircleIcon } from '@heroicons/react/solid';
import EditQuizControls from './EditQuizControls';
import { httpClient } from '../../lib/axios';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/AuthProvider';

export default function QuizContainer({
    platformId,
    quizQuestions,
    edit,
    quizId,
    quizTitle,
    difficulty,
    time,
    refetch,
}: {
    platformId: Number;
    quizQuestions: Question[];
    edit: boolean;
    quizId: number;
    quizTitle: string;
    difficulty: string;
    time: number;
    refetch: () => Promise<void>;
}) {
    const [score, setScore] = useState(0);
    const [record, setRecord] = useState<{ [key: number]: number }>({});
    const refetchUser = useAuth().getUser;

    const recordChoice = (index: number, choice: number) => {
        setRecord({ ...record, [index]: choice });
    };

    const router = useRouter();

    const addQuestion = async () => {
        await httpClient.post(`/questions/${quizId}`, {
            question: 'What is the question you want to ask?',
            choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
            correctChoice: 0,
        });

        refetch();
    };

    const { getUser } = useAuth();

    const submitAttempt = async () => {
        const ordered = Object.entries(record)
            .sort((a, b) => (a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0))
            .map(([_, v]) => v);

        const { attempt } = router.query;
        const { platform } = router.query;

        await httpClient.post(`/me/rewards/`, {
            badgeId: platformId,
            badgeName: platform,
        });

        await httpClient.patch(`/quizzes/${quizId}/attempts/${attempt}`, {
            selectedChoices: ordered,
            endTime: new Date(),
        });
        getUser();
        refetchUser();
        router.push(`/quizzes/${quizId}/completed`);
    };

    return (
        <div className="h-full min-h-screen w-full py-16 flex flex-col items-center bg-gray-100 overflow-y-auto">
            {edit ? (
                <EditQuizControls
                    quizId={quizId}
                    quizTitle={quizTitle}
                    difficulty={difficulty}
                    time={time}
                    refetch={refetch}
                />
            ) : null}

            {quizQuestions.map((question, index) => (
                <QuestionCard
                    key={index}
                    index={index}
                    questionId={question.id}
                    question={question}
                    recordChoice={recordChoice}
                    edit={edit}
                    refetch={refetch}
                ></QuestionCard>
            ))}

            {edit ? (
                <div className="w-auto h-auto flex flex-row items-center mt-4">
                    <button
                        className="w-auto h-auto flex items-center justify-center mx-2"
                        onClick={addQuestion}
                    >
                        <PlusCircleIcon className="h-16 w-16 text-gray-500 hover:text-gray-700" />
                    </button>
                    <p className="font-bold text-gray-500">Add Question</p>
                </div>
            ) : null}

            <button
                className="h-12 w-20 mt-12 flex justify-center items-center bg-blue-500 rounded-md shadow-md text-white hover:bg-blue-700"
                onClick={() => {
                    edit ? router.back() : submitAttempt();
                }}
            >
                <p className="font-bold">{edit ? 'Done' : 'Submit'}</p>
            </button>
        </div>
    );
}
