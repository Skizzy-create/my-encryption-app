import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeGeneratorProps {
    encryptedMessage: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ encryptedMessage }) => {
    return (
        <div className="flex flex-col items-center mt-6">
            <h2 className="text-xl font-bold mb-4 text-gray-200">QR Code</h2>
            <QRCodeCanvas value={encryptedMessage} size={200} className="bg-gray-700 p-4 rounded-md" />
        </div>
    );
};

export default QRCodeGenerator;
