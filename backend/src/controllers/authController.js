import { PrismaClient } from '../../generated/prisma/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient();

export const signup = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            website,
            linkedin,
            facebook,
            companyName,
            customMessage,
            password
          } = req.body;   
        
        // ✅ Step 1: Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        // ✅ Step 2: Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ✅ Step 3: Create new user with hashed password
        const newUser = await prisma.user.create({
            data: {
              name: name,
              email: email,
              phone: phone,
              website: website,
              linkedin: linkedin,
              facebook: facebook,
              companyName: companyName,
              customMessage: customMessage,
              password: hashedPassword,
              approved: false, // default
            },
        });
        
        return res.status(201).json({
            message: 'Signup submitted. Awaiting admin approval.',
            userId: newUser.id,
        });

    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const user = await prisma.user.findUnique({ where: { email } });
    
        if (!user || !user.approved) {
            return res.status(401).json({ message: "Invalid or unapproved user." });
        }
        
        // checking the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(401).json({ message: "Invalid Credentials or unapproved user." });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        // Send token in httpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
    
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Something went wrong.' });
    }
  };
  
export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // optional: for production security
        sameSite: 'Strict'
    });

    res.status(200).json({ message: 'Logged out successfully' });
};
  
