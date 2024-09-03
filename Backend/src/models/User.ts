import mongoose, { Date, Document } from "mongoose";

interface IUser extends Document {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    createdAt: Date
};

const UserSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value: string) => {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(value);
            },
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: true,
        minLenght: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export {
    UserModel,
}