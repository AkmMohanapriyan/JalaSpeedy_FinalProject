import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPasswordModal = () => {
  const [email, setEmail] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/send-otp', { email });
      localStorage.setItem('reset_email', email); // store email temporarily
      toast.success('Verification code sent to your email.');
      const modal = bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal'));
      modal.hide();
      new bootstrap.Modal(document.getElementById('otpVerifyModal')).show();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP.');
    }
  };

  return (
    <div className="modal fade" id="forgotPasswordModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-header">
            <h5 className="modal-title">Forgot Password</h5>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSendOtp}>
              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className="btn-send p-2 w-100" type="submit" style={{ backgroundColor: "#000428", color: "white", borderRadius: "10px" }}>Send Code</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
