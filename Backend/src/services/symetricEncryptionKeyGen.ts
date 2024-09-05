import { randomBytes } from "crypto";
import { writeFileSync } from "fs";

const generateKeyandIV = (): void => {
    // for aes-256-cbc, only will exapnd it further
    let key = randomBytes(32);
    let iv = randomBytes(16);

    writeFileSync('iv-aes256-cbc.pem', iv.toString('base64'));
    writeFileSync('key-aes256-cbc.pem', key.toString('base64'));
}

export {
    generateKeyandIV
};

