import { randomBytes } from "crypto";
import { writeFileSync } from "fs";
import { supportedAlgosObj } from "../utility/supportedAlgos";
// Utility to determine key and IV sizes for each algorithm
const getKeyAndIvSize = (algorithm: string): { keySize: number; ivSize: number } => {
    switch (algorithm) {
        case 'aes-256-cbc':
            return { keySize: 32, ivSize: 16 };
        case 'aes-192-cbc':
            return { keySize: 24, ivSize: 16 };
        case 'aes-128-cbc':
            return { keySize: 16, ivSize: 16 };
        case 'des-ede-cbc':
            return { keySize: 16, ivSize: 8 };
        case 'des-ede3-cbc':
            return { keySize: 24, ivSize: 8 };
        case 'camellia-128-cbc':
            return { keySize: 16, ivSize: 16 };
        case 'camellia-192-cbc':
            return { keySize: 24, ivSize: 16 };
        case 'camellia-256-cbc':
            return { keySize: 32, ivSize: 16 };
        case 'aria-128-cbc':
            return { keySize: 16, ivSize: 16 };
        case 'aria-192-cbc':
            return { keySize: 24, ivSize: 16 };
        case 'aria-256-cbc':
            return { keySize: 32, ivSize: 16 };
        case 'sm4-cbc':
            return { keySize: 16, ivSize: 16 };
        default:
            throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
};


// Generate and store key and IV for the specified algorithm
const generateKeyandIV = (algorithm: string): void => {
    const { keySize, ivSize } = getKeyAndIvSize(algorithm);

    const key = randomBytes(keySize);
    const iv = ivSize > 0 ? randomBytes(ivSize) : Buffer.alloc(0); // No IV for algorithms like RC4

    writeFileSync(`key-${algorithm}.pem`, key.toString('base64'));
    if (ivSize > 0) {
        writeFileSync(`iv-${algorithm}.pem`, iv.toString('base64'));
    }
    console.log(`${algorithm} key and IV generated and saved.`);
};

const generateKeysForAllAlgos = (): void => {
    Object.values(supportedAlgosObj).forEach((algo) => {
        generateKeyandIV(algo);
    });
};


export {
    generateKeyandIV,
    generateKeysForAllAlgos
};
