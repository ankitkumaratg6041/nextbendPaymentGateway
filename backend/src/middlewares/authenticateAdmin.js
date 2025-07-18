export const authenticateAdmin = (req, res, next) => {
    // First, check if user is authenticated (attached from previous middleware)
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // Optional: You can add a special flag for admin in DB if needed (e.g., isAdmin: true)
    // But for now, just hardcode emails or user IDs
    // const allowedAdmins = [process.env.ADMIN_EMAIL]; // you can add more later
  
    // if (!allowedAdmins.includes(req.user.email)) {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    // }
  
    next();
  };
  