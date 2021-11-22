const ShopItemWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col m-auto p-auto bg-gray-100">
            <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                <div className="w-1/12"></div>
                {children}
            </div>
        </div>
    );
};

export default ShopItemWrapper;
