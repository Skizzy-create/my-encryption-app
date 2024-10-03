import React, { useState, useRef, useEffect, memo } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react'; // Import QR code generator library
import QrScanner from 'qr-scanner'; // Import QR scanning library

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
            // http://localhost:8080/api/v1/messages/encrypt

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
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6">
            <div>
                <label className="block text-gray-200 font-semibold mb-2">Message</label>
                <textarea
                    className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    placeholder="Enter the message you want to encrypt/decrypt"
                />
            </div>

            <div>
                <label className="block text-gray-200 font-semibold mb-2">Algorithm</label>
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
                        {result} {/* Display result without algorithm */}
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
                            Download QR
                        </button>

                        <button
                            onClick={copyToClipboard}
                            type="button"
                            className="py-2 px-4 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                            Copy to Clipboard
                        </button>
                    </div>

                    {copySuccess && <p className="mt-2 text-green-400">{copySuccess}</p>}
                </div>
            )}

            <div className="mt-6">
                <label className="block text-gray-200 font-semibold mb-2">Upload QR Code</label>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleQRUpload}
                    className="block w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
            </div>

            <div className="mt-6">
                <h2 className="text-lg text-white font-bold mt-8 mb-2">Scan a QR Code</h2>
                <QRScanner onScan={setScannedQRResult} />
            </div>

            {/* QR Code Canvas */}
            {result && (
                <div className="hidden">
                    <QRCodeCanvas
                        value={`${result}|${formData.algo}`} // Include algorithm in the QR code
                        size={256}
                        level={'H'}
                        includeMargin={true}
                        ref={qrRef}
                    />
                </div>
            )}
        </form>
    );
};

// QRScanner Component
interface QRScannerProps {
    onScan: (result: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = memo(({ onScan }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        let scanner: QrScanner | null = null;

        if (videoRef.current) {
            scanner = new QrScanner(videoRef.current, (result) => {
                onScan(result);
            });
            scanner.start(); // Start the scanner when the component mounts
        }

        return () => {
            if (scanner) {
                scanner.stop(); // Stop the scanner when the component unmounts
            }
        };
    }, [onScan]); // Only reinitialize scanner if `onScan` changes

    return <video ref={videoRef} style={{ width: '100%', height: 'auto' }} className="rounded-lg" />;
});

export default EncryptDecryptForm;
