// // import React, { useState } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// // import '../assets/Css/login.css';
// // import RegisterModal from './Register';
// // import { Link } from 'react-scroll';
// // import Modal from 'bootstrap/js/dist/modal';
// // import axios from 'axios';
// // import LoginLoader from '../Pages/LoginLoader';
// // import { useNavigate } from 'react-router-dom';

// // const LoginModal = () => {
// //   const [showPassword, setShowPassword] = useState(false);

// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [message, setMessage] = useState('');
// //   const [messageType, setMessageType] = useState('');

// //   const [showLoginLoader, setShowLoginLoader] = useState(false);
// //   const [loginUsername, setLoginUsername] = useState('');

// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const res = await axios.post("http://localhost:5000/api/users/login", {
// //         email,
// //         password,
// //       });

// //       // Save token and user to localStorage
// //       localStorage.setItem("auth_token", res.data.token);
// //       localStorage.setItem("userInfo", JSON.stringify(res.data.user));

// //       // Start loader immediately
// //       setLoginUsername(res.data.user.username);
// //       setShowLoginLoader(true);

// //       // Delay redirect after animation
// //       setTimeout(() => {
// //         setShowLoginLoader(false);

// //         // Redirect after loader disappears
// //         if (res.data.user.role === "admin") {
// //           navigate("/admindashboard");
// //         } else if (res.data.user.role === "supplier") {
// //           navigate("/supplierdashboard");
// //         }


// //         // Move modal closing AFTER navigate
// //         const modalEl = document.getElementById("loginModal");
// //         if (modalEl) {
// //           const modal = bootstrap.Modal.getInstance(modalEl);
// //           if (modal) modal.hide();
// //         }

// //       }, 500);

// //     } catch (err) {
// //       console.error("Login error:", err);
// //       setMessage("Invalid email or password.");
// //       setMessageType("danger");
// //     }
// //   };

// //   return (
// //     <>

// //       {/* Modal */}
// //       <div
// //         className="modal fade"
// //         id="loginModal"
// //         tabIndex="-1"
// //         aria-labelledby="loginModalLabel"
// //         aria-hidden="true"
// //       >
// //         <div className="modal-dialog modal-dialog-centered">
// //           <div className="modal-content rounded-4 shadow">

// //             {/* Modal Header */}
// //             <div className="modal-header border-bottom-0">
// //               <h5 className="modal-title fw-bold" id="loginModalLabel">Login to JalaSpeedy</h5>
// //               <button
// //                 type="button"
// //                 className="btn-close"
// //                 data-bs-dismiss="modal"
// //                 aria-label="Close"
// //               ></button>
// //             </div>

// //             {/* Modal Body */}
// //             <div className="modal-body px-4 pb-4">

// //               {/* Feedback Message */}
// //               {message && (
// //                 <div className={`alert alert-${messageType} py-2 text-center`} role="alert">
// //                   {message}
// //                 </div>
// //               )}

// //               <div className="form-container">
// //                 <form onSubmit={handleLogin}>
// //                   <div className="mb-3">
// //                     <label htmlFor="email" className="form-label">Email address</label>
// //                     <input
// //                       type="email"
// //                       className="form-control"
// //                       id="email"
// //                       placeholder="example@jalaspeedy.lk"
// //                       value={email}
// //                       onChange={(e) => setEmail(e.target.value)}
// //                       required
// //                     />
// //                   </div>

// //                   <div className="mb-3">
// //                     <label htmlFor="password" className="form-label">Password</label>
// //                     <div className="input-group border">
// //                       <input
// //                         type={showPassword ? 'text' : 'password'}
// //                         className="form-control"
// //                         id="password"
// //                         placeholder="Enter your password"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                         required
// //                       />
// //                       <button
// //                         className="btn-outline-secondary input-group-text border-solid-1 bg-secondary text-light cursor-pointer rounded-end"
// //                         type="button"
// //                         onClick={() => setShowPassword(!showPassword)}
// //                       >
// //                         <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
// //                       </button>
// //                     </div>
// //                   </div>

// // {/* Forgot Password */}
// // <div className="mt-2 mb-2">
// //   <button
// //     className=" p-0 m-0 text-primary"
// //     style={{ fontSize: '14px', textDecoration : "none", backgroundColor: "white", border : "0px"}}
// //     data-bs-toggle="modal"
// //     data-bs-target="#forgotPasswordModal"
// //     type="button"
// //   >
// //     Reset Password
// //   </button>
// // </div>

