import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoginModal from '../Pages/Login'; // Adjust path as needed

const PaymentCallbackModal = ({ show, onClose }) => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!sessionId || !show) return;

    const fetchSession = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/stripe/session/${sessionId}`);
        const session = res.data;

        if (session.payment_status === 'paid' || session.status === 'complete') {
          setPaymentSuccess(true);
          setError(null);
        } else {
          setError('Payment not completed.');
          setPaymentSuccess(false);
        }
      } catch (err) {
        console.error('Payment session fetch error:', err);
        setError('Failed to verify payment session.');
        setPaymentSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId, show]);

  const handleLoginButtonClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
    onClose(); // Close payment modal too
  };

  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Status</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {loading && <p>Verifying payment...</p>}
          {error && <div className="text-danger">{error}</div>}

          {!loading && paymentSuccess && (
            <>
              <h4 className="text-success mb-3">Payment Successful!</h4>
              <p>Please click the button below to login.</p>
              <Button variant="primary" onClick={handleLoginButtonClick}>
                Login
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Show login modal after user clicks button */}
      <LoginModal show={showLoginModal} onClose={handleLoginClose} />
    </>
  );
};

export default PaymentCallbackModal;
