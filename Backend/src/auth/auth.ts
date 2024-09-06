import { verify } from 'crypto';
import dotEnv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from './authOps';

dotEnv.config();
const JWT_SECRET: string = process.env.JWT_SECRET || '';

interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction): any => {
    const decoded = verifyToken(req, res);

    if (!decoded) {
        console.log('Unauthorized Access - Invalid or missing token')
        return res.status(403).json({
            message: 'Unauthorized Access - Invalid or missing token',
            success: false
        });
    }

    next();
};

export {
    authMiddleware,
    CustomRequest
}