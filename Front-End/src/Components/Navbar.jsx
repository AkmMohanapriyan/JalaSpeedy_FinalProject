
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import '../assets/Css/Navbar.css';
// import { Link as ScrollLink } from 'react-scroll';
// import LoginModal from '../Pages/Login';
// import RegisterModal from '../Pages/Register';
// import axios from 'axios';
// import Collapse from 'bootstrap/js/dist/collapse';



// const Navbar = () => {
//   const navigate = useNavigate();
//   const [userInfo, setUserInfo] = useState(null);
//   const [username, setUsername] = useState('');
//   const [showRegister, setShowRegister] = useState(false);


//   // useEffect(() => {
//   //   const storedUser = JSON.parse(localStorage.getItem("userInfo"));
//   //   const token = localStorage.getItem("auth_token");
//   //   setUserInfo(storedUser);

//   //   // Fetch username from backend
//   //   const fetchUser = async () => {
//   //     if (token) {
//   //       try {
//   //         const res = await axios.get("http://localhost:5000/api/users/me", {
//   //           headers: {
//   //             Authorization: `Bearer ${token}`,
//   //           },
//   //         });
//   //         setUsername(res.data.username);
//   //       } catch (error) {
//   //         console.error("Failed to fetch user info", error);
//   //       }
//   //     }
//   //   };

//   //   fetchUser();

//   //   // Handle role-based navigation on login
//   //   if (storedUser) {
//   //     if (storedUser.role === 'admin') {
//   //       navigate('/admindashboard');
//   //     } else if (storedUser.role === 'supplier') {
//   //       navigate('/supplierdashboard');
//   //     }
//   //     // Do not navigate if user is normal user; they stay on home
//   //   }
//   // }, []);


//   useEffect(() => {
//     const storedUserRaw = localStorage.getItem("userInfo");
//     const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;
//     const token = localStorage.getItem("auth_token");

//     setUserInfo(storedUser);

//     const fetchUser = async () => {
//       if (token) {
//         try {
//           const res = await axios.get("http://localhost:5000/api/users/me", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setUsername(res.data.username);
//         } catch (error) {
//           console.error("Failed to fetch user info", error);
//         }
//       }
//     };

//     fetchUser();

//     if (storedUser) {
//       if (storedUser.role === 'admin') {
//         if (window.location.pathname !== '/admindashboard') navigate('/admindashboard');
//       } else if (storedUser.role === 'supplier') {
//         if (window.location.pathname !== '/supplierdashboard') navigate('/supplierdashboard');
//       }
//     }
//   }, [navigate]);


//   const handleProfileClick = () => {
//     if (!userInfo) return;

//     const role = userInfo.role;
//     if (role === 'admin') navigate('/admindashboard');
//     else if (role === 'supplier') navigate('/supplierdashboard');
//     else if (role === 'user') navigate('/userdashboard');
//     else navigate('/');
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('auth_token');
//     localStorage.removeItem('userInfo');
//     setUserInfo(null);
//     setUsername('');
//     navigate('/');
//   };

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-dark gradient-navbar py-3 sticky-top shadow w-100">
//         <div className="container-fluid">
//           {/* Logo / Brand */}
//           <a className="navbar-brand fw-bold fs-4" href="#">
//             JalaSpeedy
//           </a>

//           {/* Toggler */}
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarContent"
//             aria-controls="navbarContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           {/* Links */}
//           <div className="collapse navbar-collapse" id="navbarContent">
// <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
//   {["home", "about", "features", "services", "contact"].map((section) => (
//     <li className="nav-item" key={section}>
//       <ScrollLink
//         className="nav-link"
//         activeClass="active"
//         to={section}
//         spy={true}
//         smooth={true}
//         offset={-352}
//         duration={500}
//         onClick={() => {
//           setTimeout(() => {
//             const navbarCollapse = document.getElementById("navbarContent");
//             if (navbarCollapse.classList.contains("show")) {
//               const collapseInstance = new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
//               collapseInstance.hide();
//             }
//           }, 550); // Wait until scroll finishes
//         }}
//       >
//         {section.charAt(0).toUpperCase() + section.slice(1)}
//       </ScrollLink>
//     </li>
//   ))}
// </ul>



