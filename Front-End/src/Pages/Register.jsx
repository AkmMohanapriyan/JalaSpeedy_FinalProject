// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { Link } from 'react-scroll';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import axios from 'axios';
// import '../assets/Css/Register.css';
// import SubscriptionModal from '../Pages/SubscriptionModal';
// import LoginModal from './Login';
// import OtpModal from '../Pages/OtpModal';


// const RegisterModal = () => {

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const [showSubscription, setShowSubscription] = useState(false);
//   const [subscriptionMessage, setSubscriptionMessage] = useState({ show: false, text: '', type: '' });

//   const [showLoader, setShowLoader] = useState(false);

//   const [showOtpModal, setShowOtpModal] = useState(false);

//   const [selectedPlan, setSelectedPlan] = useState('');
//   const [paymentDetails, setPaymentDetails] = useState({
//     cardHolder: '',
//     cardNumber: '',
//     expiry: '',
//     cvc: ''
//   });


//   const [formData, setFormData] = useState({
//     username: '', email: '', role: '', password: '', confirmPassword: '',
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   // // Handle Register and OTP
// const handleRegister = async (e) => {
//   e.preventDefault();
//   const { email, password, confirmPassword } = formData;

//   if (password !== confirmPassword) {
//     setSubscriptionMessage({ show: true, text: 'Passwords do not match', type: 'danger' });
//     return;
//   }

//   try {
//     const res = await fetch('http://localhost:5000/api/users/send-otp', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email })
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message);

//     localStorage.setItem('otp_email', email);
//     setShowOtpModal(true);
//     toast.success(`Verification Code sent to ${email}`);
//     window.bootstrap.Modal.getInstance(document.getElementById('registerModal'))?.hide();
//   } catch (err) {
//     toast.error(err.message || 'Failed to send Verification Code');
//   }
// };

// const handleOtpVerified = () => {
//   setShowOtpModal(false);
//   setShowSubscription(true);
//   localStorage.setItem('registration_data', JSON.stringify({
//     username: formData.username,
//     email: formData.email,
//     role: formData.role,
//     password: formData.password
//   }));
// };


// const handlePlanConfirm = async (selectedPlan, paymentDetails) => {
//   const { username, email, role, password } = formData;

//   try {
//     // Register user
//     const res = await fetch('http://localhost:5000/api/users/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, email, role, password })
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || 'Registration failed');

//     localStorage.setItem('userInfo', JSON.stringify(data));
//     const token = data.token;

//     // Save Subscription
//     await axios.post('http://localhost:5000/api/subscriptions', {
//       plan: selectedPlan,
//       paymentDetails
//     }, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     toast.success(`Welcome ${username}! Subscription saved.`);

//     setTimeout(() => {
//       setShowSubscription(false);
//       const loginModal = new window.bootstrap.Modal(document.getElementById('loginModal'));
//       loginModal?.show();
//     }, 1500);

//   } catch (err) {
//     console.error(err);
//     toast.error(err.message || 'Registration or subscription failed.');
//   }
// };


// // // Handle Subscription Cancel
//   const handleSubscriptionCancel = () => {
//     setShowSubscription(false);
//     setSubscriptionMessage({ show: true, text: 'Subscription not completed. Registration cancelled.', type: 'danger' });
//   };

//   return (
//     <>

//       {/* Register Modal */}
//       <div
//         className="modal fade"
//         id="registerModal"
//         tabIndex="-1"
//         aria-labelledby="registerModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content rounded-4 shadow">

//             <div className="modal-header border-bottom-0">
//               <h5 className="modal-title fw-bold" id="registerModalLabel">Create an Account</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>

//             <div className="modal-body px-4 pb-4">

