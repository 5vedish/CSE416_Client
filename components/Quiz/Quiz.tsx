import React, { useState, SetStateAction } from 'react';
import AnswerChoice from '../question/AnswerChoice';
import DeleteQuiz from './DeleteQuiz';
import Question from '../question/Question';
import Submit from './Submit';
import axios from 'axios';
import Navbar from '../Navbar';
import { httpClient } from '../../lib/axios';

export default function Quiz({
    question,
    answers,
    id,
    correctChoice,
    refetch,
    deleteQuiz,
}: {
    question: string;
    answers: string[];
    id: number;
    correctChoice: number;
    refetch: () => Promise<void>;
    deleteQuiz: () => Promise<void>;
}) {
    const [answerChosen, setChosen] = useState(-1);
    const [correct, setCorrect] = useState<boolean | null>(null);
    const [choices, setChoices] = useState(answers); // editing answer set
    const submit = async () => {
        console.log(answerChosen, correctChoice);
        setCorrect(answerChosen === correctChoice);
    };

    const editChoices = async (newChoice: string, newChoiceIndex: number) => {
        const newChoices = choices.map((choice, index) => {
            if (index === newChoiceIndex) {
                return newChoice;
            }
            return choice;
        });
        console.log(newChoices);
        await httpClient.put(`/questions/${id}`, {
            question,
            choices: newChoices,
            correctChoice,
        });
        setChoices(newChoices);
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
                    id={id}
                    choices={answers}
                    correctChoice={answerChosen}
                />
                {answers.map((ans, index) => (
                    <AnswerChoice
                        refetch={refetch}
                        key={ans + index}
                        text={ans}
                        index={index}
                        selectChoice={(num) => {
                            setChosen(num);
                        }}
                        selectedIndex={answerChosen}
                        editChoices={editChoices}
                    />
                ))}

                <Submit
                    choice={answerChosen}
                    func={submit}
                    setChosen={setChosen}
                    setCorrect={setCorrect}
                />
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
                <DeleteQuiz deleteQuiz={deleteQuiz} />
            </form>
        </div>
    );
}
