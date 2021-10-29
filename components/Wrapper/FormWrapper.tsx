const FormWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="space-y-10">
                <div className="text-center font-logo text-6xl text-blue-500">
                    Qiz
                </div>
                <div className="">{children}</div>
            </div>
        </div>
    );
};

export default FormWrapper;
