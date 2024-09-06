import { createCipheriv, } from 'crypto';
import { read, readFileSync } from 'fs';

// only supports the aes-256-cbc algorithm for now.
const encryptMessage = (message: string, algorithm: string): string => {
    const key = Buffer.from(readFileSync('key-aes256-cbc.pem', 'utf-8'), 'base64');
    const iv = Buffer.from(readFileSync('iv-aes256-cbc.pem', 'utf-8'), 'base64');

    const cipher = createCipheriv(algorithm, key, iv);
    let encryptedMessage = cipher.update(message, 'utf-8', 'hex');
    encryptedMessage += cipher.final('hex');
    return encryptedMessage;
};

export {
    encryptMessage
};