import { useEffect, useState } from 'react';
import QuestionCard from './QuestionCard';
import { PlusCircleIcon } from '@heroicons/react/solid';
import EditQuizControls from './EditQuizControls';

export default function QuizContainer({
    quizQuestions,
    edit,
}: {
    quizQuestions: Question[];
    edit: boolean;
}) {
    const [score, setScore] = useState(0);
    const [record, setRecord] = useState<{ [key: number]: number }>({});

    const recordChoice = (index: number, choice: number) => {
        setRecord({ ...record, [index]: choice });
    };

    const calcScore = () => {
        setScore(
            quizQuestions.reduce(
                (sum, { correctChoice }, index) =>
                    correctChoice === record[index] ? sum + 1 : sum,
                0,
            ),
        );

        console.log(
            'Your score is ' + score + '/' + quizQuestions.length + '.',
        );
    };

    return (
        <div className="h-full min-h-screen w-full py-16 flex flex-col items-center bg-gray-100 overflow-y-auto">
            {edit ? <EditQuizControls /> : null}

            {quizQuestions.map((question, index) => (
                <QuestionCard
                    key={index}
                    index={index}
                    question={question}
                    recordChoice={recordChoice}
                    edit={edit}
                ></QuestionCard>
            ))}

            {edit ? (
                <div className="w-auto h-auto flex flex-row items-center mt-4">
                    <button className="w-auto h-auto flex items-center justify-center mx-2">
                        <PlusCircleIcon className="h-16 w-16 text-gray-500 hover:text-gray-700" />
                    </button>
                    <p className="font-bold text-gray-500">Add Question</p>
                </div>
            ) : null}

            <button
                className="h-12 w-20 mt-12 flex justify-center items-center bg-blue-500 rounded-md shadow-md text-white hover:bg-blue-700"
                onClick={() => {
                    calcScore;
                }}
            >
                <p className="font-bold">{edit ? 'Save' : 'Submit'}</p>
            </button>
        </div>
    );
}
