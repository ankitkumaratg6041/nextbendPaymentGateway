import express from 'express';
import { login, logout, signup } from '../controllers/authController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();

const signupRouter = express.Router();

// POST /auth/signup
signupRouter.post('/signup', signup);
signupRouter.post('/login', login);
signupRouter.post('/logout', logout);

// GET 
signupRouter.get('/check-auth', authenticateUser, (req, res) => {
    res.status(200).json({ message: 'Authenticated', user: req.user });
});

signupRouter.get('/reject/:id', async (req, res) => {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.send("User rejected and removed!");
});

signupRouter.get('/approve/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { approved: true },
      });
  
      return res.send(`
        <h2 style="color:green">✅ ${user.name} has been approved successfully!</h2>
      `);
    } catch (err) {
      console.error("Approval error:", err);
      return res.status(500).send(`
        <h2 style="color:red">❌ Failed to approve user. Please try again.</h2>
      `);
    }
});
  



export default signupRouter;