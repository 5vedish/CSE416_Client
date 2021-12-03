const FormHeader = ({
    label,
    additionalStyles,
}: {
    label: string;
    additionalStyles?: string;
}) => {
    return (
        <div className="mb-4">
            <label
                className={`block text-gray-700 text-2xl mb-4 font-bold ${additionalStyles}`}
            >
                {label}
            </label>
        </div>
    );
};

export default FormHeader;
