import React, { useState, SetStateAction } from 'react'
import AnswerChoice from "../Question/AnswerChoice"
import DeleteQuiz from "./DeleteQuiz"
import Question from "../Question"
import Submit from "./Submit"
import Navbar from '../Navbar'

export default function Quiz({ question, answers, id, correctChoice, refetch, deleteQuiz }: { question: string, answers: string[], id: number, correctChoice: number, refetch: () => Promise<void>, deleteQuiz: () => Promise<void> }) {
    const [answerChosen, setChosen] = useState(-1)
    const [correct, setCorrect] = useState<boolean | null>(null);
    const func = async (num: number) => {
        if (answerChosen == num) {
            setChosen(-1)
        }
        else {
            setChosen(num)
        }
    }
    const submit = async () => {
        setCorrect(answerChosen === correctChoice);
    }

    return (
        <div className="w-full h-screen bg-blue-200">
            <Navbar />
            <form className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <Question refetch={refetch} text={question} id={id} />
                {
                    answers.map((ans, index) => (
                        <AnswerChoice key={ans + index} text={ans} index={index} func={func} selectedIndex={answerChosen} />
                    ))
                }
                <Submit choice={answerChosen} func={submit} setChosen={setChosen} setCorrect={setCorrect} />
                {
                    correct !== null && (correct ? <p className="font-bold text-3xl text-green-400">Correct!</p > : <p className="font-bold text-3xl text-red-400">Incorrect. Try Again?</p>)
                }
                <DeleteQuiz deleteQuiz={deleteQuiz} />
            </form>
        </div>
    )
}
