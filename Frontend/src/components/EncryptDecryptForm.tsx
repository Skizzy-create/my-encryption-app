import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react'; // Import QR code generator library
import QrScanner from 'qr-scanner'; // Import QR scanning library
import QRScanner from './QRScanner';

const supportedAlgosObj = {
    'AES256': 'aes-256-cbc',
    'AES192': 'aes-192-cbc',
    'AES128': 'aes-128-cbc',
    'DES-EDE': 'des-ede-cbc',
    'DES-EDE3': 'des-ede3-cbc',
    'CAMELLIA-128': 'camellia-128-cbc',
    'CAMELLIA-192': 'camellia-192-cbc',
    'CAMELLIA-256': 'camellia-256-cbc',
    'ARIA-128': 'aria-128-cbc',
    'ARIA-192': 'aria-192-cbc',
    'ARIA-256': 'aria-256-cbc',
    'SM4': 'sm4-cbc',
} as const;

interface FormProps {
    onResult: (result: string) => void;
}

const EncryptDecryptForm: React.FC<FormProps> = ({ onResult }) => {
    const [formData, setFormData] = useState({
        message: '',
        algo: 'AES256',
    });

    const [action, setAction] = useState<'encrypt' | 'decrypt'>('encrypt');
    const [result, setResult] = useState<string | null>(null);
    const qrRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [copySuccess, setCopySuccess] = useState('');
    const [scannedQRResult, setScannedQRResult] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const endpoint =
                action === 'encrypt'
                    ? 'https://my-encryption-app.onrender.com/api/v1/messages/encrypt'
                    : 'https://my-encryption-app.onrender.com/api/v1/messages/decrypt';

            const response = await axios.post(endpoint, { message: formData.message, algo: formData.algo });
            let resultMessage = '';

            if (action === 'encrypt') {
                resultMessage = `${response.data.newMessage.encryptedMessage}`;
            } else if (action === 'decrypt') {
                resultMessage = response.data.newMessage.decryptedMessage;
            }

            setResult(resultMessage);
            onResult(resultMessage); // On-screen display excludes algorithm
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const downloadTextFile = () => {
        if (result) {
            const textWithAlgo = `${result}|${formData.algo}`;
            const element = document.createElement('a');
            const file = new Blob([textWithAlgo], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = 'message.txt';
            document.body.appendChild(element);
            element.click();
        }
    };

    const downloadQR = () => {
        const canvas = qrRef.current;
        if (canvas) {
            const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = 'qrcode.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    const handleQRUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const qrCodeMessage = await decodeQRCode(file);
            if (qrCodeMessage) {
                handleDecodedMessage(qrCodeMessage);
            }
        } catch (error) {
            console.error('Failed to decode QR code:', error);
        }
    };

    const decodeQRCode = async (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            QrScanner.scanImage(file)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const handleDecodedMessage = (qrCodeMessage: string) => {
        const [decodedMessage, detectedAlgo] = qrCodeMessage.split('|');
        if (detectedAlgo && supportedAlgosObj[detectedAlgo as keyof typeof supportedAlgosObj]) {
            setFormData((prevData) => ({ ...prevData, algo: detectedAlgo as keyof typeof supportedAlgosObj }));
        }
        setFormData((prevData) => ({ ...prevData, message: decodedMessage }));
        setAction('decrypt');
    };

    const copyToClipboard = () => {
        if (result) {
            navigator.clipboard.writeText(result)
                .then(() => {
                    setCopySuccess('Copied!');
                    setTimeout(() => setCopySuccess(''), 2000);
                })
                .catch((error) => {
                    console.error('Failed to copy:', error);
                });
        }
    };

    useEffect(() => {
        if (scannedQRResult) {
            handleDecodedMessage(scannedQRResult);
        }
    }, [scannedQRResult]);

    return (
        <form onSubmit={handleSubmit} className="bg-white bg-opacity-60 p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6">
            <div>
                <label className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea
                    className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    placeholder="Enter the message you want to encrypt/decrypt"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-2">Algorithm</label>
                <select
                    className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={formData.algo}
                    onChange={(e) => setFormData({ ...formData, algo: e.target.value as keyof typeof supportedAlgosObj })}
                >
                    {Object.keys(supportedAlgosObj).map((key) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-between space-x-4">
                <button
                    type="submit"
                    onClick={() => setAction('encrypt')}
                    className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-teal-600 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    Encrypt
                </button>

                <button
                    type="submit"
                    onClick={() => setAction('decrypt')}
                    className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 text-white hover:bg-red-600 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Decrypt
                </button>
            </div>

            {result && (
                <div className="mt-6">
                    <label className="block text-gray-700 font-semibold mb-2">Result</label>
                    <div
                        className="bg-gray-900 text-gray-200 p-4 rounded-lg border border-gray-600 overflow-auto max-h-32 break-words"
                        style={{ whiteSpace: 'pre-wrap' }}
                    >
                        {result} {/* Display result without algorithm */}
                    </div>

                    <div className="mt-4 flex space-x-4">
                        <button
                            onClick={downloadTextFile}
                            type="button"
                            className="py-2 px-4 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 text-white hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Download Text
                        </button>

                        <button
                            onClick={downloadQR}
                            type="button"
                            className="py-2 px-4 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 text-white hover:bg-green-600 transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Download QR
                        </button>

                        <button
                            onClick={copyToClipboard}
                            type="button"
                            className="py-2 px-4 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 text-white hover:bg-yellow-600 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            Copy to Clipboard
                        </button>
                    </div>

                    {copySuccess && <p className="mt-2 text-green-500 font-semibold">{copySuccess}</p>}

                    <QRCodeCanvas
                        value={`${result}|${formData.algo}`}
                        ref={qrRef}
                        size={150}
                        className="mt-4 mx-auto"
                        includeMargin
                    />
                </div>
            )}

            {/* File upload for QR */}
            <div className="mt-6">
                <label className="block text-gray-700 font-semibold mb-2">Upload QR Code</label>
                <div className="relative">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleQRUpload}
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-between py-2 px-4 border border-gray-300 bg-white rounded-lg cursor-pointer hover:bg-gray-50">
                        <span className="text-gray-700">Choose File</span>
                        <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                </div>
            </div>


            {/* <QRScanner onScan={setScannedQRResult} /> */}
        </form>
    );
};





export default EncryptDecryptForm;
