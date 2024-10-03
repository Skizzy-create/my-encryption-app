import { createDecipheriv } from "crypto";
import { readFileSync, existsSync } from "fs";

const decryptMessage = (message: string, algorithm: string): string => {
    const key = Buffer.from(readFileSync(`key-${algorithm}.pem`, 'utf-8'), 'base64');
    const ivPath = `iv-${algorithm}.pem`;

    // Check if the IV file exists before reading it
    let iv: Buffer | null = null;
    if (existsSync(ivPath)) {
        iv = Buffer.from(readFileSync(ivPath, 'utf-8'), 'base64');
    }

    // Create decipher with or without IV based on the algorithm
    const decipher = iv ? createDecipheriv(algorithm, key, iv) : createDecipheriv(algorithm, key, Buffer.alloc(0));

    let decryptedMessage = decipher.update(message, 'hex', 'utf-8');
    decryptedMessage += decipher.final('utf-8');

    return decryptedMessage;
};

export {
    decryptMessage
};
