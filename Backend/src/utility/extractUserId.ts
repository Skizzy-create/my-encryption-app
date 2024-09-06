import { config } from "dotenv";
import { NextFunction, Response } from "express";
import { CustomRequest } from "../auth/auth";
import { verifyToken } from "../auth/authOps";

config();

const extractUserId = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const decoded = verifyToken(req, res);

    // Proceed to next middleware whether or not token is valid
    next();
};

export default extractUserId;
