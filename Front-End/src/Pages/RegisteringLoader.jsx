import React from 'react';

const RegisteringLoader = ({ username }) => (
  <>
    <style>{`
      .loader-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        background: rgba(255, 255, 255, 0.95);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .spinner-circle {
        width: 3rem;
        height: 3rem;
        border: 5px solid #ccc;
        border-top-color: #007bff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>

    <div className="loader-overlay">
      <div className="spinner-circle"></div>
      <p className="fs-5">
        Dear <strong>{username}</strong>! Your Account is being created. Please wait...
      </p>
    </div>
  </>
);

export default RegisteringLoader;
