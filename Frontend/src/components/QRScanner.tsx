import QrScanner from "qr-scanner";
import { memo, useEffect, useRef, useState } from "react";

// QR Scanner Component
interface QRScannerProps {
    onScan: (result: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = memo(({ onScan }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let scanner: QrScanner | null = null;

        if (videoRef.current) {
            scanner = new QrScanner(
                videoRef.current,
                (result) => onScan(result.data),
                {
                    onDecodeError: (err) =>
                        setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`), // Handle decoding errors
                    highlightScanRegion: false, // Disable scan region outline (yellow borders)
                    highlightCodeOutline: true, // Keep the QR code outline visible
                }
            );

            // Start the scanner and handle any errors
            scanner.start().catch((err) => {
                setError('Camera access denied or not available');
                console.error('Camera error:', err);
            });
        }

        return () => {
            if (scanner) {
                scanner.stop();
            }
        };
    }, [onScan]);

    return (
        <div className="mt-4">
            {error && <p className="text-red-500">{error}</p>}
            <video ref={videoRef} className="w-full rounded-lg" style={{ height: 'auto' }} />
        </div>
    );
});


export default QRScanner;