//             {/* Buttons */}
//             <div className="d-flex gap-2 align-items-center">
//               {!userInfo ? (
//                 <>
//                   <button
//                     className="btn-log btn-sm"
//                     data-bs-toggle="modal"
//                     data-bs-target="#loginModal"
//                   >
//                     Login
//                   </button>
//                   <button
//                     className="btn-signup btn-sm fw-semibold"
//                     // data-bs-toggle="modal"
//                     // data-bs-target="#registerModal"
//                     onClick={() => setShowRegister(true)}
//                   >
//                     Signup
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     className="btn-profile btn-sm fw-semibold d-flex align-items-center gap-1"
//                     onClick={handleProfileClick}
//                   >
//                     <i className="bi bi-person-circle"></i> {username}
//                   </button>
//                   <button
//                     className="btn-logout btn-sm fw-semibold"
//                     onClick={handleLogout}
//                   >
//                     <i className="bi bi-box-arrow-right"></i>
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       <LoginModal />
//       {/* <RegisterModal /> */}

//       <RegisterModal
//         show={showRegister}
//         onClose={() => setShowRegister(false)}
//       />

//       {/* <style>
//         {`
//           @media (max-width: 1000px) {
//             .navbar-header {
//               float: none;
//             }
//             .navbar-toggle {
//               display: block;
//             }
//             .navbar-collapse {
//               border-top: 1px solid transparent;
//               box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
//             }
//             .navbar-collapse.collapse {
//               display: none !important;
//             }
//             .navbar-nav {
//               float: none !important;
//               margin: 7.5px -15px;
//             }
//             .navbar-nav > li {
//               float: none;
//             }
//             .navbar-nav > li > a {
//               padding-top: 10px;
//               padding-bottom: 10px;
//             }
//           }
//         `}
//       </style> */}
//     </>
//   );
// };

// export default Navbar;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "../assets/Css/Navbar.css";
// import { Link as ScrollLink } from "react-scroll";
// import LoginModal from "../Pages/Login";
// import RegisterModal from "../Pages/Register";
// import axios from "axios";
// import Collapse from "bootstrap/js/dist/collapse";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [userInfo, setUserInfo] = useState(null);
//   const [username, setUsername] = useState("");
//   const [showRegister, setShowRegister] = useState(false);

//   const getStoredUser = () => {
//     const data = localStorage.getItem("userInfo");
//     if (!data) return null;
//     try {
//       return JSON.parse(data);
//     } catch {
//       localStorage.removeItem("userInfo");
//       return null;
//     }
//   };

//   useEffect(() => {
//     const storedUser = getStoredUser();
//     const token = localStorage.getItem("auth_token");

//     setUserInfo(storedUser);

//     const fetchUser = async () => {
//       if (token) {
//         try {
//           const res = await axios.get("http://localhost:5000/api/users/me", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setUsername(res.data.username);
//         } catch (error) {
//           console.error("Failed to fetch user info", error);
//         }
//       }
//     };

//     fetchUser();

//     if (storedUser) {
//       if (storedUser.role === "admin") {
//         if (window.location.pathname !== "/admindashboard")
//           navigate("/admindashboard");
//       } else if (storedUser.role === "supplier") {
//         if (window.location.pathname !== "/supplierdashboard")
//           navigate("/supplierdashboard");
//       }
//     }
//   }, [navigate]);

//   const handleProfileClick = () => {
//     if (!userInfo) return;

//     const role = userInfo.role;
//     if (role === "admin") navigate("/admindashboard");
//     else if (role === "supplier") navigate("/supplierdashboard");
//     else if (role === "user") navigate("/userdashboard");
//     else navigate("/");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("auth_token");
//     localStorage.removeItem("userInfo");
//     setUserInfo(null);
//     setUsername("");
//     navigate("/");
//   };

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-dark gradient-navbar py-3 sticky-top shadow w-100">
//         <div className="container-fluid">
//           {/* Logo / Brand */}
//           <a className="navbar-brand fw-bold fs-4" href="#">
//             JalaSpeedy
//           </a>

//           {/* Toggler */}
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarContent"
//             aria-controls="navbarContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           {/* Links */}
//           <div className="collapse navbar-collapse" id="navbarContent">
//             <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
//               {["home", "about", "features", "services", "contact"].map(
//                 (section) => (
//                   <li className="nav-item" key={section}>
//                     <ScrollLink
//                       className="nav-link"
//                       activeClass="active"
//                       to={section}
//                       spy={true}
//                       smooth={true}
//                       offset={-352}
//                       duration={500}
//                       onClick={() => {
//                         setTimeout(() => {
//                           const navbarCollapse = document.getElementById(
//                             "navbarContent"
//                           );
//                           if (navbarCollapse.classList.contains("show")) {
//                             const collapseInstance = new window.bootstrap.Collapse(
//                               navbarCollapse,
//                               { toggle: false }
//                             );
//                             collapseInstance.hide();
//                           }
//                         }, 550); // Wait until scroll finishes
//                       }}
//                     >
//                       {section.charAt(0).toUpperCase() + section.slice(1)}
//                     </ScrollLink>
//                   </li>
//                 )
//               )}
//             </ul>

