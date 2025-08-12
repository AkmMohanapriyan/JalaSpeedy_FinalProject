
import User from '../Models/User.js';
import generateToken from '../Utils/generateToken.js';
import asyncHandler from 'express-async-handler';
import  sendEmail  from '../Utils/sendEmail.js';
import { otpStore } from '../Utils/otpStore.js';

// POST /api/users/register
// export const registerUser = async (req, res) => {
//   const { username, email, role, password } = req.body;

//   const userExists = await User.findOne({ email });
//   if (userExists) return res.status(400).json({ message: 'User already exists' });

//   const user = await User.create({ username, email, role, password });

//   if (user) {
//     res.status(201).json({
//       message: "User registered successfully",
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400).json({ message: 'Invalid user data' });
//   }
// };


// export const registerUser = async (req, res) => {
//   const { username, email, address, role, password } = req.body;

//   const userExists = await User.findOne({ email });
//   if (userExists) return res.status(400).json({ message: 'User already exists' });

//   const user = await User.create({ username, email, address, role, password });

//   if (user) {
//     res.status(201).json({
//       message: "User registered successfully",
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       address: user.address,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400).json({ message: 'Invalid user data' });
//   }
// };


export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, address } = req.body;

    if (!name || !email || !password || !role || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, role, address });

    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/users/login

// export const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       user: {
//         _id: user._id,
//         name: user.name,
//         role: user.role,
//         email: user.email
//       },
//       token: generateToken(user._id)
//     });
//   } else {
//     res.status(401);
//     throw new Error('Invalid email or password');
//   }
// });


export const loginUser = asyncHandler(async (req, res) => {
  console.log('Login route HIT');

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      address: user.address,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});



// GET /api/users/:id
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) res.json(user);
  else res.status(404).json({ message: 'User not found' });
};

// GET /api/users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// PUT /api/users/:id
export const updateUserById = async (req, res) => {
  const { username, email, role } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;
    const updated = await user.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// DELETE /api/users/:id
export const deleteUserById = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('User deletion failed:', err.message);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};


// Get All Users (role = user)
export const getRegularUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password');
  res.json(users);
});

// Get All Suppliers (role = suppliers)
export const getAllSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await User.find({ role: 'supplier' }).select('-password');
  res.json(suppliers);
});


// user Get Profile
export const getProfile = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  res.status(200).json(req.user);
};


// ✅ Send OTP to email
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ Save OTP to in-memory store
    otpStore[email] = otp;

    await sendEmail({
      to: email,
      subject: 'JalaSpeedy Verification Code',
      text: `Your verification code is: ${otp}`
    });

    console.log(`Verification code sent to ${email}: ${otp}`);
    res.status(200).json({ message: 'Verification code sent successfully' });
  } catch (err) {
    console.error('Verification Code Send Error:', err.message);
    res.status(500).json({ message: 'Failed to send verification code' });
  }
};

// ✅ Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  const storedOtp = otpStore[email];
  console.log('Stored OTP:', storedOtp, '| Entered OTP:', otp);

  if (storedOtp && storedOtp === otp) {
    delete otpStore[email]; // Remove after success
    return res.status(200).json({ message: 'OTP verified successfully' });
  }

  return res.status(400).json({ message: 'Invalid or expired OTP' });
};


// Reset Password
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.password = newPassword; // will be hashed via schema pre-save
  await user.save();

  await sendEmail({
    to: email,
    subject: "Password Changed Successfully",
    text: "Your JalaSpeedy password has been updated successfully.",
  });

  res.status(200).json({ message: "Password updated successfully" });
});
