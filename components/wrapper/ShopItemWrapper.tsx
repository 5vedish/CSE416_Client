const ShopItemWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col m-auto p-auto bg-gray-100">
            <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                {children}
            </div>
        </div>
    );
};

export default ShopItemWrapper;
