import exp from 'constants';
import express from 'express';
import userRoutes from './userRoutes';
import messageRoutes from './messagesRoutes';
const router = express.Router();

router.use('/user', userRoutes);
router.use('/messages', messageRoutes);
export default router;