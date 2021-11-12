import 'tailwindcss/tailwind.css';
import { AuthProvider } from '../components/utils/AuthProvider';

import type { AppProps } from 'next/app';
import { ModalProvider } from '../components/utils/ModalProvider';
import CreatePlatformModal from '../components/platform/CreatePlatformModal';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <ModalProvider>
                <Component {...pageProps} />
                <CreatePlatformModal />
            </ModalProvider>
        </AuthProvider>
    );
}
export default MyApp;
