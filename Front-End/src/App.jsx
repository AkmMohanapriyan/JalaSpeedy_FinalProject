// import { useState } from 'react'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Routes, Route } from "react-router-dom";
// import SubscriptionModal from './Pages/SubscriptionModal';

// import Navbar from './Components/Navbar'
// import Footer from './Components/Footer'
// import HomePage from './Pages/Home'
// import UserDashboard from './Pages/UserDashboard'
// import SupplierDashboard from './Pages/SupplierDashboard';
// import AdminDashboard from './Pages/AdminDashboard';
// import LoadingScreen from './Pages/LoadingScreen';

// import LoginModal from './Pages/Login';
// import RegisterModal from './Pages/Register';

// import LoginPage from './Pages/LoginPage';

// import SubscriptionSuccessPage from './Pages/SubscriptionSuccessPage';

// import ProtectedRoute from './Pages/ProtectedRoute';

// import ForgotPasswordModal from './Pages/ForgotPasswordModal';
// import OtpVerifyModal from './Pages/OtpVerifyModal';
// import ResetPasswordModal from './Pages/ResetPasswordModal';

// import PaymentSuccess from './Pages/PaymentSuccess';


// function App() {

//   return (
//     <>



//       <Routes>

//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterModal />} />

//         <Route path="/" element={<LoadingScreen />} />
//         <Route path="/home" element={<HomePage />} />
//         {/* <Route path="/userdashboard" element={<UserDashboard />} /> */}
//         {/* <Route path="/supplierdashboard" element={<SupplierDashboard />} /> */}
//         {/* <Route path="/admindashboard" element={<AdminDashboard />} /> */}
//         <Route path="/subscription" element={<SubscriptionModal />} />
//         <Route path="/success" element={<SubscriptionSuccessPage />} />

// <Route path="/success" element={<PaymentSuccess openLoginModal={() => {
//   // Open the bootstrap login modal programmatically
//   const loginModalEl = document.getElementById('loginModal');
//   if (loginModalEl) {
//     const modal = new window.bootstrap.Modal(loginModalEl);
//     modal.show();
//   }
// }} />} />

//         <Route
//           path="/admindashboard"
//           element={
//             <ProtectedRoute allowedRoles={['admin']}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/userdashboard"
//           element={
//             <ProtectedRoute allowedRoles={['user']}>
//               <UserDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/supplierdashboard"
//           element={
//             <ProtectedRoute allowedRoles={['supplier']}>
//               <SupplierDashboard />
//             </ProtectedRoute>
//           }
//         />

//       </Routes>

//       <RegisterModal />
//       <LoginModal />

//       <ForgotPasswordModal />
//       <OtpVerifyModal />
//       <ResetPasswordModal />

//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

//     </>
//   )
// }

// export default App;



// import React, { useState, useEffect } from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom'; // add useLocation
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import HomePage from './Pages/Home';
// import UserDashboard from './Pages/UserDashboard';
// import SupplierDashboard from './Pages/SupplierDashboard';
// import AdminDashboard from './Pages/AdminDashboard';
// import LoadingScreen from './Pages/LoadingScreen';

// import LoginModal from './Pages/Login';
// import RegisterModal from './Pages/Register';
// import ForgotPasswordModal from './Pages/ForgotPasswordModal';
// import OtpVerifyModal from './Pages/OtpVerifyModal';
// import ResetPasswordModal from './Pages/ResetPasswordModal';

// import LoginPage from './Pages/LoginPage';
// import SubscriptionModal from './Pages/SubscriptionModal';
// import PaymentCallbackModal from './Pages/PaymentCallbackModal';
// import ProtectedRoute from './Pages/ProtectedRoute';

// function App() {
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);

//   const location = useLocation();

//   useEffect(() => {
//     if (location.pathname === '/paymentcallback') {
//       setShowPaymentModal(true);
//     } else {
//       setShowPaymentModal(false);
//     }
//   }, [location.pathname]);

//   const openLoginModal = () => setShowLoginModal(true);
//   const closeLoginModal = () => setShowLoginModal(false);


//   return (
//     <>
//       {/* Global modals */}
// <LoginModal show={showLoginModal} onClose={closeLoginModal} />
//       <RegisterModal />
//       <ForgotPasswordModal />
//       <OtpVerifyModal />
//       <ResetPasswordModal />

//       <Routes>
//         <Route path="/" element={<LoadingScreen />} />
//         <Route path="/home" element={<HomePage />} />

//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterModal />} />

//         <Route path="/subscription" element={<SubscriptionModal />} />

//         {/* Protected routes */}
//         <Route
//           path="/admindashboard"
//           element={
//             <ProtectedRoute allowedRoles={['admin']}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/userdashboard"
//           element={
//             <ProtectedRoute allowedRoles={['user']}>
//               <UserDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/supplierdashboard"
//           element={
//             <ProtectedRoute allowedRoles={['supplier']}>
//               <SupplierDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>

//       {/* Payment modal with handler props */}
// <PaymentCallbackModal
//   show={showPaymentModal}
//   onClose={() => setShowPaymentModal(false)}
//   openGlobalLoginModal={openLoginModal}
// />

//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
//     </>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './Pages/Home';
import UserDashboard from './Pages/UserDashboard';
import SupplierDashboard from './Pages/SupplierDashboard';
import AdminDashboard from './Pages/AdminDashboard';
import LoadingScreen from './Pages/LoadingScreen';

import LoginModal from './Pages/Login';
import RegisterModal from './Pages/Register';
import ForgotPasswordModal from './Pages/ForgotPasswordModal';
import OtpVerifyModal from './Pages/OtpVerifyModal';
import ResetPasswordModal from './Pages/ResetPasswordModal';

import LoginPage from './Pages/LoginPage';
import SubscriptionModal from './Pages/SubscriptionModal';
import PaymentCallbackModal from './Pages/PaymentCallbackModal';
import ProtectedRoute from './Pages/ProtectedRoute';

import SubscriptionSuccessFlow from './Pages/SubscriptionSuccessFlow';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessFlow, setShowSuccessFlow] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/paymentcallback') {
      setShowPaymentModal(true);
      setShowSuccessFlow(true); // Only show on payment callback page
    } else {
      setShowPaymentModal(false);
      setShowSuccessFlow(false);
    }
  }, [location.pathname]);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  return (
    <>
      {/* Global modals */}
      <LoginModal show={showLoginModal} onClose={closeLoginModal} />
      <RegisterModal />
      <ForgotPasswordModal />
      <OtpVerifyModal />
      <ResetPasswordModal />

      <Routes>
        <Route path="/" element={<LoadingScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterModal />} />
        <Route path="/subscription" element={<SubscriptionModal />} />

        {/* Protected routes */}
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userdashboard"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplierdashboard"
          element={
            <ProtectedRoute allowedRoles={['supplier']}>
              <SupplierDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Subscription Success Flow: show only on payment callback */}
      {showSuccessFlow && (
        <SubscriptionSuccessFlow
          onLoginClick={openLoginModal}
        />
      )}

      <PaymentCallbackModal
        show={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        openGlobalLoginModal={openLoginModal}
      />

      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}

export default App;
