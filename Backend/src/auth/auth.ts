import dotEnv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

dotEnv.config();
const JWT_SECRET: string = process.env.JWT_SECRET || '';

interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction): any => {
    const authHeader: string | undefined = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: 'Unauthorized Access -Headers starts with',
            success: true
        });
    }
    const token: string = authHeader.split(" ")[1];
    try {
        const decoded: string | JwtPayload = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        // Handle token verification error
        return res.status(401).json({
            message: 'Invalid token',
            success: false
        });
    }
};

export {
    authMiddleware,
    CustomRequest
}