import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectWithRetry from './database/database';
dotenv.config();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

const startServer = async (): Promise<void> => {
    try {
        await connectWithRetry();
        const app: Application = express();

        app.get('/', (req: Request, res: Response) => {
            // later will be used to actually verify if user is logged in.
            res.status(200).json({
                message: 'Hello World!'
            });
        });

        // global error handler
        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            res.status(500).json({
                message: err.message
            });
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (err) {
        console.log("Failed to connect to the server", err);
        process.exit(1);
    }
};

startServer();