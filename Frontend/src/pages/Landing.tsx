import React from "react";
import { FaGithub, FaSignInAlt, FaUserPlus, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Velustro } from "uvcanvas";

interface LandingProps {
    onNavigateToMain: () => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigateToMain }) => {
    const navigate = useNavigate();
    return (
        <div className="relative min-h-screen w-full">
            <div className="absolute inset-0 z-0">
                <Velustro />
            </div>

            {/* Overlay with 50% white opacity */}
            <div className="absolute inset-0 z-10 bg-white bg-opacity-50 flex flex-col items-center justify-center">

                {/* Header */}
                <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
                    <div className="flex space-x-4">
                        <button
                            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all hover:from-blue-600 hover:to-blue-800 shadow-lg"
                            onClick={() => navigate("/SignUp")}
                        >
                            <FaUserPlus />
                            <span>Sign Up</span>
                        </button>
                        <button className="bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all hover:from-green-600 hover:to-green-800 shadow-lg"
                            onClick={() => navigate("/SignIn")}
                        >
                            <FaSignInAlt />
                            <span>Login</span>
                        </button>
                    </div>
                    <a
                        href="https://github.com/Skizzy-create/my-encryption-app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all hover:bg-gray-900 shadow-lg"
                    >
                        <FaGithub />
                        <span>GitHub</span>
                    </a>
                </header>

                {/* Main Content */}
                <div className="text-center mt-16">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mb-8">
                        MyEncrypt: Secure Your Messages
                    </h1>
                    <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
                        My Encryption App offers a secure, easy-to-use interface for encrypting and decrypting your messages. Simply choose your encryption method, enter a message, and receive your encrypted result. Generate a QR code for easy sharing, which can be scanned and decrypted directly from the app.
                    </p>
                    <button
                        onClick={onNavigateToMain}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full text-2xl flex items-center space-x-2 hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl"
                    >
                        <FaLock />
                        <span>Encrypt Now</span>
                    </button>
                </div>

                {/* Footer */}
                <footer className="absolute bottom-0 p-4 text-gray-600 text-sm">
                    <p>© 2024 MyEncrypt | Version 2.2</p>
                </footer>
            </div>
        </div>
    );
};

export default Landing;
