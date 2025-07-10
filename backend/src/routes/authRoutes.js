import express from 'express';
import { login, logout, signup } from '../controllers/authController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const signupRouter = express.Router();

// POST /auth/signup
signupRouter.post('/signup', signup);
signupRouter.post('/login', login);
signupRouter.post('/logout', logout);

// GET 
signupRouter.get('/check-auth', authenticateUser, (req, res) => {
    res.status(200).json({ message: 'Authenticated', user: req.user });
});



export default signupRouter;