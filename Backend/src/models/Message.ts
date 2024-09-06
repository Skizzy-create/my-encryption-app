import mongoose, { mongo, Mongoose } from "mongoose";
import { string } from "zod";

interface IencryptMessages extends Document {
    userId: mongoose.Schema.Types.ObjectId,
    originalMessage: string,
    encryptedMessage: string,
    algorithm: string,
    createdAt: Date
};

interface IdecryptMessage extends Document {
    userId: mongoose.Schema.Types.ObjectId,
    encryptedMessage: string,
    decryptedMessage: string,
    algorithm: string,
    createdAt: Date
};

const EncryptMessageSchema = new mongoose.Schema<IencryptMessages>({
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

const DecryptMessageSchema = new mongoose.Schema<IdecryptMessage>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
        default: '000000000000000000000000'
    },
    encryptedMessage: {
        type: String,
        required: true,
        trim: true,
    },
    decryptedMessage: {
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

const EncryptMessageModel = mongoose.model<IencryptMessages>('EncryptMessage', EncryptMessageSchema);
const DecryptMessageModel = mongoose.model<IdecryptMessage>('DecryptMessage', DecryptMessageSchema);

export {
    EncryptMessageModel,
    DecryptMessageModel
}