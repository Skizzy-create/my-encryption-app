import React, { useState, useRef } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import QrScanner from 'qr-scanner';  // Import the QR scanning library

interface FormProps {
    onResult: (result: string) => void;
}

const EncryptDecryptForm: React.FC<FormProps> = ({ onResult }) => {
    const [message, setMessage] = useState('');
    const [algo, setAlgo] = useState('AES256');
    const [action, setAction] = useState<'encrypt' | 'decrypt'>('encrypt');
    const [result, setResult] = useState<string | null>(null);
    const qrRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [copySuccess, setCopySuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const endpoint =
                action === 'encrypt'
                    ? 'http://localhost:8080/api/v1/messages/encrypt'
                    : 'http://localhost:8080/api/v1/messages/decrypt';

            const response = await axios.post(endpoint, { message, algo });
            let resultMessage = '';

            if (action === 'encrypt') {
                resultMessage = response.data.newMessage.encryptedMessage;
            } else if (action === 'decrypt') {
                resultMessage = response.data.newMessage.decryptedMessage;
            }

            setResult(resultMessage);
            onResult(resultMessage);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to download the result as a .txt file
    const downloadTextFile = () => {
        if (result) {
            const element = document.createElement('a');
            const file = new Blob([result], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = 'message.txt';
            document.body.appendChild(element);
            element.click();
        }
    };

    // Function to download QR code as an image
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

    // Function to handle QR code upload and decoding
    const handleQRUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const qrCodeMessage = await decodeQRCode(file);
            if (qrCodeMessage) {
                // Automatically trigger decryption
                setMessage(qrCodeMessage);
                setAction('decrypt');
            }
        } catch (error) {
            console.error('Failed to decode QR code:', error);
        }
    };

    // Helper function to decode QR code from image file
    const decodeQRCode = async (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            QrScanner.scanImage(file)
                .then((result) => {
                    resolve(result);  // This is the decoded message from the QR code
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    // Function to copy the result to clipboard
    const copyToClipboard = () => {
        if (result) {
            navigator.clipboard.writeText(result)
                .then(() => {
                    setCopySuccess('Copied!');
                    setTimeout(() => setCopySuccess(''), 2000); // Clear the message after 2 seconds
                })
                .catch((error) => {
                    console.error('Failed to copy:', error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6">
            <div>
                <label className="block text-gray-200 font-semibold mb-2">Message</label>
                <textarea
                    className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Enter the message you want to encrypt/decrypt"
                />
            </div>

            <div>
                <label className="block text-gray-200 font-semibold mb-2">Algorithm</label>
                <select
                    className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={algo}
                    onChange={(e) => setAlgo(e.target.value)}
                >
                    <option value="AES256">AES256</option>
                </select>
            </div>

            <div className="flex justify-between space-x-4">
                <button
                    type="submit"
                    onClick={() => setAction('encrypt')}
                    className="flex-1 py-2 px-4 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                    Encrypt
                </button>

                <button
                    type="submit"
                    onClick={() => setAction('decrypt')}
                    className="flex-1 py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    Decrypt
                </button>
            </div>

            {result && (
                <div className="mt-6">
                    <label className="block text-gray-200 font-semibold mb-2">Result</label>
                    <div
                        className="bg-gray-900 text-gray-200 p-4 rounded-lg border border-gray-600 overflow-auto max-h-32 break-words"
                        style={{ whiteSpace: 'pre-wrap' }}
                    >
                        {result}
                    </div>

                    <div className="mt-4 flex space-x-4">
                        <button
                            onClick={downloadTextFile}
                            type="button"
                            className="py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Download Text
                        </button>

                        <button
                            onClick={downloadQR}
                            type="button"
                            className="py-2 px-4 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            Download QR Code
                        </button>

                        <button
                            onClick={copyToClipboard}
                            type="button"
                            className="py-2 px-4 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                            Copy
                        </button>
                    </div>

                    {copySuccess && (
                        <p className="text-green-500 mt-2">{copySuccess}</p>
                    )}

                    <div className="mt-4">
                        <QRCodeCanvas
                            ref={qrRef}
                            value={result}
                            size={200}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level="Q"
                            includeMargin={true}
                        />
                    </div>
                </div>
            )}

            {/* QR Code Upload Section */}
            <div className="mt-6">
                <label className="block text-gray-200 font-semibold mb-2">Upload QR Code to Decrypt</label>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleQRUpload}
                    className="block w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
            </div>
        </form>
    );
};

export default EncryptDecryptForm;
