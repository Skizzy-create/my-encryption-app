import exp from 'constants';
import express from 'express';
import userRoutes from './userRoutes';
import encryptRoutes from './encryptionRoutes';
const router = express.Router();

router.use('/user', userRoutes);
router.use('/encrypt', encryptRoutes);
export default router;