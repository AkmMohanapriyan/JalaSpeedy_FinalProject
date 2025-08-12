import React from 'react';

const LoginLoader = ({ username }) => {
  return (
    <>
      <style>{`
        .login-loader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(255, 255, 255, 0.95);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .login-spinner {
          width: 3rem;
          height: 3rem;
          border: 5px solid #ccc;
          border-top: 5px solid #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .login-message {
          font-size: 1.2rem;
          font-weight: 500;
          text-align: center;
          color: #333;
        }
      `}</style>

      <div className="login-loader-overlay">
        <div className="login-spinner"></div>
        <div className="login-message">
          You logged in successfully. <br />
          Welcome to <span className="text-primary">JalaSpeedy</span>!
        </div>
      </div>
    </>
  );
};

export default LoginLoader;
