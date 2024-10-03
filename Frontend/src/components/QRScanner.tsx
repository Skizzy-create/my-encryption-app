import React, { useEffect } from 'react';
import QrScanner from 'qr-scanner';

interface QRScannerProps {
    onScan: (result: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoElem = videoRef.current;
        if (!videoElem) return;

        const qrScanner = new QrScanner(
            videoElem,
            (result) => onScan(result.data), // Call the onScan prop when a QR code is detected
            { preferredCamera: 'environment' }
        );

        qrScanner.start();

        return () => {
            qrScanner.stop();
        };
    }, [onScan]);

    return (
        <div>
            <video ref={videoRef} style={{ width: '100%' }} />
        </div>
    );
};

export default QRScanner;
