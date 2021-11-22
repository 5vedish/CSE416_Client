import axios from 'axios';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { httpClient } from '../../lib/axios';

import cookie from 'js-cookie';

type User = {
    displayName: string;
    email: string;
    currency: number;
    id: number;
};

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
          currency: number;
          id: number;
      }
    | { password: string };

type AuthContextValue = {
    user: User | undefined;
    loading: boolean;
    getUser: () => Promise<void>;
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
            const response = await httpClient.get<any>('/me', {
                withCredentials: true,
            });
            if (response.data) {
                setUser(response.data);
            }
            setLoading(false);
        } catch (e: any) {}
    };

    const updateUser = async (data: UpdateType) => {
        // update password or update info
        try {
            await httpClient.patch<any>('/me', data, { withCredentials: true });
            if (!('password' in data)) {
                setUser(data);
            }
            router.push('/');
        } catch (e: any) {}
    };

    const signUp = async (data: SignupType) => {
        try {
            console.log(data);
            await httpClient.post<any>('/users', data, {
                withCredentials: true,
            });
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
                // const { user, session } = response.data as {
                //     user: User;
                //     session: Session;
                // };
                // console.log('setting session');
                // if (session.sessionCookieOptions.expires) {
                //     session.sessionCookieOptions.expires = new Date(
                //         session.sessionCookieOptions.expires,
                //     );
                // }

                // console.log(session);
                setUser(response.data.user);
                getUser();

                // cookie.set(
                //     'sessionId',
                //     session.sessionId,
                //     session.sessionCookieOptions,
                // );
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
            await httpClient.delete<any>('/me/sessions', {
                withCredentials: true,
            });
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
        getUser,
    };
}
