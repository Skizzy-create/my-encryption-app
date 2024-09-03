import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';
import { Response } from 'express';

dotEnv.config();
const JWT_SECRET: string = process.env.JWT_SECRET || "";

const hashPassword = async (password: String | Buffer): Promise<String | null> => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password.toString(), salt);
        return hashedPassword;
    } catch (err) {
        console.log("Error hashing password: ", err);
        return null;
    }
};

const comparePassword = async (password: String | Buffer, hashedPassword: string): Promise<boolean> => {
    const isValid = await bcrypt.compare(password.toString(), hashedPassword);
    return isValid;
}

const generateToken = (user: any, res: Response): String | any => {
    try {
        const payload = {
            id: user._id,
            email: user.email,
        };
        const token = jwt.sign(payload, JWT_SECRET);
        return token;
    } catch (err) {
        console.error("Error generating JWT:", "\n", err);
        return false;
    }

}

export {
    hashPassword,
    comparePassword,
    generateToken
}