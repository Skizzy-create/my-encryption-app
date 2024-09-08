import exp from 'constants';
import express, { Response } from 'express';
import { generateQRCodeText } from '../services/qrCodeService';
import { encryptMessage } from '../services/encryptionService';
import { validateMessageEncryptDecrypt } from '../middlewares/messagesSchemaValidators';
import extractUserId from '../utility/extractUserId';
import { CustomRequest } from '../auth/auth';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { QRCodeModel } from '../models/QrCode';

const router = express.Router();

router.get('/generate', validateMessageEncryptDecrypt, extractUserId, async (req: CustomRequest, res: Response) => {
    const message: string = req.query.message as string;
    const algo: string = req.query.algo as string
    let userId;
    if (req.user) {
        userId = (req.user as JwtPayload).id;
    } else {
        userId = new mongoose.Types.ObjectId('000000000000000000000000');
    };
    try {
        const encryptedMessage: string = encryptMessage(message, algo);
        const base64EncryptedMessage: string = Buffer.from(encryptedMessage, 'hex').toString('base64');
        const qrCodeText = generateQRCodeText(base64EncryptedMessage, algo);

        const newQRModel = await QRCodeModel.create({
            userId: userId,
            QRCodeText: qrCodeText,
            originalMessage: message,
            encryptedMessage: base64EncryptedMessage,
            algorithim: algo,
        });

        if (!newQRModel) {
            return res.status(500).json({
                msg: "Failed to Generate QR",
                success: false
            });
        };
        return res.status(200).json({
            ORCodeText: qrCodeText,
            ObjectID: newQRModel._id,
            sucess: true

        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "Server Error --QRCode/Generate Route",
            error: err,
            success: false
        });
    }

});

export default router;