// //                   <div className="d-grid">
// //                     <button type="submit" className="btn-login rounded-pill">Login</button>
// //                   </div>

// //                   <div className="mt-3 text-center">
// //                     <small>
// //                       {/* Don't have an account? <Link to={RegisterModal} data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#registerModal">Sign Up</Link> */}
// //                       <button
// //   type="button"
// //   className="btn btn-link p-0"
// //   data-bs-dismiss="modal"
// //   data-bs-toggle="modal"
// //   data-bs-target="#registerModal"
// // >
// //   Sign Up
// // </button>
// //                     </small>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>

// //           </div>
// //         </div>
// //       </div>

// //       {showLoginLoader && <LoginLoader username={loginUsername} />}

// //     </>
// //   );
// // };

// // export default LoginModal;


// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import '../assets/Css/login.css';
// import axios from 'axios';
// import LoginLoader from '../Pages/LoginLoader';
// import { useNavigate } from 'react-router-dom';

// const LoginModal = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('');
//   const [showLoginLoader, setShowLoginLoader] = useState(false);
//   const [loginUsername, setLoginUsername] = useState('');

//   const navigate = useNavigate();

//   // const handleLogin = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const res = await axios.post("http://localhost:5000/api/users/login", {
//   //       email,
//   //       password,
//   //     });

//   //     // Save token and user to localStorage
//   //     localStorage.setItem("auth_token", res.data.token);
//   //     localStorage.setItem("userInfo", JSON.stringify(res.data.user));

//   //     // Start loader immediately
//   //     setLoginUsername(res.data.user.name);
//   //     setShowLoginLoader(true);

//   //     // Delay redirect after animation
//   //     setTimeout(() => {
//   //       setShowLoginLoader(false);

//   //       // Redirect based on user role
//   //       switch(res.data.user.role) {
//   //         case "admin":
//   //           navigate("/admindashboard");
//   //           break;
//   //         case "supplier":
//   //           navigate("/supplierdashboard");
//   //           break;
//   //         case "user":
//   //         default:
//   //           navigate("/home"); // Or "/userdashboard" if you have one
//   //           break;
//   //       }

//   //       // Close modal AFTER navigation
//   //       const modalEl = document.getElementById("loginModal");
//   //       if (modalEl) {
//   //         const modal = window.bootstrap.Modal.getInstance(modalEl);
//   //         if (modal) modal.hide();
//   //       }

//   //     }, 500);

//   //   } catch (err) {
//   //     console.error("Login error:", err);
//   //     setMessage("Invalid email or password.");
//   //     setMessageType("danger");
//   //   }
//   // };



//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:5000/api/users/login", {
//         email,
//         password,
//       });

//       // Save token and user info (store user fields in userInfo)
//       const userInfo = {
//         _id: res.data._id,
//         username: res.data.username,
//         email: res.data.email,
//         address: res.data.address,
//         role: res.data.role,
//       };

//       localStorage.setItem("auth_token", res.data.token);
//       localStorage.setItem("userInfo", JSON.stringify(userInfo));

//       setLoginUsername(userInfo.username || "User");
//       setShowLoginLoader(true);

//       setTimeout(() => {
//         setShowLoginLoader(false);

//         switch (userInfo.role) {
//           case "admin":
//             navigate("/admindashboard");
//             break;
//           case "supplier":
//             navigate("/supplierdashboard");
//             break;
//           case "user":
//           default:
//             navigate("/home"); // or "/userdashboard"
//             break;
//         }

//         const modalEl = document.getElementById("loginModal");
//         if (modalEl) {
//           const modal = window.bootstrap.Modal.getInstance(modalEl);
//           if (modal) modal.hide();
//         }
//       }, 500);

//     } catch (err) {
//       console.error("Login error:", err);
//       setMessage("Invalid email or password.");
//       setMessageType("danger");
//     }
//   };



//   return (
//     <>
//       {/* Modal */}
//       <div
//         className="modal fade"
//         id="loginModal"
//         tabIndex="-1"
//         aria-labelledby="loginModalLabel"
//         aria-hidden="true"
//         data-bs-backdrop="static" // Prevent closing when clicking outside
//         data-bs-keyboard="false" // Prevent closing with ESC key
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content rounded-4 shadow">
//             {/* Modal Header */}
//             <div className="modal-header border-bottom-0">
//               <h5 className="modal-title fw-bold" id="loginModalLabel">Login to JalaSpeedy</h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>

