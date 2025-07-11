import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log(`I'm here bro00`)

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }
  console.log("here hre")

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(`hey bro I'm below decoded`)
    // console.log("🟢 Decoded JWT payload:", JSON.stringify(decoded, null, 2));
    // 🛠️ Map userId → id
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      phone: decoded.phone,
      name: decoded.name,
      companyName: decoded.companyName,
      website: decoded.website
    };

    console.log("✅ User attached to req:", req.user);
    // console.log(`after orderdetials request user verified token`)
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
