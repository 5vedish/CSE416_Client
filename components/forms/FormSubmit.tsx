const FormSubmit = ({ label }: { label?: string }) => {
    return (
        <div className="flex items-center justify-between">
            <input
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                type="submit"
                value={label ?? 'Submit'}
            />
        </div>
    );
};

export default FormSubmit;
