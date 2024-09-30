import React, { useState } from 'react';
import EncryptDecryptForm from '../components/EncryptDecryptForm';
import QRCodeGenerator from '../components/QRCodeGenerator';
import QRScanner from '../components/QRScanner';
import ResultDisplay from '../components/ResultDisplay';

interface MainPageProps {
    onNavigateToLanding: () => void;
}

const MainPage: React.FC<MainPageProps> = ({ onNavigateToLanding }) => {
    const [result, setResult] = useState('');

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
                onClick={onNavigateToLanding}
                className="bg-red-500 text-white p-3 rounded-lg mb-6 hover:bg-red-600 transition-all"
            >
                Go Back to Landing Page
            </button>

            {/* Encryption/Decryption Form */}
            <EncryptDecryptForm onResult={setResult} />

            {/* Display Results and QR Code */}
            {result && (
                <div className="mt-8 flex flex-col items-center">
                    <ResultDisplay result={result} />
                    <QRCodeGenerator encryptedMessage={result} />
                </div>
            )}

            {/* QR Code Scanner */}
            <div className="mt-12 w-full max-w-lg">
                <QRScanner />
            </div>
        </div>
    );
};

export default MainPage;
