const FormHeader = ({ label }: { label: string }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-2xl mb-4 font-bold">
                {label}
            </label>
        </div>
    );
};

export default FormHeader;
