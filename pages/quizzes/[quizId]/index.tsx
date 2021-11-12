import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import { httpClient } from '../../../lib/axios';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../../../components/utils/AuthProvider';
import QuizContainer from '../../../components/fixed_quiz/QuizContainer';

const QuizPage: NextPage = () => {
    const router = useRouter();
    const [quizData, setQuizData] = useState<{
        id: number;
        title: string;
        difficulty: string;
        time: number;
    } | null>(null);

    const [quizId, setQuizId] = useState(-1);

    const { user } = useAuth();
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
                const qdata = {
                    id: result.data.id,
                    title: result.data.title,
                    difficulty: result.data.difficulty,
                    time: result.data.maxTime,
                };
                setQuizData(qdata);
                setQuizId(result.data.id);
                setQuizQuestions(result.data.questions);
            } else {
                setQuizData(null);
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
            <Navbar />
            {quizData && (
                <QuizContainer
                    quizQuestions={quizQuestions}
                    edit={Boolean(router.query.edit)}
                    quizId={quizData.id}
                    quizTitle={quizData.title}
                    difficulty={quizData.difficulty}
                    time={quizData.time}
                    refetch={refetch}
                />
            )}
        </>
    );
};

export default QuizPage;