//             {/* Buttons */}
//             <div className="d-flex gap-2 align-items-center">
//               {!userInfo ? (
//                 <>
//                   <button
//                     className="btn-log btn-sm"
//                     data-bs-toggle="modal"
//                     data-bs-target="#loginModal"
//                   >
//                     Login
//                   </button>
//                   <button
//                     className="btn-signup btn-sm fw-semibold"
//                     onClick={() => setShowRegister(true)}
//                   >
//                     Signup
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     className="btn-profile btn-sm fw-semibold d-flex align-items-center gap-1"
//                     onClick={handleProfileClick}
//                   >
//                     <i className="bi bi-person-circle"></i> {username}
//                   </button>
//                   <button
//                     className="btn-logout btn-sm fw-semibold"
//                     onClick={handleLogout}
//                   >
//                     <i className="bi bi-box-arrow-right"></i>
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       <LoginModal />
//       <RegisterModal show={showRegister} onClose={() => setShowRegister(false)} />
//     </>
//   );
// };

// export default Navbar;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "../assets/Css/Navbar.css";
// import { Link as ScrollLink } from "react-scroll";
// import LoginModal from "../Pages/Login";
// import RegisterModal from "../Pages/Register";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [userInfo, setUserInfo] = useState(null);
//   const [username, setUsername] = useState("");
//   const [showRegister, setShowRegister] = useState(false);

//   const getStoredUser = () => {
//     const data = localStorage.getItem("userInfo");
//     if (!data) return null;
//     try {
//       return JSON.parse(data);
//     } catch {
//       localStorage.removeItem("userInfo");
//       return null;
//     }
//   };

//   useEffect(() => {
//     const syncUserInfo = () => {
//       const storedUser = getStoredUser();
//       setUserInfo(storedUser);
//       setUsername(storedUser?.username || "");
//     };

//     // Sync initially and on storage event
//     syncUserInfo();
//     window.addEventListener("storage", syncUserInfo);

//     return () => {
//       window.removeEventListener("storage", syncUserInfo);
//     };
//   }, []);

//   const handleProfileClick = () => {
//     if (!userInfo) return;

//     const role = userInfo.role;
//     if (role === "admin") navigate("/admindashboard");
//     else if (role === "supplier") navigate("/supplierdashboard");
//     else if (role === "user") navigate("/userdashboard");
//     else navigate("/");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("auth_token");
//     localStorage.removeItem("userInfo");
//     setUserInfo(null);
//     setUsername("");
//     navigate("/");
//   };

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-dark gradient-navbar py-3 sticky-top shadow w-100">
//         <div className="container-fluid">
//           {/* Logo / Brand */}
//           <a className="navbar-brand fw-bold fs-4" href="#">
//             JalaSpeedy
//           </a>

//           {/* Toggler */}
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarContent"
//             aria-controls="navbarContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           {/* Links */}
//           <div className="collapse navbar-collapse" id="navbarContent">
//             <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
//               {["home", "about", "features", "services", "contact"].map((section) => (
//                 <li className="nav-item" key={section}>
//                   <ScrollLink
//                     className="nav-link"
//                     activeClass="active"
//                     to={section}
//                     spy={true}
//                     smooth={true}
//                     offset={-352}
//                     duration={500}
//                     onClick={() => {
//                       setTimeout(() => {
//                         const navbarCollapse = document.getElementById("navbarContent");
//                         if (navbarCollapse.classList.contains("show")) {
//                           const collapseInstance = new window.bootstrap.Collapse(navbarCollapse, {
//                             toggle: false,
//                           });
//                           collapseInstance.hide();
//                         }
//                       }, 550);
//                     }}
//                   >
//                     {section.charAt(0).toUpperCase() + section.slice(1)}
//                   </ScrollLink>
//                 </li>
//               ))}
//             </ul>

