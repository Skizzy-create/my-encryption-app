import express, { NextFunction, Request, Response } from 'express';
import { validateMessageEncryptDecrypt } from '../middlewares/messagesSchemaValidators';
import extractUserId from '../utility/extractUserId';
import { CustomRequest } from '../auth/auth';
import { JwtPayload } from 'jsonwebtoken';
import { DecryptMessageModel, EncryptMessageModel } from '../models/Message';
import { encryptMessage } from '../services/encryptionService';
import mongoose from 'mongoose';
import { decryptMessage } from '../services/decryptionService';
import { Buffer } from 'buffer';  // Make sure to import Buffer

const router = express.Router();

router.post('/encrypt', validateMessageEncryptDecrypt, extractUserId, async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    console.log('Encrypt');
    const message: string = req.body.message;
    const algo: string = req.body.algo;
    let userId;
    if (req.user) {
        userId = (req.user as JwtPayload).id;
    } else {
        userId = new mongoose.Types.ObjectId('000000000000000000000000');
    }
    try {
        // Encrypt the message
        const encryptedMessage: string = encryptMessage(message, algo);

        // Convert encrypted message from hex to base64 for storage
        const base64EncryptedMessage: string = Buffer.from(encryptedMessage, 'hex').toString('base64');

        const newMessage = await EncryptMessageModel.create({
            userId,
            originalMessage: message,
            encryptedMessage: base64EncryptedMessage,
            algorithm: algo,
        });

        console.log('encrypted Message =', newMessage);
        if (!newMessage) {
            return res.status(500).json({
                msg: "Failed to encrypt the message",
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
            msg: "Server Error --Message/Encrypt Route",
            error: err,
            success: false
        });
    }
});

router.post('/decrypt', validateMessageEncryptDecrypt, extractUserId, async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    console.log('Decrypt');
    const base64EncryptedMessage: string = req.body.message;
    const algo = req.body.algo;
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
        console.log('decrypted message =', decryptedMessage);

        const newMessage = await DecryptMessageModel.create({
            userId,
            encryptedMessage: base64EncryptedMessage,
            decryptedMessage,
            algorithm: algo
        });

        if (!newMessage) {
            return res.status(500).json({
                msg: "Failed to decrypt the message",
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
            msg: "Server Error --Message/Decrypt Route",
            error: err,
            success: false
        });
    }
});

export default router;
