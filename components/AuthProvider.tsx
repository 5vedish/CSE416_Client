import axios from 'axios';
import React, { useState } from 'react';
import { httpClient } from '../lib/axios';

type User = { id: string; displayName: string; email: string };

type LogInType = {
    email: string;
    password: string;
};

type AuthContextValue = {
    user: User | undefined;
    loading: boolean;
    signUp: () => void;
    logIn: (data: LogInType) => void;
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
    const context = React.useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

function useAuthProvider() {
    const [user, setUser] = useState<User | undefined>();
    const [loading, setLoading] = useState(true);

    const signUp = () => {};

    const logIn = async (data: LogInType) => {
        console.log(data);
        httpClient.post('/sessions', data);
    };

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
