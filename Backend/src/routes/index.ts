import exp from 'constants';
import express from 'express';
import userRoutes from './userRoutes';
import messageRoutes from './messagesRoutes';
import qrCodeROuteer from './qrcodeRoutes';
const router = express.Router();

router.use('/user', userRoutes);
router.use('/messages', messageRoutes);
router.use('/qrcode', qrCodeROuteer);
export default router;