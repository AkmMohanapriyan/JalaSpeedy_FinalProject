// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import axios from 'axios';
// import SubscriptionModal from './SubscriptionModal';  // optional if needed
// import LoginModal from './Login'; // your existing login modal component
// import { toast } from 'react-toastify';

// const PaymentCallback = ({ openLoginModal }) => {
//   const [searchParams] = useSearchParams();
//   const sessionId = searchParams.get('session_id');

//   const [loading, setLoading] = useState(true);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [error, setError] = useState(null);
//   const [showLogin, setShowLogin] = useState(false);

//   useEffect(() => {
//     if (!sessionId) {
//       setError('Missing session ID');
//       setLoading(false);
//       return;
//     }

//     const fetchSession = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/stripe/session/${sessionId}`);
//         const session = res.data;

//         // Check payment status depending on mode:
//         // For subscription: check subscription status
//         if (session.payment_status === 'paid' || session.status === 'complete') {
//           setPaymentSuccess(true);
//           // Show login modal
//           setShowLogin(true);
//         } else {
//           setError('Payment not completed');
//         }
//       } catch (err) {
//         console.error(err);
//         setError('Failed to verify payment session.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSession();
//   }, [sessionId]);

//   const handleCloseLogin = () => {
//     setShowLogin(false);
//     // You may redirect to home or elsewhere if needed:
//     window.location.href = '/home';
//   };

//   if (loading) return <div className="text-center mt-5">Verifying payment...</div>;

//   if (error) return <div className="alert alert-danger mt-5 text-center">{error}</div>;

//   return (
//     <>
//       {paymentSuccess && (
//         <div className="text-center mt-5">
//           <h3 className="text-success">Payment Successful!</h3>
//           <p>Please login to continue.</p>
//         </div>
//       )}

//       {/* Show Login Modal */}
//       {showLogin && <LoginModal show={showLogin} onClose={handleCloseLogin} />}
//     </>
//   );
// };

// export default PaymentCallback;


// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import axios from 'axios';
// import Modal from 'react-bootstrap/Modal';
// import { toast } from 'react-toastify';
// import LoginModal from './Login'; // Optional: include if you want login after payment

// const PaymentCallbackModal = ({ show, onClose }) => {
//   const [searchParams] = useSearchParams();
//   const sessionId = searchParams.get('session_id');

//   const [loading, setLoading] = useState(true);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [error, setError] = useState(null);
//   const [showLogin, setShowLogin] = useState(false);

//   useEffect(() => {
//     if (!show) return;

//     if (!sessionId) {
//       setError('Missing session ID');
//       setLoading(false);
//       return;
//     }

//     const fetchSession = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/stripe/session/${sessionId}`);
//         const session = res.data;

//         if (session.payment_status === 'paid' || session.status === 'complete') {
//           setPaymentSuccess(true);
//           setShowLogin(true); // optionally show login modal after payment
//         } else {
//           setError('Payment not completed');
//         }
//       } catch (err) {
//         console.error(err);
//         setError('Failed to verify payment session.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSession();
//   }, [sessionId, show]);

//   const handleClose = () => {
//     setShowLogin(false);
//     onClose(); // close parent modal
//   };

//   return (
//     <>
//       {/* Main Payment Status Modal */}
//       <Modal show={show} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Payment Status</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="text-center">
//           {loading && <p>Verifying payment...</p>}
//           {error && <div className="text-danger">{error}</div>}
//           {paymentSuccess && (
//             <>
//               <h4 className="text-success">Payment Successful!</h4>
//               <p>Please login to continue.</p>
//             </>
//           )}
//         </Modal.Body>
//       </Modal>

//       {/* Optional: Show login modal after payment */}
//       {showLogin && <LoginModal show={showLogin} onClose={handleClose} />}
//     </>
//   );
// };

// export default PaymentCallbackModal;

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const PaymentCallbackModal = ({ show, onClose }) => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (!show) return;

    if (!sessionId) {
      setError('Missing session ID');
      setLoading(false);
      return;
    }

    const fetchSession = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/stripe/session/${sessionId}`);
        const session = res.data;

        if (session.payment_status === 'paid' || session.status === 'complete') {
          setPaymentSuccess(true);
          setShowSuccessMessage(true);
          
          // Hide success message after 2 seconds and show login modal
          setTimeout(() => {
            setShowSuccessMessage(false);
            const loginModal = new window.bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
          }, 2000);
        } else {
          setError('Payment not completed');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to verify payment session.');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId, show]);

  return (
    <>
      {/* Payment Status Modal */}
      <Modal show={show && (loading || error || showSuccessMessage)} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Status</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {loading && <p>Verifying payment...</p>}
          {error && <div className="text-danger">{error}</div>}
          {showSuccessMessage && (
            <>
              <h4 className="text-success">Payment Successful!</h4>
              <p>Redirecting to login...</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PaymentCallbackModal;