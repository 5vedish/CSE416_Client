import { AxiosResponse } from 'axios';
import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import Quiz from '../components/Quiz';
import CreateQuiz from '../components/CreateQuiz';
import { httpClient } from '../lib/axios';

interface Quiz {
    id: number;
    choices: [string];
    correctChoice: number;
    question: string;
}

const Home: NextPage = () => {
    const [quizId, setQuizId] = useState(-1);
    useEffect(() => {
        const savedId = localStorage.getItem('quizId');
        if (savedId) setQuizId(parseInt(savedId));
    }, []);
    const [quizData, setQuizData] = useState<Quiz | null>(null);
    const refetchQuiz = async () => {
        await httpClient
            .get(`/questions/${quizId}`)
            .then((answerResult) => {
                if (answerResult.data) {
                    const quiz: Quiz = answerResult.data;
                    setQuizData(quiz);
                }
            })
            .catch((e) => {
                return;
            });
    };
    const memoizedRefetch = useCallback(refetchQuiz, [quizId]);
    useEffect(() => {
        if (quizId > 0) {
            memoizedRefetch();
        } else {
            setQuizData(null);
        }
        localStorage.setItem('quizId', quizId.toString());
    }, [quizId, memoizedRefetch]);
    const createQuiz = async () => {
        const answerResult: AxiosResponse<{ id: number }> =
            await httpClient.post('/questions', {
                question: 'Edit question text',
                choices: ['correct', 'inccorect', 'incorrect', 'incorrect'],
                correctChoice: 0,
            });
        if (!answerResult) {
            console.log('error');
            return;
        }
        console.log(answerResult.data);
        setQuizId(answerResult.data.id);
    };
    const deleteQuiz = async () => {
        if (quizId < 0) return;
        await httpClient.delete(`/questions/${quizId}`);
        setQuizId(-1);
    };
    return quizData ? (
        <Quiz
            refetch={refetchQuiz}
            correctChoice={quizData.correctChoice}
            question={quizData.question}
            answers={quizData.choices}
            id={quizData.id}
            deleteQuiz={deleteQuiz}
        />
    ) : (
        <CreateQuiz createQuiz={createQuiz} />
    );
};

export default Home;
