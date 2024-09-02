import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();
const MONGO_URL = process.env.MONGO_URL || 'NO STRING LOADED';

const connectWithRetry = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const connect = () => {
            console.log('Attempting MongoDB connection...');
            mongoose.connect(MONGO_URL)
                .then(() => {
                    console.log('MongoDB is connected');
                    resolve();
                })
                .catch(err => {
                    console.error('MongoDB connection unsuccessful, retrying in 2 seconds...', err);
                    setTimeout(connect, 2000);
                });
        };
        connect();
    });
}

export default connectWithRetry;