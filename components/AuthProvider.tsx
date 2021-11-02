import axios from 'axios';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { httpClient } from '../lib/axios';

import cookie from 'js-cookie';

type User = { displayName: string; email: string };

type Session = {
    sessionId: string;
    sessionCookieOptions: cookie.CookieAttributes;
};

type LogInType = {
    email: string;
    password: string;
};

type SignupType = {
    email: string;
    displayName: string;
    password: string;
};

type UpdateType =
    | {
          email: string;
          displayName: string;
      }
    | { password: string };

type AuthContextValue = {
    user: User | undefined;
    loading: boolean;
    signUp: (data: SignupType) => Promise<number>;
    logIn: (data: LogInType) => Promise<number>;
    logOut: () => Promise<void>;
    updateUser: (data: UpdateType) => Promise<void>;
    requestPasswordReset: (email: string) => Promise<void>;
    resetPassword: (token: string, password: string) => Promise<void>;
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

    const updateUser = async (data: UpdateType) => {
        // update password or update info
        try {
            await httpClient.patch<any>('/me', data);
            if (!('password' in data)) {
                setUser(data);
            }
            router.push('/');
        } catch (e: any) {}
    };

    const signUp = async (data: SignupType) => {
        try {
            console.log(data);
            await httpClient.post<any>('/users', data);
            router.push('/');
            return 200;
        } catch (e: any) {
            return e.status;
        }
    };

    const logIn = async (data: LogInType) => {
        try {
            setLoading(true);
            const response = await httpClient.post<any>('/sessions', data);
            if (response.data) {
                const { user, session } = response.data as {
                    user: User;
                    session: Session;
                };
                setUser(user);
                cookie.set(
                    'sessionId',
                    session.sessionId,
                    session.sessionCookieOptions,
                );
                setLoading(false);
                router.push('/');
                return 200;
            }
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

    const requestPasswordReset = async (email: string) => {
        try {
            await httpClient.post<any>('/password_resets', { email });
        } catch (e: any) {}
        router.push('/');
    };

    const resetPassword = async (token: string, password: string) => {
        try {
            await httpClient.put('/password_resets', {
                password,
                token,
            });
        } catch (e: any) {}

        router.push('/');
    };

    useEffect(() => {
        getUser();
    }, []);

    return {
        user,
        loading,
        signUp,
        logIn,
        logOut,
        updateUser,
        requestPasswordReset,
        resetPassword,
    };
}
