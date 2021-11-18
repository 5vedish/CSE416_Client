const ShopItemWrapper = ({ children }: { children: React.ReactNode }) => {
    return <div className="grid grid-cols-8 gap-1">{children}</div>;
};

export default ShopItemWrapper;
