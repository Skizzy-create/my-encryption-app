import exp from 'constants';
import express, { Request, Response } from 'express';
import { validateUserSignUp } from '../middlewares/userSchemaValidators';
import { UserModel } from '../models/User';
import { generateToken, hashPassword } from '../auth/authOps';

const router = express.Router();

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
            error: err
        });
    };
});

export default router;