//               <div className="form-container">
//                 <form onSubmit={handleRegister}>
//                   <div className="mb-3">
//                     <label htmlFor="username" className="form-label">Username</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="username"
//                       placeholder="Enter your name"
//                       required
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email address</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="email"
//                       placeholder="example@email.com"
//                       required
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="role" className="form-label">Select Role</label>
//                     <select className="form-select" id="role" required onChange={handleChange}>
//                       <option value="">-- Choose Role --</option>
//                       <option value="user">User</option>
//                       <option value="supplier">Supplier</option>
//                     </select>
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <div className="input-group">
//                       <input
//                         type={showPassword ? 'text' : 'password'}
//                         className="form-control"
//                         id="password"
//                         placeholder="Enter password"
//                         required
//                         onChange={handleChange}
//                       />
//                       <button
//                         className="btn-outline-secondary input-group-text border-solid-1 bg-secondary text-light cursor-pointer rounded-end"
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
//                       </button>
//                     </div>
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//                     <div className="input-group">
//                       <input
//                         type={showConfirm ? 'text' : 'password'}
//                         className="form-control"
//                         id="confirmPassword"
//                         placeholder="Re-enter password"
//                         required
//                         onChange={handleChange}
//                       />
//                       <button
//                         className="btn-outline-secondary input-group-text border-solid-1 bg-secondary text-light cursor-pointer rounded-end"
//                         type="button"
//                         onClick={() => setShowConfirm(!showConfirm)}
//                       >
//                         <i className={`bi ${showConfirm ? 'bi-eye-slash' : 'bi-eye'}`}></i>
//                       </button>
//                     </div>
//                   </div>

//                   <div className="d-grid">
//                     <button type="submit" className="btn-register rounded-pill">
//                       Register
//                     </button>
//                   </div>

//                   <div className="mt-3 text-center">
//                     <small>
//                       Already have an account? <Link to={LoginModal} data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#loginModal" style={{ color: '#00aaff', cursor: 'pointer' }}>Login</Link>
//                     </small>
//                   </div>
//                 </form>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Success Message */}

// {showOtpModal && (
//   <OtpModal show={showOtpModal} onClose={() => setShowOtpModal(false)} onVerify={handleOtpVerified} />
// )}

// {showSubscription && (
//   <SubscriptionModal
//     show={showSubscription}
//     onClose={handleSubscriptionCancel}
//     onConfirm={(plan, payment) => {
//       setSelectedPlan(plan);
//       setPaymentDetails(payment);
//       handlePlanConfirm(plan, payment);
//     }}
//   />
// )}

// {showLoader && (
//   <div className="loader-container">
//     <div className="spinner"></div>
//     <p className="fs-5">Dear <strong>{createdUsername}</strong>! Your Account is being created. Please wait...</p>
//   </div>
// )}
//     </>
//   );
// };

// export default RegisterModal;

// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
// import SubscriptionModal from '../Pages/SubscriptionModal';

// const RegisterModal = ({ show, onClose }) => {
//   const [showSubscription, setShowSubscription] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState('');

//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     role: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };


// const handleRegister = async (e) => {
//   e.preventDefault();
//   const { username, email, role, password, confirmPassword } = formData;

//   if (password !== confirmPassword) {
//     toast.error('Passwords do not match');
//     return;
//   }

//   try {
//     const res = await axios.post('http://localhost:5000/api/users/register', {
//       username,
//       email,
//       role,
//       password,
//     });

//     toast.success('Registration successful! Please choose a subscription plan.');

//     // Save full user for auth
//     localStorage.setItem('userInfo', JSON.stringify(res.data));

//     // ✅ Save email for subscription flow
//     localStorage.setItem('tempUser', JSON.stringify({ email }));

//     setShowSubscription(true);
//   } catch (error) {
//     toast.error(error.response?.data?.message || 'Registration failed');
//   }
// };






//   // const handlePlanConfirm = async (plan) => {
//   //   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//   //   const token = userInfo?.token;

//   //   if (!token) {
//   //     toast.error('User not authenticated.');
//   //     return;
//   //   }

//   //   try {
//   //     await axios.post(
//   //       'http://localhost:5000/api/subscriptions',
//   //       { plan },
//   //       {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       }
//   //     );

//   //     toast.success(`Subscription to ${plan} plan successful!`);

//   //     // Close subscription modal and Register modal
//   //     setShowSubscription(false);
//   //     onClose();
//   //   } catch (err) {
//   //     toast.error(err.response?.data?.message || 'Subscription failed');
//   //   }
//   // };


// const handlePlanConfirm = async (plan) => {
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//   const token = userInfo?.token;

//   if (!token) {
//     toast.error('User not authenticated.');
//     return;
//   }