//             {/* Modal Body */}
//             <div className="modal-body px-4 pb-4">
//               {/* Feedback Message */}
//               {message && (
//                 <div className={`alert alert-${messageType} py-2 text-center`} role="alert">
//                   {message}
//                 </div>
//               )}

//               <div className="form-container">
//                 <form onSubmit={handleLogin}>
//                   <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email address</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="email"
//                       placeholder="example@jalaspeedy.lk"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <div className="input-group border">
//                       <input
//                         type={showPassword ? 'text' : 'password'}
//                         className="form-control"
//                         id="password"
//                         placeholder="Enter your password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
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

//                   <div className="mt-2 mb-2">
//                     <button
//                       className="p-0 m-0 text-primary"
//                       style={{ fontSize: '14px', textDecoration: "none", backgroundColor: "white", border: "0px" }}
//                       data-bs-toggle="modal"
//                       data-bs-target="#forgotPasswordModal"
//                       type="button"
//                     >
//                       Reset Password
//                     </button>
//                   </div>

//                   <div className="d-grid">
//                     <button type="submit" className="btn-login rounded-pill">Login</button>
//                   </div>

//                   <div className="mt-3 text-center">
//                     <small>
//                       <button
//                         type="button"
//                         className="btn btn-link p-0"
//                         data-bs-dismiss="modal"
//                         data-bs-toggle="modal"
//                         data-bs-target="#registerModal"
//                       >
//                         Sign Up
//                       </button>
//                     </small>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {showLoginLoader && <LoginLoader username={loginUsername} />}
//     </>
//   );
// };

// export default LoginModal;




// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import '../assets/Css/login.css';
// import axios from 'axios';
// import LoginLoader from '../Pages/LoginLoader';
// import { useNavigate } from 'react-router-dom';

// const LoginModal = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('');
//   const [showLoginLoader, setShowLoginLoader] = useState(false);
//   const [loginUsername, setLoginUsername] = useState('');

//   const navigate = useNavigate();

//   // const handleLogin = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const res = await axios.post("http://localhost:5000/api/users/login", {
//   //       email,
//   //       password,
//   //     });

//   //     const userInfo = {
//   //       _id: res.data._id,
//   //       username: res.data.username,
//   //       email: res.data.email,
//   //       address: res.data.address,
//   //       role: res.data.role,
//   //     };

//   //     localStorage.setItem("auth_token", res.data.token);
//   //     localStorage.setItem("userInfo", JSON.stringify(userInfo));

//   //     setLoginUsername(userInfo.username || "User");
//   //     setShowLoginLoader(true);

//   //     setTimeout(() => {
//   //       setShowLoginLoader(false);

//   //       switch (userInfo.role) {
//   //         case "admin":
//   //           navigate("/admindashboard");
//   //           break;
//   //         case "supplier":
//   //           navigate("/supplierdashboard");
//   //           break;
//   //         default:
//   //           navigate("/home");
//   //           break;
//   //       }

//   //       const modalEl = document.getElementById("loginModal");
//   //       if (modalEl) {
//   //         const modal = window.bootstrap.Modal.getInstance(modalEl);
//   //         if (modal) modal.hide();
//   //       }
//   //     }, 500);

//   //   } catch (err) {
//   //     console.error("Login error:", err);
//   //     setMessage("Invalid email or password.");
//   //     setMessageType("danger");
//   //   }
//   // };



//   const handleLogin = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await axios.post("http://localhost:5000/api/users/login", {
//       email,
//       password,
//     });

//     const userInfo = {
//       _id: res.data._id,
//       username: res.data.username,
//       email: res.data.email,
//       address: res.data.address,
//       role: res.data.role,
//     };

//     localStorage.setItem("auth_token", res.data.token);
//     localStorage.setItem("userInfo", JSON.stringify(userInfo));

//     setLoginUsername(userInfo.username || "User");
//     setShowLoginLoader(true);

//     setTimeout(() => {
//       setShowLoginLoader(false);

//       // Navigate based on role
//       switch (userInfo.role) {
//         case "admin":
//           navigate("/admindashboard");
//           break;
//         case "supplier":
//           navigate("/supplierdashboard");
//           break;
//         default:
//           navigate("/home");
//           break;
//       }

