import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const OtpVerifyModal = () => {
    const [otp, setOtp] = useState('');

    const handleVerify = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('reset_email');
        try {
            await axios.post('http://localhost:5000/api/users/verify-otp', { email, otp });
            toast.success('OTP Verified');
            bootstrap.Modal.getInstance(document.getElementById('otpVerifyModal')).hide();
            new bootstrap.Modal(document.getElementById('resetPasswordModal')).show();
        } catch (err) {
            toast.error(err.response?.data?.message || 'OTP Verification Failed');
        }
    };

    return (
        <div className="modal fade" id="otpVerifyModal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header">
                        <h5 className="modal-title">Verify Code</h5>
                        <button className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleVerify}>
                            <div className="mb-3">
                                <label>Enter 6-digit Code</label>
                                <input
                                    type="text"
                                    maxLength="6"
                                    className="form-control"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-verfy p-2 w-100" style={{ backgroundColor: "#000428", color: "white", borderRadius: "10px" }}>Verify Code</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerifyModal;
