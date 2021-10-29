import 'tailwindcss/tailwind.css';
import { AuthProvider } from '../components/AuthProvider';
import Head from 'next/head';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Component {...pageProps} />;
        </AuthProvider>
    );
}
export default MyApp;