//       // Close modal
//       const modalEl = document.getElementById("loginModal");
//       if (modalEl) {
//         const modal = window.bootstrap.Modal.getInstance(modalEl);
//         if (modal) modal.hide();
//       }

//       // ✅ Manually remove the backdrop and cleanup classes
//       const backdrop = document.querySelector('.modal-backdrop');
//       if (backdrop) {
//         backdrop.remove();
//       }

//       document.body.classList.remove('modal-open');
//       document.body.style.overflow = '';
//       document.body.style.paddingRight = '';

//     }, 500);

//   } catch (err) {
//     console.error("Login error:", err);
//     setMessage("Invalid email or password.");
//     setMessageType("danger");
//   }
// };




//   return (
//     <>
//       <div
//         className="modal fade custom-login-modal"
//         id="loginModal"
//         tabIndex="-1"
//         aria-labelledby="loginModalLabel"
//         aria-hidden="true"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content rounded-4 shadow">
//             <div className="modal-header border-bottom-0">
//               <h5 className="modal-title fw-bold" id="loginModalLabel">Login to JalaSpeedy</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
//             </div>

//             <div className="modal-body px-4 pb-4">
//               {message && (
//                 <div className={`alert alert-${messageType} py-2 text-center`} role="alert">
//                   {message}
//                 </div>
//               )}

//               <div className="form-container">
//                 <form onSubmit={handleLogin}>
//                   <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email address</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="email"
//                       placeholder="example@jalaspeedy.lk"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <div className="input-group border">
//                       <input
//                         type={showPassword ? 'text' : 'password'}
//                         className="form-control"
//                         id="password"
//                         placeholder="Enter your password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                       />
//                       <button
//                         className="btn-outline-secondary input-group-text bg-secondary text-light cursor-pointer rounded-end"
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
//                       </button>
//                     </div>
//                   </div>

//                   <div className="mt-2 mb-2">
//                     <button
//                       className="p-0 m-0 text-primary"
//                       style={{ fontSize: '14px', backgroundColor: "white", border: "0px" }}
//                       data-bs-toggle="modal"
//                       data-bs-target="#forgotPasswordModal"
//                       type="button"
//                     >
//                       Reset Password
//                     </button>
//                   </div>

//                   <div className="d-grid">
//                     <button type="submit" className="btn-login rounded-pill">Login</button>
//                   </div>

//                   <div className="mt-3 text-center">
//                     <small>
//                       <button
//                         type="button"
//                         className="btn btn-link p-0"
//                         data-bs-dismiss="modal"
//                         data-bs-toggle="modal"
//                         data-bs-target="#registerModal"
//                       >
//                         Sign Up
//                       </button>
//                     </small>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {showLoginLoader && <LoginLoader username={loginUsername} />}
//     </>
//   );
// };

// export default LoginModal;




// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import '../assets/Css/login.css';
// import axios from 'axios';
// import LoginLoader from '../Pages/LoginLoader';
// import { useNavigate } from 'react-router-dom';

// const LoginModal = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('');
//   const [showLoginLoader, setShowLoginLoader] = useState(false);
//   const [loginUsername, setLoginUsername] = useState('');

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:5000/api/users/login", {
//         email,
//         password,
//       });

//       const userInfo = {
//         _id: res.data._id,
//         username: res.data.username,
//         email: res.data.email,
//         address: res.data.address,
//         role: res.data.role,
//       };

//       localStorage.setItem("auth_token", res.data.token);
//       localStorage.setItem("userInfo", JSON.stringify(userInfo));

//       // Let navbar know
//       window.dispatchEvent(new Event("storage")); // simulate change

//       setLoginUsername(userInfo.username || "User");
//       setShowLoginLoader(true);

//       setTimeout(() => {
//         setShowLoginLoader(false);

//         switch (userInfo.role) {
//           case "admin":
//             navigate("/admindashboard");
//             break;
//           case "supplier":
//             navigate("/supplierdashboard");
//             break;
//           default:
//             navigate("/home");
//             break;
//         }

//         // Close modal
//         const modalEl = document.getElementById("loginModal");
//         if (modalEl) {
//           const modal = window.bootstrap.Modal.getInstance(modalEl);
//           if (modal) modal.hide();
//         }

//         // ✅ Remove lingering blur
//         const backdrop = document.querySelector(".modal-backdrop");
//         if (backdrop) backdrop.remove();

//         document.body.classList.remove("modal-open");
//         document.body.style = "";

