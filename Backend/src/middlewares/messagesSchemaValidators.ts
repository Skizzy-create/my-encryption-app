import { NextFunction, Request, Response } from "express";
import { messageEncDecSchema } from "../schemas/messageSchema";
import { SafeParseReturnType } from "zod";

const validateMessageEncryptDecrypt = (req: Request, res: Response, next: NextFunction): any => {
    const message: string = req.body.message;
    const algo: string = req.body.algo;
    try {
        const isValid: SafeParseReturnType<any, any> = messageEncDecSchema.safeParse({
            message,
            algo
        });

        console.log("Message Route Called");
        console.log("isValid zod  = " + isValid.success);

        if (!isValid.success) {
            return res.status(400).json({
                message: "Invalid request data",
                errors: isValid.error,
                success: false
            });
        };
        next();
    } catch (err) {
        console.log("Error in messageEncryptValidator.ts " + err);
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR -ZOD VALIDATION MESSAGE ENCRYPT",
            error: err,
            success: false
        });
    }
}

export {
    validateMessageEncryptDecrypt
}