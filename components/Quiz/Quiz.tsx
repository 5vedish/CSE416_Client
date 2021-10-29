import React, { useState, SetStateAction } from 'react';
import AnswerChoice from '../Question/AnswerChoice';
import DeleteQuiz from './DeleteQuiz';
import Question from '../Question/Question';
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
    const func = async (num: number) => {
        if (answerChosen == num) {
            setChosen(-1);
        } else {
            setChosen(num);
        }
    };
    const submit = async () => {
        setCorrect(answerChosen === correctChoice);
    };

    const editChoices = async (newChoice: string, index: number) => {
        setChoices(choices.splice(index, 1, newChoice));
        const result = await httpClient.put(`/questions/${id}`, {
            question,
            choices,
            correctChoice,
        });
    };

    return (
        <div className="w-full h-screen bg-blue-200">
            <Navbar />
            <form className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <Question refetch={refetch} text={question} id={id} />
                {answers.map((ans, index) => (
                    <AnswerChoice
                        refetch={refetch}
                        key={ans + index}
                        text={ans}
                        index={index}
                        func={func}
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