//   try {
//     const res = await axios.post(
//       'http://localhost:5000/api/stripe/create-checkout-session',
//       { email: userInfo.email, plan },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     if (res.data?.url) {
//       window.location.href = res.data.url;
//     } else {
//       toast.error('Failed to create Stripe session');
//     }
//   } catch (err) {
//     toast.error(err.response?.data?.message || 'Subscription failed');
//   }
// };



//   const handleSubscriptionCancel = () => {
//     setShowSubscription(false);
//     toast.info('Subscription not selected. You can subscribe later.');
//     onClose(); // also close register modal if subscription canceled
//   };

//   if (!show) return null; // don't render modal if show is false

//   return (
//     <>
//       {/* Register Modal */}
//       <div
//         className="modal d-block"
//         tabIndex="-1"
//         role="dialog"
//         aria-labelledby="registerModalLabel"
//         aria-modal="true"
//         style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//       >
//         <div className="modal-dialog modal-dialog-centered" role="document">
//           <div className="modal-content rounded-4 shadow">
//             <div className="modal-header border-bottom-0">
//               <h5 className="modal-title fw-bold" id="registerModalLabel">
//                 Create an Account
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 aria-label="Close"
//                 onClick={() => {
//                   setShowSubscription(false);
//                   onClose();
//                 }}
//               ></button>
//             </div>

//             <div className="modal-body px-4 pb-4">
//               <form onSubmit={handleRegister}>
//                 <div className="mb-3">
//                   <label htmlFor="username" className="form-label">
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="username"
//                     placeholder="Enter your name"
//                     required
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">
//                     Email address
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     placeholder="example@email.com"
//                     required
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="role" className="form-label">
//                     Select Role
//                   </label>
//                   <select
//                     className="form-select"
//                     id="role"
//                     required
//                     onChange={handleChange}
//                     defaultValue=""
//                   >
//                     <option value="" disabled>
//                       -- Choose Role --
//                     </option>
//                     <option value="user">User</option>
//                     <option value="supplier">Supplier</option>
//                   </select>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     placeholder="Enter password"
//                     required
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="confirmPassword" className="form-label">
//                     Confirm Password
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="confirmPassword"
//                     placeholder="Re-enter password"
//                     required
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="d-grid">
//                   <button type="submit" className="btn btn-primary rounded-pill">
//                     Register
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Subscription Modal */}
//       {showSubscription && (
//         <SubscriptionModal
//           show={showSubscription}
//           onClose={handleSubscriptionCancel}
//           onConfirm={handlePlanConfirm} // passes selected plan string
//         />
//       )}
//     </>
//   );
// };

// export default RegisterModal;


// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
// import SubscriptionModal from '../Pages/SubscriptionModal';

// const RegisterModal = ({ show, onClose }) => {
//   const [showSubscription, setShowSubscription] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState('');

//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     address: '',
//     role: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const { username, email, address, role, password, confirmPassword } = formData;

//     if (password !== confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     try {
//       const res = await axios.post('http://localhost:5000/api/users/register', {
//         username,
//         email,
//         address,
//         role,
//         password,
//       });

//       toast.success('Registration successful! Please choose a subscription plan.');

//       localStorage.setItem('userInfo', JSON.stringify(res.data));
//       localStorage.setItem('tempUser', JSON.stringify({ email }));

//       setShowSubscription(true);
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Registration failed');
//     }
//   };

//   const handlePlanConfirm = async (plan) => {
//     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//     const token = userInfo?.token;

//     if (!token) {
//       toast.error('User not authenticated.');
//       return;
//     }

//     try {
//       const res = await axios.post(
//         'http://localhost:5000/api/stripe/create-checkout-session',
//         { email: userInfo.email, plan },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (res.data?.url) {
//         window.location.href = res.data.url;
//       } else {
//         toast.error('Failed to create Stripe session');
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Subscription failed');
//     }
//   };

//   const handleSubscriptionCancel = () => {
//     setShowSubscription(false);
//     toast.info('Subscription not selected. You can subscribe later.');
//     onClose();
//   };

//   if (!show) return null;

