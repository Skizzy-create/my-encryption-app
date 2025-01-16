// src/pages/MainPage2.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EncryptDecryptForm from '../components/EncryptDecryptForm';
import verifyUserAuthentication from '../util/verifyUser';
import PopUp from '../components/PopUp';
import Loading from './Loading';
import { setTimeoutTime } from '../util/constants';
import UserMenu from '../components/Header/UserMenu';
import PageLayout from '../components/Layout/PageLayout';

const MainPage2 = () => {
    const [_, setResult] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<{ id: string; firstName: string } | null>(null);
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            const authenticatedUser = await verifyUserAuthentication();
            if (authenticatedUser) {
                setUser(authenticatedUser);
            } else {
                setShowWarning(true);
            }
            setTimeout(() => setLoading(false), setTimeoutTime);
        };
        verifyAuth();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/SignUp");
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <PageLayout>
            <header className="text-center mb-8 flex items-center justify-between w-full">
                <h1 className="text-4xl font-extrabold text-white mx-auto -mr-14">
                    My Encrypt
                </h1>
                <UserMenu user={user} onLogout={handleLogout} />
            </header>

            {showWarning && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <PopUp
                        label="Authentication Error"
                        message="You are not signed in. Please sign in."
                        onClose={() => setShowWarning(false)}
                    />
                </div>
            )}

            <button
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-lg mb-6 hover:bg-red-600 transition-all"
                onClick={() => navigate('/')}
            >
                Go Back to Landing Page
            </button>

            <div className="bg-white bg-opacity-60 p-8 rounded-lg shadow-xl w-full max-w-lg">
                <EncryptDecryptForm onResult={setResult} />
            </div>
        </PageLayout>
    );
};

export default MainPage2;