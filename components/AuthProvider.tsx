import axios from 'axios';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { httpClient } from '../lib/axios';
import cookie from 'js-cookie';

type User = { displayName: string; email: string };

type LogInType = {
    email: string;
    password: string;
};

type AuthContextValue = {
    user: User | undefined;
    loading: boolean;
    signUp: () => Promise<void>;
    logIn: (data: LogInType) => Promise<number>;
    logOut: () => Promise<void>;
    requestPasswordReset: () => Promise<void>;
    resetPassword: () => Promise<void>;
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

    const getUser = async () => {
        try {
            setLoading(true);
            const response = await httpClient.get<any>('/me');
            if (response.data) {
                setUser(response.data);
            }
            setLoading(false);
        } catch (e: any) {}
    };

    const signUp = async () => {};

    const logIn = async (data: LogInType) => {
        try {
            setLoading(true);
            const response = await httpClient.post<any>('/sessions', data);
            setUser(response.data);
            setLoading(false);
            router.push('/');
            return 200;
        } catch (e: any) {
            return e.status;
        }
    };

    const logOut = async () => {
        try {
            await httpClient.delete<any>('/me/sessions');
            setUser(undefined);
        } catch (e: any) {}
        router.push('/');
    };

    const requestPasswordReset = async () => {};

    const resetPassword = async () => {};

    useEffect(() => {
        getUser();
    }, []);

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
