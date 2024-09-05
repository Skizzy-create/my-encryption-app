import { createDecipheriv } from "crypto";
import { readFileSync } from "fs";

const decryptMessage = (algorithm: string, message: string): string => {
    const key = Buffer.from(readFileSync('key-aes256-cbc.pem', 'utf-8'), 'base64');
    // above we are loadign the key from the file
    // utf-8 is the encoding of the file, base64 is the encoding of the key,
    // utf-8 will be used to read the file, base64 will be used to convert the key to a buffer
    const iv = Buffer.from(readFileSync('iv-aes256-cbc.pem', 'utf-8'), 'base64');

    const decipher = createDecipheriv(algorithm, key, iv);
    let decryptedMessage = decipher.update(message, 'hex', 'utf-8');
    decryptedMessage += decipher.final('utf-8');

    return decryptedMessage;
};

export {
    decryptMessage
}