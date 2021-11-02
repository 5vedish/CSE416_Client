export default function QuizCard({
    title,
    time,
    questions,
    difficulty,
}: {
    title: string;
    time: string;
    questions: number;
    difficulty: string;
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
                    <span className="font-extrabold text-red-500">
                        {difficulty}
                    </span>
                </div>
            </div>
        </div>
    );
}
