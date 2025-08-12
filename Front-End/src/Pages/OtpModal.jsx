
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Logo from '../assets/LOGO.png';

const OtpModal = ({ show, onClose, onVerify }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [isResending, setIsResending] = useState(false);
    const [resentMessage, setResentMessage] = useState('');
    const [cooldown, setCooldown] = useState(0);


    const email = localStorage.getItem('otp_email');

    const handleVerify = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/users/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Invalid OTP');

            onVerify();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleResendOtp = async () => {
        if (!email) {
            setError('Email not found in session');
            return;
        }

        setCooldown(30);
        setIsResending(true);
        setResentMessage('');
        setError('');

        try {
            const res = await fetch('http://localhost:5000/api/users/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to resend OTP');

            setResentMessage('OTP has been resent to your email.');
            toast.success('OTP resent successfully');

        } catch (err) {
            setError(err.message);
        } finally {
            setIsResending(false);
        }
    };

    if (!show) return null;

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);


    return (

        <>
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-3">
                    <div className="modal-header">
                        <h5 className="modal-title">Verify Your Email</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className='d-flex flex-column align-items-center'>
                            <div>
                            <img src={Logo} alt="JalaSpeedy Logo" className="img" style={{ maxWidth: '50px' }} />
                            </div>
                            <p className='d-block'><span className='fw-bold'>JalaSpeedy : </span> <span>Your Trusted Water Supply Partner</span></p>
                        </div>
                        <p className='email'>Enter the 6-digit OTP we sent to : <strong>{email}</strong>.</p>
                        <input
                            type="text"
                            className="form-control"
                            maxLength="6"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />

                        {error && <div className="text-danger mt-2">{error}</div>}
                        {resentMessage && <div className="text-success mt-2">{resentMessage}</div>}

                        <div className="mt-3 text-end">
                            <button
                                className="btn-link p-0"
                                disabled={isResending || cooldown > 0}
                                onClick={handleResendOtp}
                            >
                                {isResending ? 'Resending...' : cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
                            </button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-cancel" style={{ backgroundColor: "#000428", color: "white", borderRadius: "10px" }} onClick={onClose}>Cancel</button>
                        <button className="btn-verify" onClick={handleVerify} style={{ backgroundColor: "#000428", color: "white", borderRadius: "10px" }} disabled={otp.length !== 6}>Verify</button>
                    </div>
                </div>
            </div>
        </div>



        <style>
            {
                `
                .modal-content {
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .modal-header {
                    border-bottom: none;
                }
                .modal-title {
                    font-weight: bold;
                }
                .img {
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                }
                .form-control {
                    border-radius: 5px;
                }
                .btn-link {
                    background: none;
                    border: none;
                    color: #007bff;
                    text-decoration: none;
                }
                .btn-link:hover {
                    text-decoration: underline;
                }
                .btn-cancel, .btn-verify {
                    padding: 10px 20px;
                    border-radius: 5px;
                    color: #fff;
                }
                .btn-cancel {
                    background-color: #f44336;
                }
                .btn-verify {
                    background-color: #007bff;
                    pointer: cursor;
                }
                .btn-cancel:hover {
                    background-color: #d32f2f;
                }
                .btn-verify:hover {
                    background-color:rgb(14, 125, 244);
                }
                .modal-body {
                    text-align: center;
                }
                .modal-footer {
                    display: flex;
                    justify-content: space-between;
                }
                .text-danger {
                    color: #f44336;
                }
                .text-success {
                    color: #4caf50;
                }


                @media (max-width: 576px) {
                    .modal-dialog {
                        width: 90%;
                        margin: 0 auto;
                    }
                    .modal-content {
                        padding: 20px;
                    }
                    .modal-header, .modal-footer {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .modal-header {
                        margin-bottom: 20px;
                    }
                    .modal-title {
                        font-size: 1.5rem;
                    }
                    .img {
                        width: 80px;
                        height: 80px;
                    }
                    .btn-cancel, .btn-verify {
                        width: 100%;
                        margin-top: 10px;
                    }
                    .email {
                        font-size: 0.9rem;
                        margin-bottom: 10px;
                    }


                }
                    
                `
            }
        </style>

        </>
    );
};

export default OtpModal;