//       }, 500);
//     } catch (err) {
//       console.error("Login error:", err);
//       setMessage("Invalid email or password.");
//       setMessageType("danger");
//     }
//   };

//   return (
//     <>
//       <div
//         className="modal fade custom-login-modal"
//         id="loginModal"
//         tabIndex="-1"
//         aria-labelledby="loginModalLabel"
//         aria-hidden="true"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content rounded-4 shadow">
//             <div className="modal-header border-bottom-0">
//               <h5 className="modal-title fw-bold">Login to JalaSpeedy</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" />
//             </div>
//             <div className="modal-body px-4 pb-4">
//               {message && <div className={`alert alert-${messageType} text-center`}>{message}</div>}
//               <div className="form-container">
//                 <form onSubmit={handleLogin}>
//                   <div className="mb-3">
//                     <label className="form-label">Email address</label>
//                     <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Password</label>
//                     <div className="input-group border">
//                       <input
//                         type={showPassword ? 'text' : 'password'}
//                         className="form-control"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                       />
//                       <button
//                         type="button"
//                         className="input-group-text bg-secondary text-white"
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
//                       </button>
//                     </div>
//                   </div>

//                   <div className="d-grid">
//                     <button type="submit" className="btn-login rounded-pill">Login</button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {showLoginLoader && <LoginLoader username={loginUsername} />}
//     </>
//   );
// };

// export default LoginModal;


// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "../assets/Css/login.css";
// import axios from "axios";
// import LoginLoader from "../Pages/LoginLoader";
// import { useNavigate } from "react-router-dom";

// const LoginModal = ({ onShowRegister }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");
//   const [showLoginLoader, setShowLoginLoader] = useState(false);
//   const [loginUsername, setLoginUsername] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:5000/api/users/login", {
//         email,
//         password,
//       });

//       const userInfo = {
//         _id: res.data._id,
//         username: res.data.username,
//         email: res.data.email,
//         address: res.data.address,
//         role: res.data.role,
//       };

//       localStorage.setItem("auth_token", res.data.token);
//       localStorage.setItem("userInfo", JSON.stringify(userInfo));

//       // Inform navbar about login (to update username)
//       window.dispatchEvent(new Event("storage"));

//       setLoginUsername(userInfo.username || "User");
//       setShowLoginLoader(true);

//       setTimeout(() => {
//         setShowLoginLoader(false);

//         switch (userInfo.role) {
//           case "admin":
//             navigate("/admindashboard");
//             break;
//           case "supplier":
//             navigate("/supplierdashboard");
//             break;
//           default:
//             navigate("/home");
//             break;
//         }

//         // Close modal
//         const modalEl = document.getElementById("loginModal");
//         if (modalEl) {
//           const modal = window.bootstrap.Modal.getInstance(modalEl);
//           if (modal) modal.hide();
//         }

//         // Remove modal backdrop and body scroll lock
//         const backdrop = document.querySelector(".modal-backdrop");
//         if (backdrop) backdrop.remove();
//         document.body.classList.remove("modal-open");
//         document.body.style = "";
//       }, 500);
//     } catch (err) {
//       console.error("Login error:", err);
//       setMessage("Invalid email or password.");
//       setMessageType("danger");
//     }
//   };

//   return (
//     <>
//       <div
//         className="modal fade"
//         id="loginModal"
//         tabIndex="-1"
//         aria-labelledby="loginModalLabel"
//         aria-hidden="true"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content rounded-4 shadow">
//             <div className="modal-header border-bottom-0">
//               <h5 className="modal-title fw-bold" id="loginModalLabel">
//                 Login to JalaSpeedy
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               />
//             </div>
//             <div className="modal-body px-4 pb-4">
//               {message && (
//                 <div
//                   className={`alert alert-${messageType} text-center`}
//                   role="alert"
//                 >
//                   {message}
//                 </div>
//               )}
//               <div className="form-container">
//                 <form onSubmit={handleLogin}>
//                   <div className="mb-3">
//                     <label htmlFor="email" className="form-label">
//                       Email address
//                     </label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="email"
//                       placeholder="example@jalaspeedy.lk"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="password" className="form-label">
//                       Password
//                     </label>
//                     <div className="input-group border">
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         className="form-control"
//                         id="password"
//                         placeholder="Enter your password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                       />
//                       <button
//                         className="btn-outline-secondary input-group-text bg-secondary text-light cursor-pointer rounded-end"
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         tabIndex={-1}
//                       >
//                         <i
//                           className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"
//                             }`}
//                         ></i>
//                       </button>
//                     </div>
//                   </div>

