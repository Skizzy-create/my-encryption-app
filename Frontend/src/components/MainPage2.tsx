import { useEffect, useState } from 'react';
import EncryptDecryptForm from './EncryptDecryptForm';
import { useNavigate } from 'react-router-dom';
import verifyUserAuthentication from '../util/verifyUser';
import PopUp from './PopUp';
import Loading from '../pages/Loading';
import { setTimeoutTime } from '../util/constants';

const MainPage2 = () => {
    const [, setResult] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<{ id: string; firstName: string } | null>(null);
    const [showWarning, setShowWarning] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            const authenticatedUser = await verifyUserAuthentication(navigate);
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
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-blue-500 p-8 flex flex-col items-center">
            <header className="text-center mb-8 flex items-center justify-between w-full">
                <h1 className="text-4xl font-extrabold text-white mx-auto -mr-14">
                    My Encrypt
                </h1>
                <div className="relative ml-auto">
                    {user ? (
                        <button
                            className="bg-gradient-to-br from-purple-600 to-blue-500 text-white p-3 rounded-full hover:bg-teal-500 transition-all text-xl font-bold h-14 w-14"
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            {user.firstName.charAt(0).toUpperCase()}
                        </button>
                    ) : (
                        <button
                            className="bg-gray-400 text-white rounded-full hover:bg-gray-500 transition-all text-xl font-bold h-14 w-14"
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            ?
                        </button>
                    )}
                    {showMenu && (
                        <div
                            className="absolute top-16 right-0 bg-white bg-opacity-80 p-2 rounded shadow-lg w-32"
                            style={{ top: "60px", right: "0px" }}
                        >
                            {user ? (
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left p-2 hover:bg-red-100"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate("/SignIn")}
                                        className="block w-full text-left p-2 hover:bg-blue-100"
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        onClick={() => navigate("/SignUp")}
                                        className="block w-full text-left p-2 hover:bg-green-100"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
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

            {/* Back Button */}
            <button
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-lg mb-6 hover:bg-red-600 transition-all"
                onClick={() => navigate('/')}
            >
                Go Back to Landing Page
            </button>

            <div className="bg-white bg-opacity-60 p-8 rounded-lg shadow-xl w-full max-w-lg">
                <EncryptDecryptForm onResult={setResult} />
            </div>

            {/* Footer */}
            <div className='mt-16 text-white'>
                <p className="text-sm">© 2024 MyEncrypt | Version 3.2.1</p>
            </div>
        </div>
    );
};

export default MainPage2;
