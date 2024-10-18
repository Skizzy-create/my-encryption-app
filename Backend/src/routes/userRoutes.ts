import exp from 'constants';
import express, { Request, Response } from 'express';
import { validateUserLogin, validateUserSignUp } from '../middlewares/userSchemaValidators';
import { UserModel } from '../models/User';
import { comparePassword, generateToken, hashPassword, verifyToken } from '../auth/authOps';
import { authMiddleware, CustomRequest } from '../auth/auth';
import extractUserId from '../utility/extractUserId';
import { JwtPayload } from 'jsonwebtoken';

const router = express.Router();

router.get('/me', extractUserId, async (req: CustomRequest, res: Response): Promise<any> => {
    try {
        const userId = (req.user as JwtPayload).id;
        console.log("User ID = ", userId);
        if (!userId) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        };
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        };
        return res.status(200).json({
            user: user,
            success: true
        });
    } catch (err) {
        console.log("Server Error: Me Route \nError: " + err);
        return res.status(411).json({
            message: "SERVER ERROR -- ME ROUTE",
            error: err,
            success: false
        });
    };
});

router.post('/signup', validateUserSignUp, async (req: Request, res: Response): Promise<any> => {
    const email: String = req.body.email;
    const password: String = req.body.password;
    const firstName: String = req.body.firstName;
    const lastName: String = req.body.lastName;

    try {
        // Check if user already exists
        const userExists = await UserModel.findOne({
            email: email
        });
        console.log("User Exists = ", userExists);
        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        };
        // Hashing here --will be addede
        const hashedPassword = await hashPassword(password);
        if (!hashedPassword) {
            return res.status(400).json({
                message: "Error hashing password",
                success: false
            });
        };
        // Creating new user
        const newUser = await UserModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });
        console.log("User = ", newUser);
        if (!newUser) {
            return res.status(400).json({
                message: "Error creating user",
                success: false
            });
        };

        // Generate JWT token
        const token: String = generateToken(newUser, res);
        if (!token) {
            // delete user if token generation fails
            await UserModel.deleteOne({
                email: email
            });
            return res.status(400).json({
                message: "Error generating token",
                success: false
            });
        }


        return res.status(201).json({
            message: "User created successfully",
            user: newUser,
            token: token,
            success: true
        });
    } catch (err) {
        await UserModel.deleteOne({
            email: email
        });
        console.log("Server Error: SingUp Route \nError: " + err);
        return res.status(411).json({
            message: "SERVER ERROR -- SINGUP ROUTE",
            error: err,
            success: false
        });
    };
});

router.post('/login', validateUserLogin, async (req: Request, res: Response): Promise<any> => {
    const email: String = req.body.email;
    const password: String = req.body.password;
    try {
        const existingUser = await UserModel.findOne({
            email: email
        })
        if (existingUser === null) {
            return res.status(411).json({
                message: "User not found / Credentials incorrect",
                success: false
            });
        };

        const isValid = await comparePassword(password, existingUser.password);
        if (!isValid) {
            return res.status(400).json({
                message: "User not found / Credentials incorrect",
                success: false
            });
        }

        const token = generateToken(existingUser, res);
        if (!token) {
            return res.status(400).json({
                message: "Error generating token",
                success: false
            });
        };
        // // remove password from user object
        existingUser.password = '';

        return res.status(200).json({
            message: "User logged in successfully",
            user: existingUser,
            token: token,
            success: true
        });
    } catch (err) {
        console.log("Server Error: SingUp Route \nError: " + err);
        return res.status(411).json({
            message: "SERVER ERROR -- SIGNIN ROUTE",
            error: err,
            sucess: false
        });
    };
});

router.get('/logout', authMiddleware, (req: CustomRequest, res: Response): any => {
    console.log("LogOut Route Called")
    if (req.user) {
        req.user = undefined;
        return res.status(200).json({
            message: "User logged out successfully",
            success: true
        });
    };
    // no need of an else condiiton as without an req.user ( i.e the token the authMiddelware will stpo the reqest);
});

export default router;