//   return (
//     <>
//       {/* Register Modal */}
//       <div
//         className="modal d-block"
//         tabIndex="-1"
//         role="dialog"
//         aria-labelledby="registerModalLabel"
//         aria-modal="true"
//         style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//       >
//         <div className="modal-dialog modal-dialog-centered" role="document">
//           <div className="modal-content rounded-4 shadow">
//             <div className="modal-header border-bottom-0">
//               <h5 className="modal-title fw-bold" id="registerModalLabel">
//                 Create an Account
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 aria-label="Close"
//                 onClick={() => {
//                   setShowSubscription(false);
//                   onClose();
//                 }}
//               ></button>
//             </div>

//             <div className="modal-body px-4 pb-4">
//               <form onSubmit={handleRegister}>
//                 <div className="mb-3">
//                   <label htmlFor="username" className="form-label">
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="username"
//                     placeholder="Enter your name"
//                     required
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">
//                     Email address
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     placeholder="example@email.com"
//                     required
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="address" className="form-label">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="address"
//                     placeholder="Enter your address"
//                     required
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="role" className="form-label">
//                     Select Role
//                   </label>
//                   <select
//                     className="form-select"
//                     id="role"
//                     required
//                     onChange={handleChange}
//                     defaultValue=""
//                   >
//                     <option value="" disabled>
//                       -- Choose Role --
//                     </option>
//                     <option value="user">User</option>
//                     <option value="supplier">Supplier</option>
//                   </select>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     placeholder="Enter password"
//                     required
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="confirmPassword" className="form-label">
//                     Confirm Password
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="confirmPassword"
//                     placeholder="Re-enter password"
//                     required
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="d-grid">
//                   <button type="submit" className="btn btn-primary rounded-pill">
//                     Register
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Subscription Modal */}
//       {showSubscription && (
//         <SubscriptionModal
//           show={showSubscription}
//           onClose={handleSubscriptionCancel}
//           onConfirm={handlePlanConfirm}
//         />
//       )}
//     </>
//   );
// };

// export default RegisterModal;




// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import SubscriptionModal from "../Pages/SubscriptionModal";

// const RegisterModal = ({ show, onClose, onShowLogin }) => {
//   const [showSubscription, setShowSubscription] = useState(false);

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     address: "",
//     role: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const { username, email, address, role, password, confirmPassword } = formData;

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/users/register", {
//         username,
//         email,
//         address,
//         role,
//         password,
//       });

//       toast.success("Registration successful! Please choose a subscription plan.");

//       localStorage.setItem("userInfo", JSON.stringify(res.data));
//       localStorage.setItem("tempUser", JSON.stringify({ email }));

//       setShowSubscription(true);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration failed");
//     }
//   };

//   const handlePlanConfirm = async (plan) => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     const token = userInfo?.token;

//     if (!token) {
//       toast.error("User not authenticated.");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/stripe/create-checkout-session",
//         { email: userInfo.email, plan },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (res.data?.url) {
//         window.location.href = res.data.url;
//       } else {
//         toast.error("Failed to create Stripe session");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Subscription failed");
//     }
//   };

//   const handleSubscriptionCancel = () => {
//     setShowSubscription(false);
//     toast.info("Subscription not selected. You can subscribe later.");
//     onClose();
//   };

//   // Handle clicking the Login link inside register modal
//   const handleLoginLinkClick = () => {
//     setShowSubscription(false);
//     onClose();

//     if (onShowLogin) onShowLogin();
//   };

//   if (!show) return null;

//   return (
//     <>
//       {/* Register Modal */}
//       <div
//         className="modal d-block"
//         tabIndex="-1"
//         role="dialog"
//         aria-labelledby="registerModalLabel"
//         aria-modal="true"
//         style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//       >
//         <div className="modal-dialog modal-dialog-centered" role="document">
//           <div className="modal-content rounded-4 shadow">
//             <div className="modal-header border-bottom-0">
//               <h5 className="modal-title fw-bold" id="registerModalLabel">
//                 Create an Account
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 aria-label="Close"
//                 onClick={() => {
//                   setShowSubscription(false);
//                   onClose();
//                 }}
//               ></button>
//             </div>

