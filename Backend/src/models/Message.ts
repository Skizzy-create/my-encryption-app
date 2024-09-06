import mongoose from "mongoose";
import { string } from "zod";

interface Imessages extends Document {
    userId: mongoose.Schema.Types.ObjectId,
    originalMessage: string,
    encryptedMessage: string,
    algorithm: string,
    createdAt: Date
};

const EncryptMessageSchema = new mongoose.Schema<Imessages>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
        default: '000000000000000000000000'
    },
    originalMessage: {
        type: String,
        required: true,
        trim: true,
    },
    encryptedMessage: {
        type: String,
        required: true,
        trim: true,
    },
    algorithm: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const EncryptMessageModel = mongoose.model<Imessages>('EncryptMessage', EncryptMessageSchema);
export {
    EncryptMessageModel,
}