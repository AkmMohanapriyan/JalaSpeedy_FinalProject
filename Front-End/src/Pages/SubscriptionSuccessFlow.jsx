import React, { useState } from 'react';
import SuccessPopup from '../Pages/PaymentCallbackModal';

const SubscriptionSuccessFlow = ({ onLoginClick }) => {
  const [showSuccess, setShowSuccess] = useState(true);

  const handleLoginButtonClick = () => {
    setShowSuccess(false);      // hide success popup
    onLoginClick();             // show login modal from App
  };

  return (
    <>
      {showSuccess && (
        <SuccessPopup onLoginClick={handleLoginButtonClick} />
      )}
    </>
  );
};

export default SubscriptionSuccessFlow;
