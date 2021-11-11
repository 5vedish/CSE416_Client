import { NextPage } from 'next';
import { memo, useCallback, useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import { intervalToDuration, formatDuration, add } from 'date-fns';
import Link from 'next/link';
import { httpClient } from '../../../lib/axios';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import Quiz from '../../../components/quiz/Quiz';

const QuizPage: NextPage = () => {
    const router = useRouter();
    const [questionData, setQuestionData] = useState<Question | null>(null);
    const [quizId, setQuizId] = useState(-1);

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
            } else {
                setQuestionData(null);
                setQuizId(-1);
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
            <Navbar currency={true} />
            {questionData && (
                <Quiz
                    quizId={quizId}
                    questionId={questionData.id}
                    correctChoice={questionData.correctChoice}
                    question={questionData.question}
                    answers={questionData.choices}
                    refetch={refetch}
                    deleteQuiz={async () => {}}
                    edit={Boolean(router.query.edit)}
                />
            )}
        </>
    );
};

export default QuizPage;
