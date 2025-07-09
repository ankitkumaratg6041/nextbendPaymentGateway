import express from 'express';
import { login, logout, signup } from '../controllers/authController.js';

const signupRouter = express.Router();

// POST /auth/signup
signupRouter.post('/signup', signup);
signupRouter.post('/login', login);
signupRouter.post('/logout', logout);


export default signupRouter;