import express, { NextFunction, Request, Response } from 'express';
import { validateMessageEncryptDecrypt } from '../middlewares/messagesSchemaValidators';
import extractUserId from '../utility/extractUserId';
import { authMiddleware, CustomRequest } from '../auth/auth';
import { JwtPayload } from 'jsonwebtoken';
import { DecryptMessageModel, EncryptMessageModel } from '../models/Message';
import { encryptMessage } from '../services/encryptionService';
import mongoose from 'mongoose';
import { decryptMessage } from '../services/decryptionService';
import { Buffer } from 'buffer';  // Make sure to import Buffer
import { supportedAlgosObj } from '../utility/supportedAlgos';
const router = express.Router();

router.post('/encrypt', validateMessageEncryptDecrypt, extractUserId, async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    console.log('Encrypt');
    const message: string = req.body.message;
    const algoKey: keyof typeof supportedAlgosObj = req.body.algo;  // keyof is used to tell ts that the value is a key of the object

    // Map the algoKey to the actual algorithm using supportedAlgosObj
    const algo = supportedAlgosObj[algoKey];

    if (!algo) {
        return res.status(400).json({
            message: "Unsupported encryption algorithm",
            success: false
        });
    }

    let userId;
    if (req.user) {
        userId = (req.user as JwtPayload).id;
    } else {
        userId = new mongoose.Types.ObjectId('000000000000000000000000');
    }
    try {
        console.log('userId =', userId);

        // Encrypt the message
        const encryptedMessage: string = encryptMessage(message, algo);

        // Convert encrypted message from hex to base64 for storage
        const base64EncryptedMessage: string = Buffer.from(encryptedMessage, 'hex').toString('base64');

        console.log('userId before storing in DB:', userId);

        const newMessage = await EncryptMessageModel.create({
            userId,
            originalMessage: message,
            encryptedMessage: base64EncryptedMessage,
            algorithm: algoKey,
        });


        // console.log('encrypted Message =', newMessage);
        if (!newMessage) {
            return res.status(500).json({
                message: "Failed to encrypt the message",
                success: false
            });
        }

        return res.status(200).json({
            newMessage,
            success: true
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server Error --Message/Encrypt Route",
            error: err,
            success: false
        });
    }
});


router.post('/decrypt', validateMessageEncryptDecrypt, extractUserId, async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    console.log('Decrypt');
    const base64EncryptedMessage: string = req.body.message;
    const algoKey: keyof typeof supportedAlgosObj = req.body.algo;  // The key from the request body (e.g., "AES256")

    // Map the algoKey to the actual algorithm using supportedAlgosObj
    const algo = supportedAlgosObj[algoKey];

    if (!algo) {
        return res.status(400).json({
            message: "Unsupported decryption algorithm",
            success: false
        });
    }

    let userId;
    if (req.user) {
        userId = (req.user as JwtPayload).id;
    } else {
        userId = new mongoose.Types.ObjectId('000000000000000000000000');
    }
    try {
        // Convert base64 to hex before decrypting
        const encryptedMessage: string = Buffer.from(base64EncryptedMessage, 'base64').toString('hex');

        // Decrypt the message
        const decryptedMessage = decryptMessage(encryptedMessage, algo);
        // console.log('decrypted message =', decryptedMessage);

        const newMessage = await DecryptMessageModel.create({
            userId,
            encryptedMessage: base64EncryptedMessage,
            decryptedMessage,
            algorithm: algoKey, // Store the key (e.g., "AES256") instead of the actual algorithm
        });

        if (!newMessage) {
            return res.status(500).json({
                message: "Failed to decrypt the message",
                success: false
            });
        };

        return res.status(200).json({
            newMessage,
            success: true
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server Error --Message/Decrypt Route",
            error: err,
            success: false
        });
    }
});

router.get('/history', authMiddleware, async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const userId = (req.user as JwtPayload).id;
        const encryptedMessages = await EncryptMessageModel.find({ userId });
        const decryptedMessages = await DecryptMessageModel.find({ userId });
        // we will only encrypted message, alog and created at
        // we will only decrypted message, alog and created at

        let encryptPayload = encryptedMessages.map((message) => {
            return {
                message: message.encryptedMessage,
                algo: message.algorithm,
                createdAt: message.createdAt
            };
        });

        let decryptPayload = decryptedMessages.map((message) => {
            return {
                message: message.decryptedMessage,
                algo: message.algorithm,
                createdAt: message.createdAt
            };
        });

        return res.status(200).json({
            encryptedMessages: encryptPayload,
            decryptedMessages: decryptPayload,
            success: true
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server Error --Message/History Route",
            error: err,
            success: false
        });
    }
});

export default router;
