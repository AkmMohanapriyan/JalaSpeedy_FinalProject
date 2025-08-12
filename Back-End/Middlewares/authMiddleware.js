
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error('Auth Error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    console.log('Unauthorized access attempt by role:', req.user?.role);
    res.status(403).json({ message: 'Admin access only' });
  }
};


// export const supplierOrAdmin = (req, res, next) => {
//   if (req.user && (req.user.role === 'supplier' || req.user.role === 'admin')) next();
//   else res.status(403).json({ message: 'Access restricted to supplier or admin' });
// };


export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // req.user = user; // 🟢 This sets req.user for next controller
    req.user = user; // ✅ Important

    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};


export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

export const supplierOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'supplier' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Access restricted to supplier or admin' });
  }
};