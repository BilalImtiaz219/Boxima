import express from 'express';
import {  updateData, deleteData, getById,forgotPassword, resetPassword } from '../controller/user.js';
import { loginUser, logoutUser, registerUser } from '../controller/auth.js';
import { authentication } from '../middleware/middleware.js';
import upload from '../utils/helper.js';


const router = express.Router();



router.get('/get/user', authentication, (req, res) => {
  res.json({ user: req.user }); // Send user data from authentication middleware
});router.put('/update/:id', updateData);
router.delete('/delete/:id', deleteData);
router.get('/getbyid/:id', getById);
router.post('/register', registerUser);
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/protected', authentication)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


export default router;