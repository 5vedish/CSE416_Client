import React, { useState, SetStateAction } from 'react'
import AnswerChoice from "./AnswerChoice"
import CreateQuiz from "./CreateQuiz"
import Question from "./Question"
import Submit from "./Submit"
import axios from 'axios'

export default function Quiz({ question, answers, id }: { question: string, answers: string[], id: number }) {
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
    function return_value(num: number) {
        switch (num) {
            case -1:
                return "--"
            case 0:
                return "A"
            case 1:
                return "B"
            case 2:
                return "C"
            case 3:
                return "D"
            default:
                break;
        }
    }
    const submit = async () => {
        // 1. api returns correct answer
        // const answerResult = await axios.get(`${BASE_API_URL}/questions/QUESTION_ID`)
        // if answerChoice === answerResult.data.correctChoice ... else ...
        // 2. api returns boolean
        // const answerResult = await axios.get(`${BASE_API_URL}/questions/QUESTION_ID?answerChosen=${answerChosen}`)
        // if answerResult.data.isCorrect ... else ...


        const answerResult = await axios.get('https://cse416-demo-api.herokuapp.com/questions/1');
        if (!answerResult) {
            console.log('error');
            return;
        }

        const { correctChoice } = answerResult.data;

        if (answerChosen === correctChoice) {
            setCorrect(true)
        } else if (answerChosen === -1) {
            // alert("Please select an answer.")
        } else {
            setCorrect(false)
        }
    }

    return (
        <div className="w-full h-screen bg-blue-200">

            <form className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {/* <CreateQuiz func={createQuiz}/> */}
                <Question text={question} id={id}/>
                {
                    answers.map((ans, index)=>(
                        <AnswerChoice key={ans + index} text={ans} index={index} func={func} selectedIndex={answerChosen}/>
                    ))
                }
                
                <Submit choice={answerChosen} func={submit} setChosen={setChosen} setCorrect={setCorrect}/>
                {
                correct !== null && (correct ? <p className="font-bold text-3xl text-green-400">Correct!</p > : <p className="font-bold text-3xl text-red-400">Incorrect. Try Again?</p>)
                }
                
            </form>
        </div>
    )
}
