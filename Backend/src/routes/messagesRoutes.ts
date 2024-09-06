import express, { NextFunction, Request, Response } from 'express';
import { validateMessageEncryptDecrypt } from '../middlewares/messagesSchemaValidators';
import extractUserId from '../utility/extractUserId';
import { CustomRequest } from '../auth/auth';
import { JwtPayload } from 'jsonwebtoken';
import { EncryptMessageModel } from '../models/Message';
import { encryptMessage } from '../services/encryptionService';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/encrypt', validateMessageEncryptDecrypt, extractUserId, async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    const message = req.body.message;
    const algo = req.body.algo;

    let userId;
    if (req.user) {
        userId = (req.user as JwtPayload).id;
    } else {
        // Set the userId to a fixed ObjectId corresponding to 69420
        userId = new mongoose.Types.ObjectId('000000000000000000000000');
    }

    const encryptedMessage: string = encryptMessage(message, algo)

    const newMessage = await EncryptMessageModel.create({
        userId,
        originalMessage: message,
        encryptedMessage,
        algorithm: algo,
    });

    console.log(newMessage);

    // await EncryptMessageModel.deleteOne({ _id: newMessage._id });

    return res.status(200).json({
        newMessage,
        success: true
    });
});

router.post

export default router;
