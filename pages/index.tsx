import type { NextPage } from 'next'
import Quiz from '../components/Quiz'

const Home: NextPage = () => {
  const question = "What is the meaning of life?"
  const answers = ["41", "42", "43", "44"]
  return (
    <Quiz question={question} answers={answers}></Quiz>
  )
}

export default Home
