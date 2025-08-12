
import React, { useEffect } from 'react';
import LoginModal from '../Pages/Login';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const showModal = params.get('showModal');

    if (showModal === 'true') {
      const modalEl = document.getElementById('loginModal');
      if (modalEl) {
        const modal = new window.bootstrap.Modal(modalEl);
        modal.show();
        toast.success('Subscription successful. Please log in.');
      }
    }
  }, [location]);

  return <LoginModal />;
};

export default LoginPage;
