import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPasswordModal = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirm) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const email = localStorage.getItem('reset_email');
      await axios.put('http://localhost:5000/api/users/reset-password', {
        email,
        newPassword,
      });

      toast.success('Password changed successfully. Please login.');
      localStorage.removeItem('reset_email');
      bootstrap.Modal.getInstance(document.getElementById('resetPasswordModal')).hide();
      new bootstrap.Modal(document.getElementById('loginModal')).show();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="modal fade" id="resetPasswordModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-header">
            <h5 className="modal-title">Reset Password</h5>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleReset}>
              <div className="mb-3">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-newPassWord p-2 w-100" style={{ backgroundColor: "#000428", color: "white", borderRadius: "10px" }}>Set New Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