//                   {/* Forgot password link */}
//                   <div className="mt-2 mb-2 text-end">
//                     <button
//                       type="button"
//                       className="btn btn-link p-0"
//                       style={{ fontSize: "14px", textDecoration: "none" }}
//                       data-bs-toggle="modal"
//                       data-bs-target="#forgotPasswordModal"
//                       data-bs-dismiss="modal"
//                     >
//                       Forgot Password?
//                     </button>
//                   </div>

//                   <div className="d-grid">
//                     <button type="submit" className="btn-login rounded-pill">
//                       Login
//                     </button>
//                   </div>

//                   {/* Signup link */}
//       <div className="mt-3 text-center">
//         <small>
//           Don't have an account?{" "}
//           <button
//             type="button"
//             className="btn btn-link p-0"
//             style={{ textDecoration: "none" }}
//             onClick={() => {
//               // Close login modal
//               const modalEl = document.getElementById("loginModal");
//               if (modalEl) {
//                 const modal = window.bootstrap.Modal.getInstance(modalEl);
//                 if (modal) modal.hide();
//               }
//               // Then open register modal via callback
//               if (onShowRegister) onShowRegister();
//             }}
//           >
//             Signup
//           </button>
//         </small>
//       </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {showLoginLoader && <LoginLoader username={loginUsername} />}
//     </>
//   );
// };

// export default LoginModal;



import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/Css/login.css";
import axios from "axios";
import LoginLoader from "../Pages/LoginLoader";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onShowRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showLoginLoader, setShowLoginLoader] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      const userInfo = {
        _id: res.data._id,
        username: res.data.username,
        email: res.data.email,
        address: res.data.address,
        role: res.data.role,
      };


      localStorage.setItem("auth_token", res.data.token);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      // Inform navbar about login (to update username)
      window.dispatchEvent(new Event("storage"));

      setLoginUsername(userInfo.username || "User");
      setShowLoginLoader(true);

      setTimeout(() => {
        setShowLoginLoader(false);

        switch (userInfo.role) {
          case "admin":
            navigate("/admindashboard");
            break;
          case "supplier":
            navigate("/supplierdashboard");
            break;
          default:
            navigate("/home");
            break;
        }

        // Close modal
        const modalEl = document.getElementById("loginModal");
        if (modalEl) {
          const modal = window.bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();
        }

        // Remove modal backdrop and body scroll lock
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) backdrop.remove();
        document.body.classList.remove("modal-open");
        document.body.style = "";
      }, 500);
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Invalid email or password.");
      setMessageType("danger");
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header border-bottom-0">
              <h5 className="modal-title fw-bold" id="loginModalLabel">
                Login to JalaSpeedy
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body px-4 pb-4">
              {message && (
                <div
                  className={`alert alert-${messageType} text-center`}
                  role="alert"
                >
                  {message}
                </div>
              )}
              <div className="form-container">
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="example@jalaspeedy.lk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="input-group border">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        className="btn-outline-secondary input-group-text bg-secondary text-light cursor-pointer rounded-end"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        <i
                          className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                        ></i>
                      </button>
                    </div>
                  </div>

                  {/* Forgot password link */}
                  <div className="mt-2 mb-2 text-end">
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      style={{ fontSize: "14px", textDecoration: "none" }}
                      data-bs-toggle="modal"
                      data-bs-target="#forgotPasswordModal"
                      data-bs-dismiss="modal"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn-login rounded-pill">
                      Login
                    </button>
                  </div>

                  {/* Signup link */}
                  <div className="mt-3 text-center">
                    <small>
                      Don't have an account?{" "}
                      <button
                        type="button"
                        className="btn btn-link p-0"
                        style={{ textDecoration: "none" }}
                        onClick={() => {
                          // Close login modal first
                          const modalEl = document.getElementById("loginModal");
                          if (modalEl) {
                            const modal = window.bootstrap.Modal.getInstance(modalEl);
                            if (modal) modal.hide();
                          }
                          // Then open register modal
                          if (onShowRegister) onShowRegister();
                        }}
                      >
                        Signup
                      </button>
                    </small>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLoginLoader && <LoginLoader username={loginUsername} />}
    </>
  );
};

export default LoginModal;