//             <div className="modal-body px-4 pb-4">
//               <form onSubmit={handleRegister}>
//                 <div className="mb-3">
//                   <label htmlFor="username" className="form-label">
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="username"
//                     placeholder="Enter your name"
//                     required
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">
//                     Email address
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     placeholder="example@email.com"
//                     required
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="address" className="form-label">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="address"
//                     placeholder="Enter your address"
//                     required
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="role" className="form-label">
//                     Select Role
//                   </label>
//                   <select
//                     className="form-select"
//                     id="role"
//                     required
//                     onChange={handleChange}
//                     defaultValue=""
//                   >
//                     <option value="" disabled>
//                       -- Choose Role --
//                     </option>
//                     <option value="user">User</option>
//                     <option value="supplier">Supplier</option>
//                   </select>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     placeholder="Enter password"
//                     required
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="confirmPassword" className="form-label">
//                     Confirm Password
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="confirmPassword"
//                     placeholder="Re-enter password"
//                     required
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="d-grid">
//                   <button type="submit" className="btn btn-primary rounded-pill">
//                     Register
//                   </button>
//                 </div>
//               </form>

//               {/* Login link */}
//               <div className="mt-3 text-center">
//                 <small>
//                   Already have an account?{" "}
//                   <button
//                     type="button"
//                     className="btn btn-link p-0"
//                     style={{ textDecoration: "none" }}
//                     onClick={handleLoginLinkClick}
//                   >
//                     Login
//                   </button>
//                 </small>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Subscription Modal */}
//       {showSubscription && (
//         <SubscriptionModal
//           show={showSubscription}
//           onClose={handleSubscriptionCancel}
//           onConfirm={handlePlanConfirm}
//         />
//       )}
//     </>
//   );
// };

// export default RegisterModal;



import React, { useState } from "react";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import axiosInstance from '../Utils/axios'
import SubscriptionModal from "../Pages/SubscriptionModal";

const RegisterModal = ({ show, onClose, onShowLogin }) => {
  const [showSubscription, setShowSubscription] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, address, role, password, confirmPassword } = formData;

    // Client-side validation
    if (!username || !email || !address || !role || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      const res = axios.post('http://localhost:5000/api/users/register', {
  name,
  email,
  password,
  role,
  address
});

      toast.success("Registration successful! Please choose a subscription plan.");
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      setShowSubscription(true);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message || 
        error.message || 
        "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlanConfirm = async (plan) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;

    if (!token) {
      toast.error("User not authenticated.");
      return;
    }

    try {
      const res = await axios.post(
        "/api/stripe/create-checkout-session",
        { email: userInfo.email, plan },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error("Failed to create Stripe session");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      toast.error(err.response?.data?.message || "Subscription failed");
    }
  };

  const handleSubscriptionCancel = () => {
    setShowSubscription(false);
    toast.info("Subscription not selected. You can subscribe later.");
    onClose();
  };

  const handleLoginLinkClick = () => {
    setShowSubscription(false);
    onClose();
    if (onShowLogin) onShowLogin();
  };

  if (!show) return null;

  return (
    <>
      <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="registerModalLabel"
        aria-modal="true"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header border-bottom-0">
              <h5 className="modal-title fw-bold" id="registerModalLabel">
                Create an Account
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => {
                  setShowSubscription(false);
                  onClose();
                }}
              ></button>
            </div>

            <div className="modal-body px-4 pb-4">
              <form onSubmit={handleRegister}>
                {/* Form fields remain the same */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your name"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="example@email.com"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter your address"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Select Role
                  </label>
                  <select
                    className="form-select"
                    id="role"
                    required
                    onChange={handleChange}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      -- Choose Role --
                    </option>
                    <option value="user">User</option>
                    <option value="supplier">Supplier</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Re-enter password"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary rounded-pill"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Registering...' : 'Register'}
                  </button>
                </div>
              </form>

              <div className="mt-3 text-center">
                <small>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    style={{ textDecoration: "none" }}
                    onClick={handleLoginLinkClick}
                  >
                    Login
                  </button>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSubscription && (
        <SubscriptionModal
          show={showSubscription}
          onClose={handleSubscriptionCancel}
          onConfirm={handlePlanConfirm}
        />
      )}
    </>
  );
};

export default RegisterModal;