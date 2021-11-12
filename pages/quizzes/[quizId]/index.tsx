import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import { httpClient } from '../../../lib/axios';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import Quiz from '../../../components/quiz/Quiz';
import QuizContainer from '../../../components/fixed_quiz/QuizContainer';

const QuizPage: NextPage = () => {
    const router = useRouter();
    const [questionData, setQuestionData] = useState<Question | null>(null);
    const [quizId, setQuizId] = useState(-1);

    const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);

    const refetch = async () => {
        const { quizId } = router.query;
        console.log(quizId);
        if (quizId) {
            const result: AxiosResponse<Quiz> = await httpClient.get(
                `/quizzes/${quizId}`,
            );
            console.log(result.data);
            if (result.data && result.data.questions.length > 0) {
                setQuestionData(result.data.questions[0]);
                setQuizId(result.data.id);
                setQuizQuestions(result.data.questions);
            } else {
                setQuestionData(null);
                setQuizId(-1);
                setQuizQuestions([]);
            }
        }
    };

    const memoizedRefetch = useCallback(refetch, [router.query]);

    useEffect(() => {
        (async () => {
            await memoizedRefetch();
        })();
    }, [router.query, memoizedRefetch]);
    return (
        <>
            <Navbar currency={false} />
            {questionData && (
                <QuizContainer
                    quizQuestions={quizQuestions}
                    edit={Boolean(router.query.edit)}
                />
            )}
        </>
    );
};

export default QuizPage;
