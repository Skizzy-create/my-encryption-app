import React, { useState, useEffect } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';

const QRScanner: React.FC = () => {
    const [result, setResult] = useState('');
    let controls: any;

    useEffect(() => {
        const codeReader = new BrowserQRCodeReader();
        const videoElement = document.getElementById('video') as HTMLVideoElement;

        const handleScan = () => {
            codeReader.decodeFromVideoDevice(undefined, videoElement, (res) => {
                if (res) {
                    setResult(res.getText());
                }
            }).then((scannerControls) => {
                controls = scannerControls;
            }).catch((err) => {
                console.error(err);
            });
        };

        handleScan();

        return () => {
            if (controls) {
                controls.stop();
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center mt-8">
            <h2 className="text-xl font-bold mb-4 text-gray-200">QR Code Scanner</h2>
            <video id="video" className="rounded-lg border border-gray-600" width="300" height="300" />
            {result && <p className="mt-4 text-sm text-gray-400">Scanned Result: <strong>{result}</strong></p>}
        </div>
    );
};

export default QRScanner;