//             {/* Buttons */}
//             <div className="d-flex gap-2 align-items-center">
//               {!userInfo ? (
//                 <>
//                   <button
//                     className="btn-log btn-sm"
//                     data-bs-toggle="modal"
//                     data-bs-target="#loginModal"
//                   >
//                     Login
//                   </button>
//                   <button
//                     className="btn-signup btn-sm fw-semibold"
//                     onClick={() => setShowRegister(true)}
//                   >
//                     Signup
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     className="btn-profile btn-sm fw-semibold d-flex align-items-center gap-1"
//                     onClick={handleProfileClick}
//                   >
//                     <i className="bi bi-person-circle"></i> {username}
//                   </button>
//                   <button
//                     className="btn-logout btn-sm fw-semibold"
//                     onClick={handleLogout}
//                   >
//                     <i className="bi bi-box-arrow-right"></i>
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
// {/* 
//       <LoginModal />
//       <RegisterModal show={showRegister} onClose={() => setShowRegister(false)} /> */}

//       <LoginModal onShowRegister={() => setShowRegister(true)} />
//       <RegisterModal show={showRegister} onClose={() => setShowRegister(false)} />
//     </>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/Css/Navbar.css";
import { Link as ScrollLink } from "react-scroll";
import LoginModal from "../Pages/Login";
import RegisterModal from "../Pages/Register";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const getStoredUser = () => {
    const data = localStorage.getItem("userInfo");
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      localStorage.removeItem("userInfo");
      return null;
    }
  };

  useEffect(() => {
    const storedUser = getStoredUser();
    const token = localStorage.getItem("auth_token");

    setUserInfo(storedUser);

    const fetchUser = async () => {
      if (token) {
        try {
          const res = await axios.get("http://localhost:5000/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsername(res.data.username);
        } catch (error) {
          console.error("Failed to fetch user info", error);
        }
      }
    };

    fetchUser();

    if (storedUser) {
      if (storedUser.role === "admin") {
        if (window.location.pathname !== "/admindashboard")
          navigate("/admindashboard");
      } else if (storedUser.role === "supplier") {
        if (window.location.pathname !== "/supplierdashboard")
          navigate("/supplierdashboard");
      }
    }
  }, [navigate]);

  const handleProfileClick = () => {
    if (!userInfo) return;

    const role = userInfo.role;
    if (role === "admin") navigate("/admindashboard");
    else if (role === "supplier") navigate("/supplierdashboard");
    else if (role === "user") navigate("/userdashboard");
    else navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    setUsername("");
    navigate("/");
  };

  // Function to open RegisterModal from LoginModal
  const openRegisterModal = () => {
    // Close Login modal first
    const modalEl = document.getElementById("loginModal");
    if (modalEl) {
      const modal = window.bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();
    }

    // Remove backdrop and body styles (sometimes leftover)
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) backdrop.remove();
    document.body.classList.remove("modal-open");
    document.body.style = "";

    // Open Register modal controlled by state
    setShowRegister(true);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark gradient-navbar py-3 sticky-top shadow w-100">
        <div className="container-fluid">
          {/* Logo / Brand */}
          <a className="navbar-brand fw-bold fs-4" href="#">
            JalaSpeedy
          </a>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {["home", "about", "features", "services", "contact"].map(
                (section) => (
                  <li className="nav-item" key={section}>
                    <ScrollLink
                      className="nav-link"
                      activeClass="active"
                      to={section}
                      spy={true}
                      smooth={true}
                      offset={-352}
                      duration={500}
                      onClick={() => {
                        setTimeout(() => {
                          const navbarCollapse = document.getElementById(
                            "navbarContent"
                          );
                          if (navbarCollapse.classList.contains("show")) {
                            const collapseInstance = new window.bootstrap.Collapse(
                              navbarCollapse,
                              { toggle: false }
                            );
                            collapseInstance.hide();
                          }
                        }, 550); // Wait until scroll finishes
                      }}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </ScrollLink>
                  </li>
                )
              )}
            </ul>

            {/* Buttons */}
            <div className="d-flex gap-2 align-items-center">
              {!userInfo ? (
                <>
                  <button
                    className="btn-log btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    Login
                  </button>
                  <button
                    className="btn-signup btn-sm fw-semibold"
                    onClick={() => setShowRegister(true)}
                  >
                    Signup
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn-profile btn-sm fw-semibold d-flex align-items-center gap-1"
                    onClick={handleProfileClick}
                  >
                    <i className="bi bi-person-circle"></i> {username}
                  </button>
                  <button
                    className="btn-logout btn-sm fw-semibold"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Pass openRegisterModal to LoginModal */}
      <LoginModal onShowRegister={openRegisterModal} />
      <RegisterModal show={showRegister} onClose={() => setShowRegister(false)} />
    </>
  );
};

export default Navbar;
