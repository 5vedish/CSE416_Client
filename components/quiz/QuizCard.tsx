import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { httpClient } from '../../lib/axios';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import Link from 'next/link';

export default function QuizCard({
    id,
    title,
    time,
    questions,
    difficulty,
    quizId,
    refetch,
}: {
    id: number;
    title: string;
    time: number;
    questions: number;
    difficulty: string;
    quizId: number;
    refetch: () => Promise<void>;
}) {
    const router = useRouter();
    const startQuiz = async () => {
        await httpClient
            .post<{ attemptId: number }>(`/quizzes/${id}/attempts`)
            .then((result) => {
                if (result.data) {
                    console.log(id);
                    router.push(
                        `/quizzes/${id}?attempt=${result.data.attemptId}`,
                    );
                }
            })
            .catch((e) => {});
    };

    const deleteQuiz = async () => {
        await httpClient.delete(`/quizzes/${id}`);
        await refetch();
    };

    return (
        <div className="flex justify-center py-8">
            <div className="w-10/12 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div
                    className="text-center font-logo cursor-pointer hover:bg-gray-100"
                    onClick={startQuiz}
                >
                    {title}
                </div>
                <div className="mt-8">
                    <span> Time: </span>
                    <span className="font-extrabold"> {time} </span>
                </div>
                <div>
                    <span>Questions: </span>
                    <span className="font-extrabold"> {questions} </span>
                </div>
                <div>
                    <span>Difficulty: </span>
                    {
                        {
                            HARD: (
                                <span className="font-extrabold text-red-500">
                                    {difficulty}
                                </span>
                            ),
                            MEDIUM: (
                                <span className="font-extrabold text-yellow-500">
                                    {difficulty}
                                </span>
                            ),
                            EASY: (
                                <span className="font-extrabold text-green-500">
                                    {difficulty}
                                </span>
                            ),
                        }[difficulty]
                    }
                </div>
                <div className="flex-inline flex-row flex mt-2">
                    <button className="mr-2 hover:bg-gray-300">
                        <Link href={`/quizzes/${quizId}?edit=true`} passHref>
                            <a>
                                <PencilAltIcon className="w-8 h-8"></PencilAltIcon>
                            </a>
                        </Link>
                    </button>

                    <button onClick={deleteQuiz}>
                        <TrashIcon className="w-8 h-8 hover:bg-gray-300"></TrashIcon>
                    </button>
                </div>
            </div>
        </div>
    );
}
