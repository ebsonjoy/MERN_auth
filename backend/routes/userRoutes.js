import express from 'express';
const router = express.Router();    
import {authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
 } from '../controller/userController.js';
 import { multerUploadUserProfile } from '../config/multerConfig.js'
 import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, multerUploadUserProfile.single('profileImage'), updateUserProfile);


export default router 