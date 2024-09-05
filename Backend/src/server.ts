import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectWithRetry from './database/database';
import { countRequest, countTime } from './utility/logs';
import mainRouter from './routes/index';
import { encryptMessage } from './services/encryptionService';
import { supportedAlgos, supportedAlgosObj } from './utility/supportedAlgos';
import { decryptMessage } from './services/decryptionService';
import { generateKeyandIV } from './services/symetricEncryptionKeyGen';

dotenv.config();
const PORT: number = parseInt(process.env.PORT || '3000', 10);


const startServer = async (): Promise<void> => {
    try {
        await connectWithRetry();
        const app: Application = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(countRequest);
        app.use(countTime);

        app.use('/api/v1', mainRouter);

        app.get('/', (req: Request, res: Response) => {
            // later will be used to actually verify if user is logged in.
            res.status(200).json({
                message: 'Hello World!'
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

        generateKeyandIV();

        // const message = 'Hare krishna Hare Krishna, Krishna krishna hare hare';
        // const encryptedMessage = encryptMessage(supportedAlgosObj.AES256, message);
        // console.log('\nencrypted message =', encryptedMessage, '\n');

        // const decryptedMessage = decryptMessage(supportedAlgosObj.AES256, encryptedMessage);
        // console.log('decrypted message =', decryptedMessage, '\n');

    } catch (err) {
        console.log("Failed to connect to the server", err);
        process.exit(1);
    }
};

startServer();