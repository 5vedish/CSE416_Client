import React, { useState, SetStateAction } from 'react';
import AnswerChoice from '../question/AnswerChoice';
import DeleteQuiz from './DeleteQuiz';
import Question from '../question/Question';
import Submit from './Submit';
import axios from 'axios';
import { httpClient } from '../../lib/axios';
import { useRouter } from 'next/router';
import CreateButton from './CreateButton';
import Link from 'next/link';

export default function Quiz({
    quizId,
    question,
    answers,
    questionId,
    correctChoice,
    refetch,
    deleteQuiz,
    edit,
}: {
    quizId: number;
    question: string;
    answers: string[];
    questionId: number;
    correctChoice: number;
    refetch: () => Promise<void>;
    deleteQuiz: () => Promise<void>;
    edit?: boolean;
}) {
    const [answerChosen, setChosen] = useState(-1);
    const [correct, setCorrect] = useState<boolean | null>(null);
    const [choices, setChoices] = useState(answers); // editing answer set
    const router = useRouter();
    const submit = async () => {
        const { attempt } = router.query;
        await httpClient.patch(`/quizzes/${quizId}/attempts/${attempt}`, {
            selectedChoices: [answerChosen],
            endTime: new Date(),
        });
        router.push(`/quizzes/${quizId}/completed`);
    };

    const editChoices = async (newChoice: string, newChoiceIndex: number) => {
        const newChoices = choices.map((choice, index) => {
            if (index === newChoiceIndex) {
                return newChoice;
            }
            return choice;
        });
        console.log(newChoices);
        await httpClient.put(`/questions/${questionId}`, {
            question,
            choices: newChoices,
            correctChoice,
        });
        setChoices(newChoices);
        await refetch();
    };

    const [isEditing, setEditing] = useState(false);

    const handleEdit = async (e: React.FormEvent<HTMLInputElement>) => {
        if (
            parseInt(e.currentTarget.value) < -1 ||
            parseInt(e.currentTarget.value) > 3
        ) {
            alert('Error: Correct choice index out of bounds!');
            return;
        }

        console.log(questionId);
        await httpClient.put(`/questions/${questionId}`, {
            question,
            choices,
            correctChoice: e.currentTarget.value,
        });
        setEditing(false);
        await refetch();
    };

    return (
        <div className="w-full h-screen bg-gray-100">
            <form
                className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <Question
                    refetch={refetch}
                    text={question}
                    id={questionId}
                    choices={answers}
                    correctChoice={answerChosen}
                    edit={edit}
                />
                {answers.map((ans, index) => (
                    <AnswerChoice
                        refetch={refetch}
                        key={ans + index}
                        text={ans}
                        index={index}
                        selectChoice={(num) => {
                            if (!edit) setChosen(num);
                        }}
                        selectedIndex={answerChosen}
                        editChoices={editChoices}
                        edit={edit}
                    />
                ))}
                {!edit && (
                    <Submit
                        choice={answerChosen}
                        func={submit}
                        setChosen={setChosen}
                        setCorrect={setCorrect}
                    />
                )}

                {correct !== null &&
                    (correct ? (
                        <p className="font-bold text-3xl text-green-400">
                            Correct!
                        </p>
                    ) : (
                        <p className="font-bold text-3xl text-red-400">
                            Incorrect. Try Again?
                        </p>
                    ))}

                {edit && (
                    <>
                        <Link href="/" passHref>
                            <a>
                                <CreateButton
                                    label={'Finish editing'}
                                    create={async () => {}}
                                />
                            </a>
                        </Link>
                        <label className="font-bold text-xl">
                            Set Correct Choice
                        </label>
                        <input
                            className="appearance-none ml-4 border-2 border-gray-200 rounded w-64 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            onBlur={handleEdit}
                            defaultValue={correctChoice}
                            type="text"
                            autoFocus={true}
                        ></input>
                    </>
                )}
            </form>
        </div>
    );
}
