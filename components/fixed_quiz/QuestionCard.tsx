import { useState } from 'react';
import AnswerChoice from './AnswerChoice';
import { TrashIcon } from '@heroicons/react/solid';
import { httpClient } from '../../lib/axios';

export default function QuestionCard({
    index,
    question,
    recordChoice,
    edit,
    questionId,
    refetch,
}: {
    index: number;
    question: {
        question: string;
        choices: string[];
        correctChoice: number;
    };
    recordChoice: (questionIndex: number, choice: number) => void;
    edit: boolean;
    questionId: number;
    refetch: () => Promise<void>;
}) {
    const inputStlye =
        'border-2 border-gray-200 rounded h-auto p-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500';
    const [selected, setSelected] = useState(-1);

    const selectIndex = (num: number) => {
        setSelected(num);
        recordChoice(index, num);
    };

    const deleteQuestion = async () => {
        await httpClient.delete(`/questions/${questionId}`);

        refetch();
    };

    const handleQuestion = async (e: React.FormEvent<HTMLInputElement>) => {
        await httpClient.put(`/questions/${questionId}`, {
            question: e.currentTarget.value,
            choices: question.choices,
            correctChoice: question.correctChoice,
        });

        refetch();
    };

    const handleCorrect = async (e: React.FormEvent<HTMLInputElement>) => {
        const newCorrect = parseInt(e.currentTarget.value) - 1;
        if (newCorrect < 0 || newCorrect > 3) {
            alert('Error: Correct Choice Out Of Bounds!');
        }
        await httpClient.put(`/questions/${questionId}`, {
            question: question.question,
            choices: question.choices,
            correctChoice: newCorrect,
        });

        refetch();
    };

    const handleAnswer = async (index: number, newChoice: string) => {
        const newChoices = question.choices.map(function (choice) {
            return choice == question.choices[index] ? newChoice : choice;
        });

        console.log(newChoices);

        await httpClient.put(`/questions/${questionId}`, {
            question: question.question,
            choices: newChoices,
            correctChoice: question.correctChoice,
        });

        refetch();
    };
    return (
        <div
            className={`flex flex-col h-auto w-3/4 bg-white shadow-md rounded-md p-4 ${
                edit ? 'my-8' : 'my-4'
            }`}
        >
            <div className="flex flex-row items-center h-auto w-auto pb-4">
                <p className="mr-4">{index + 1}.</p>

                {edit ? (
                    <div className="flex flex-row justify-between items-center w-full">
                        <input
                            className={`w-3/4 ${inputStlye}`}
                            onBlur={handleQuestion}
                            defaultValue={question.question}
                            type="text"
                        ></input>
                        <button
                            className="w-auto h-auto"
                            onClick={deleteQuestion}
                        >
                            <TrashIcon className="w-8 h-8 text-gray-500 hover:text-gray-700" />
                        </button>
                    </div>
                ) : (
                    <p>{question.question}</p>
                )}
            </div>
            {question.choices.map((choice, index) => (
                <AnswerChoice
                    key={index}
                    index={index}
                    selectIndex={selectIndex}
                    selected={index === selected}
                    answerChoiceText={choice}
                    edit={edit}
                    handleAnswer={handleAnswer}
                ></AnswerChoice>
            ))}

            {edit ? (
                <div className="flex flex-row items-center py-2">
                    <p className="font-bold mr-4">
                        Correct Answer Choice [1-4]:
                    </p>
                    <input
                        className={inputStlye}
                        onBlur={handleCorrect}
                        defaultValue={String(question.correctChoice + 1)}
                        type="text"
                    ></input>
                </div>
            ) : null}
        </div>
    );
}
