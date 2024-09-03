import { NextFunction, Request, Response } from "express";
import { userSignupSchema } from "../schemas/usersSchema";
import { SafeParseReturnType } from "zod";

const validateUserSignUp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    try {
        const isValid: SafeParseReturnType<any, any> = userSignupSchema.safeParse({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        });

        console.log("Signup Route Called");
        console.log("isValid zod  = " + isValid.success);

        if (!isValid.success) {
            return res.status(400).json({
                message: "Invalid request data",
                errors: isValid.error
            });
        };
        next();
    } catch (err) {
        console.log("Error in userSchemaValidators.ts: " + err);
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR -ZOD VALIDATION USER SIGNUP",
            error: err
        });
    };
};

export {
    validateUserSignUp
};