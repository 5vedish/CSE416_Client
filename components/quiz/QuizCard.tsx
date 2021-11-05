import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';

export default function QuizCard({
    title,
    time,
    questions,
    difficulty,
    quizId,
}: {
    title: string;
    time: number;
    questions: number;
    difficulty: string;
    quizId: number;
}) {
    return (
        <div className="flex justify-center py-8">
            <div className="rounded-xl w-10/12 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="text-center font-logo">{title}</div>
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
                            Hard: (
                                <span className="font-extrabold text-red-500">
                                    {difficulty}
                                </span>
                            ),
                            Medium: (
                                <span className="font-extrabold text-yellow-500">
                                    {difficulty}
                                </span>
                            ),
                            Easy: (
                                <span className="font-extrabold text-green-500">
                                    {difficulty}
                                </span>
                            ),
                        }[difficulty]
                    }
                </div>
                <div className="flex-inline flex-row flex mt-2">
                    <button className="mr-2 hover:bg-gray-300">
                        <PencilAltIcon className="w-8 h-8"></PencilAltIcon>
                    </button>

                    <button>
                        <TrashIcon className="w-8 h-8 hover:bg-gray-300"></TrashIcon>
                    </button>
                </div>
            </div>
        </div>
    );
}
