import { createCipheriv } from "crypto";
import { readFileSync, existsSync } from "fs";

const encryptMessage = (message: string, algorithm: string): string => {
    const key = Buffer.from(readFileSync(`key-${algorithm}.pem`, 'utf-8'), 'base64');
    const ivPath = `iv-${algorithm}.pem`;

    // Check if the IV file exists before reading it
    let iv: Buffer | null = null;
    if (existsSync(ivPath)) {
        iv = Buffer.from(readFileSync(ivPath, 'utf-8'), 'base64');
    }

    // Create cipher with or without IV based on the algorithm
    const cipher = iv ? createCipheriv(algorithm, key, iv) : createCipheriv(algorithm, key, Buffer.alloc(0));

    let encryptedMessage = cipher.update(message, 'utf-8', 'hex');
    encryptedMessage += cipher.final('hex');

    return encryptedMessage;
};

export {
    encryptMessage
};
