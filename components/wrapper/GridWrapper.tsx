const GridWrapper = ({ children }: { children: React.ReactNode }) => {
    return <div className="grid grid-cols-2 gap-1">{children}</div>;
};

export default GridWrapper;
