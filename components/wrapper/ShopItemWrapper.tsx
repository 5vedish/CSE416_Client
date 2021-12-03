const ShopItemWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col m-auto p-auto bg-gray-100">
            <div className="flex pb-10 overflow-y-auto">
                <div className="w-1/12"></div>
                {children}
            </div>
        </div>
    );
};

export default ShopItemWrapper;
