// // import express from 'express';
// // import {
// //   registerUser,
// //   loginUser,
// //     sendOtp,
// //   verifyOtp,
// //   getUserById,
// //   getAllUsers,
// //   updateUserById,
// //   deleteUserById,
// //   getRegularUsers,
// //   getAllSuppliers,
// // getProfile,
// // resetPassword
// // } from '../Controllers/userController.js';
// // import { protect, adminOnly, supplierOrAdmin } from '../Middlewares/authMiddleware.js';
// // // import { getRegularUsers } from '../Controllers/userController.js';


// // const router = express.Router();

// // router.post('/register', registerUser); // Public
// // router.post('/login', loginUser);       // Public

// // router.post('/send-otp', sendOtp);        // ✅ new
// // router.post('/verify-otp', verifyOtp); 

// // router.get('/me', protect, getProfile); 
// // router.get('/:id', protect, supplierOrAdmin, getUserById);  // Supplier/Admin
// // router.get('/', protect, supplierOrAdmin, getAllUsers);     // Supplier/Admin
// // router.put('/:id', protect, adminOnly, updateUserById);     // Admin only
// // router.delete('/:id', protect, adminOnly, deleteUserById);  // Admin only

// // router.get("/only-users", protect, adminOnly, getRegularUsers);

// // router.get('/suppliers', protect, supplierOrAdmin, getAllSuppliers);

// // router.put('/reset-password', resetPassword); // ✅ Make it public



// // export default router;


// import express from 'express';
// import {
//   registerUser,
//   loginUser,
//   sendOtp,
//   verifyOtp,
//   getUserById,
//   getAllUsers,
//   updateUserById,
//   deleteUserById,
//   getRegularUsers,
//   getAllSuppliers,
//   getProfile,
//   resetPassword
// } from '../Controllers/userController.js';

// import { protect, adminOnly, supplierOrAdmin } from '../Middlewares/authMiddleware.js';

// const router = express.Router();

// // 🔓 PUBLIC ROUTES FIRST
// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.post('/send-otp', sendOtp);
// router.post('/verify-otp', verifyOtp);
// router.put('/reset-password', resetPassword); // ✅ make it public

// // 🔐 PROTECTED ROUTES
// router.get('/me', protect, getProfile);
// router.get('/only-users', protect, adminOnly, getRegularUsers);
// router.get('/suppliers', protect, supplierOrAdmin, getAllSuppliers);

// // 🚨 NOTE: These two MUST BE AT THE BOTTOM
// router.get('/:id', protect, supplierOrAdmin, getUserById);
// router.get('/', protect, supplierOrAdmin, getAllUsers);
// router.put('/:id', protect, adminOnly, updateUserById);
// router.delete('/:id', protect, adminOnly, deleteUserById);

// export default router;


// import express from 'express';
// import {
//   registerUser,
//   loginUser,
//   sendOtp,
//   verifyOtp,
//   getUserById,
//   getAllUsers,
//   updateUserById,
//   deleteUserById,
//   getRegularUsers,
//   getAllSuppliers,
//   getProfile,
//   resetPassword
// } from '../Controllers/userController.js';

// import { protect, adminOnly, supplierOrAdmin } from '../Middlewares/authMiddleware.js';

// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.post('/send-otp', sendOtp);
// router.post('/verify-otp', verifyOtp);
// router.put('/reset-password', resetPassword);

// router.get('/me', protect, getProfile);
// router.get('/only-users', protect, adminOnly, getRegularUsers);
// router.get('/suppliers', protect, supplierOrAdmin, getAllSuppliers);

// router.get('/:id', protect, supplierOrAdmin, getUserById);
// router.get('/', protect, supplierOrAdmin, getAllUsers);
// router.put('/:id', protect, adminOnly, updateUserById);
// router.delete('/:id', protect, adminOnly, deleteUserById);

// export default router;



import express from 'express';
import {
  registerUser,
  loginUser,
  sendOtp,
  verifyOtp,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getRegularUsers,
  getAllSuppliers,
  getProfile,
  resetPassword
} from '../Controllers/userController.js';

import { protect, adminOnly, supplierOrAdmin } from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.put('/reset-password', resetPassword);

router.get('/me', protect, getProfile);
router.get('/only-users', protect, adminOnly, getRegularUsers);
router.get('/suppliers', protect, supplierOrAdmin, getAllSuppliers);

router.get('/:id', protect, supplierOrAdmin, getUserById);
router.get('/', protect, supplierOrAdmin, getAllUsers);
router.put('/:id', protect, adminOnly, updateUserById);
router.delete('/:id', protect, adminOnly, deleteUserById);

export default router;
