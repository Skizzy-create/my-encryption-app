import crypto from 'crypto';
// - **Encryption Service**
// - **encryptMessage(algorithm: string, message: string)**
//   - Utilizes `crypto` library.
//   - Encrypts the message based on the selected algorithm.
//   - Supported algorithms: `AES`, `RSA`, `DES`.

enum EncryptionAlgorithms {
    AES = "aes-256-cbc",
    RSA = "rsa",
    DES = "des"
};

const encryptMessage = (algorithm: string, message: string): string => {
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};