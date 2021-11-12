export default function AnswerChoice({
    index,
    selectIndex,
    selected,
    answerChoiceText,
    edit,
}: {
    index: number;
    selectIndex: (num: number) => void;
    selected: boolean;
    answerChoiceText: string;
    edit: boolean;
}) {
    return (
        <div>
            <label
                className={`inline-flex items-center ${edit ? ' py-2' : ''}`}
            >
                <input
                    type="radio"
                    className="form-radio text-blue-500 border border-black"
                    onClick={() => selectIndex(index)}
                    checked={selected}
                    disabled={edit}
                />
                {edit ? (
                    <input
                        className="border-2 border-gray-200 rounded w-auto h-auto p-2 ml-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        onBlur={() => {
                            console.log('Handled');
                        }}
                        defaultValue={answerChoiceText}
                        type="text"
                    ></input>
                ) : (
                    <span className="ml-2"> {answerChoiceText} </span>
                )}
            </label>
        </div>
    );
}
