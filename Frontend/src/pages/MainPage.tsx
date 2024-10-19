import { useEffect, useState } from 'react';
import EncryptDecryptForm from '../components/EncryptDecryptForm';
import { useNavigate } from 'react-router-dom';
import verifyUserAuthentication from '../util/verifyUser';
import Loading from './Loading';
import { setTimeoutTime } from '../util/constants';

const MainPage = () => {
    const [, setResult] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            await verifyUserAuthentication(navigate);
            setTimeout(() => {
                setLoading(false);
            }, setTimeoutTime);
        };
        verifyAuth();
    }, [navigate]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8 flex flex-col items-center">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-teal-400">Encryption & QR Code App</h1>
                <p className="text-lg text-gray-400 mt-2">
                    Secure your messages with encryption and easily share them using QR codes.
                </p>
            </header>

            {/* Button to go back to Landing Page */}
            <button
                className="bg-red-500 text-white p-3 rounded-lg mb-6 hover:bg-red-600 transition-all"
                onClick={() => navigate('/')}
            >
                Go Back to Landing Page
            </button>

            <EncryptDecryptForm onResult={setResult} />

            {/* QR Code Scanner */}
            <div className="mt-12 w-full max-w-lg">
                {/* <QRScanner /> */}
            </div>
        </div>
    );
};

export default MainPage;
