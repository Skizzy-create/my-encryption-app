import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectWithRetry from './database/database';
import { countRequest, countTime } from './utility/logs';
import mainRouter from './routes/index';
import { encryptMessage } from './services/encryptionService';
import { supportedAlgos, supportedAlgosObj } from './utility/supportedAlgos';
import { decryptMessage } from './services/decryptionService';
import { generateKeyandIV, generateKeysForAllAlgos } from './services/symetricEncryptionKeyGen';
import { generateQRCodeText } from './services/qrCodeService';

dotenv.config();
const PORT: number = parseInt(process.env.PORT || '3000', 10);


const startServer = async (): Promise<void> => {
    try {
        await connectWithRetry();
        const app: Application = express();

        // CORS policy for localhost:5173
        app.use(cors({ origin: ['http://localhost:5173', 'https://my-encryption-app.vercel.app'] })); // Allow requests from localhost:5173 and my-encryption-app.vercel.app
        app.options('*', cors());
        app.use(express.json());
        app.use(countRequest);
        app.use(countTime);

        app.use('/api/v1', mainRouter);

        app.get('/', (req: Request, res: Response) => {
            // later will be used to actually verify if user is logged in.
            res.status(200).json({
                message: `MyEncrypt - Full-Stack Encryption App MyEncrypt offers a simple, secure way to encrypt and decrypt messages.Enter your message, and get the encrypted result. You can also generate a QR code for easy sharing and direct decryption within the app.`,
                techstack: `Express.js TypeScript BcryptJS Crypto Mongoose!`
            });
        });

        app.use('/isAlive', (req: Request, res: Response) => {
            res.status(200).json({
                message: 'Server is alive'
            });
        });

        // global error handler
        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            res.status(500).json({
                message: err.message
            });
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        generateKeysForAllAlgos();

        // const message = 'Hare krishna Hare Krishna, Krishna krishna hare hare';
        // const encryptedMessage = encryptMessage(message, supportedAlgosObj.AES256);
        // console.log('\nencrypted message =', encryptedMessage, '\n');

        // const decryptedMessage = decryptMessage(encryptedMessage, supportedAlgosObj.AES256);
        // console.log('decrypted message =', decryptedMessage, '\n');

        // const trialQrText = await generateQRCodeText('Hare krishna Hare Krishna, Krishna krishna hare hare', supportedAlgosObj.AES256);
        // console.log('QR code text =', trialQrText);
        // const trialImg = await generateQrCodeImg(trialQrText);
        // console.log('QR code image =', trialImg);
    } catch (err) {
        console.log("Failed to connect to the server", err);
        process.exit(1);
    }
};

startServer();