import React, { useState } from 'react';

type User = { id: string; displayName: string; email: string };

type AuthContextValue = {
    user: User | undefined;
    loading: boolean;
    signUp: () => void;
    logIn: () => void;
    logOut: () => void;
    requestPasswordReset: () => void;
    resetPassword: () => void;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(
    undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <AuthContext.Provider value={useAuthProvider()}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return React.useContext(AuthContext);
}

function useAuthProvider() {
    const [user, setUser] = useState<User | undefined>();
    const [loading, setLoading] = useState(true);

    const signUp = () => {};

    const logIn = () => {};

    const logOut = () => {};

    const requestPasswordReset = () => {};

    const resetPassword = () => {};

    return {
        user,
        loading,
        signUp,
        logIn,
        logOut,
        requestPasswordReset,
        resetPassword,
    };
}
