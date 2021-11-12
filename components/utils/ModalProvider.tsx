import React, { useState } from 'react';

type ModalContextValue = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContext = React.createContext<ModalContextValue | undefined>(
    undefined,
);

export function ModalProvider({ children }: { children: React.ReactNode }) {
    return (
        <ModalContext.Provider value={useModalProvider()}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = React.useContext(ModalContext);

    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }

    return context;
}

function useModalProvider(): ModalContextValue | undefined {
    const [isOpen, setIsOpen] = useState(false);
    return {
        isOpen,
        setIsOpen,
    };
}
