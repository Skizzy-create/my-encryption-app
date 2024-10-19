import { FaGithub, FaSignInAlt, FaUserPlus, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Velustro } from "uvcanvas";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen w-full">
            <div className="absolute inset-0 z-0">
                <Velustro />
            </div>

            <div className="absolute inset-0 z-10 bg-white bg-opacity-50 flex flex-col items-center justify-center p-4">

                <header className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-center">
                    <div className="flex space-x-2 sm:space-x-4">
                        <button
                            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full flex items-center space-x-2 transition-all hover:from-blue-600 hover:to-blue-800 shadow-lg"
                            onClick={() => navigate("/SignUp")}
                        >
                            <FaUserPlus />
                            <span>Sign Up</span>
                        </button>
                        <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full flex items-center space-x-2 transition-all hover:from-purple-600 hover:to-purple-800 shadow-lg"
                            onClick={() => navigate("/SignIn")}
                        >
                            <FaSignInAlt />
                            <span>Sign In</span>
                        </button>
                    </div>
                </header>

                <main className="flex-1 flex flex-col justify-center items-center text-center">
                    <h1 className="text-2xl sm:text-4xl text-gradient font-bold mb-4">
                        My Encryption App
                    </h1>
                    <p className="text-base sm:text-lg text-gray-700 mb-4">
                        Secure your data with ease and confidence. Encrypt, decrypt, and ensure your privacy.
                    </p>
                    <button
                        className="bg-gradient-to-r from-blue-500 to-purple-700 text-white px-6 sm:px-8 py-3 rounded-full flex items-center space-x-2 transition-all hover:from-blue-600 hover:to-purple-800 shadow-lg"
                        onClick={() => navigate("/SignUp")}
                    >
                        <FaLock />
                        <span>Get Started</span>
                    </button>
                </main>

                <footer className="flex justify-center mt-6">
                    <a
                        href="https://github.com/AsliaDev/my-encryption-app"
                        className="flex items-center space-x-2 text-gray-700 hover:text-black transition-all"
                        target="_blank"
                    >
                        <FaGithub />
                        <span>View on GitHub</span>
                    </a>
                </footer>
            </div>
        </div>
    );
};

export default Landing;
