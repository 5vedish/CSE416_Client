import axios, { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Quiz from '../components/Quiz'
import CreateQuiz from '../components/CreateQuiz'


interface Quiz {
  id: number
  choices: [string]
  correctChoice: number
  question: string
};



const Home: NextPage = () => {
  const question = "What is the meaning of life?"
  const answers = ["41", "42", "43", "44"]
  const [quizId, setQuizId] = useState(-1);
  const [quizData, setQuizData] = useState<Quiz | null>(null);
  useEffect(() => {
    if (quizId > 0) {
      (async () => {
        const answerResult = await axios.get(`https://qiz-api.herokuapp.com/questions/${quizId}`);
        if (answerResult.data) {
          const quiz: Quiz = answerResult.data;
          setQuizData(quiz);
        }
  
      })();
    } else {
      setQuizData(null);
    }
  }, [quizId]);
  const createQuiz = async () => {
    const answerResult: AxiosResponse<{id: number}> = await axios.post('https://qiz-api.herokuapp.com/questions', {
      question: "Edit question text",
      choices: ["correct", "inccorect", "incorrect", "incorrect"],
      correctChoice: 0
    });
    if (!answerResult) {
        console.log('error');
        return;
    }
    console.log(answerResult.data)
    setQuizId(answerResult.data.id);
  }
  return (quizData ? <Quiz question={quizData.question} answers={quizData.choices}/> : <CreateQuiz createQuiz={createQuiz}/>);
}

// if (quiz == 0){
//   return (
//     <Quiz question={question} answers={answers}></Quiz>
//   )
// }
// else if (quiz == 1){
//   return (
//     <CreateQuiz></Create>
//   )
// }


export default Home
