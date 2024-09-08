import mongoose from "mongoose";

interface IQRCodes extends Document {
    userId: mongoose.Schema.Types.ObjectId,
    QRCodeText: string
    originalMessage: string,
    encryptedMessage: string,
    algorithim: string,
    createdAt: Date
};

const QRCodeSchema = new mongoose.Schema<IQRCodes>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: "000000000000000000000000"
    },
    QRCodeText: {
        type: String,
        required: true,
        trim: true
    },
    originalMessage: {
        type: String,
        required: true,
        trim: true,
    },
    encryptedMessage: {
        type: String,
        required: true,
        trim: true
    }, algorithim: {
        type: String,
        required: true,
        trim: true
    }, createdAt: {
        type: Date,
        default: Date.now
    }
});

const QRCodeModel = mongoose.model<IQRCodes>('QRCode', QRCodeSchema);

export {
    QRCodeModel,
    IQRCodes
}