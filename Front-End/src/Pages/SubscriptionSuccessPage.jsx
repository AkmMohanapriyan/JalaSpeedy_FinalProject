
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const StripeSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRegistrationAfterPayment = async () => {
      const pending = JSON.parse(localStorage.getItem('pending_registration'));

      if (!pending || !pending.formData || !pending.paymentDetails || !pending.selectedPlan) {
        toast.error('Missing registration or subscription info.');
        return navigate('/');
      }

      try {
        // Step 1: Register user
        const res = await axios.post('http://localhost:5000/api/users/register', pending.formData, {
          headers: { 'Content-Type': 'application/json' }
        });

        const user = res.data;
        const token = user.token;

        // Step 2: Save subscription with full paymentDetails
        await axios.post('http://localhost:5000/api/subscriptions', {
          plan: pending.selectedPlan,
          paymentDetails: pending.paymentDetails
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Step 3: Show success and redirect
        toast.success(`Welcome ${pending.formData.username}! Subscription activated.`);
        localStorage.removeItem('pending_registration');

        setTimeout(() => navigate('/login?showModal=true'), 1500);

      } catch (err) {
        console.error('Post-payment registration failed:', err);
        toast.error(err?.response?.data?.message || 'Registration or subscription failed.');
        navigate('/');
      }
    };

    handleRegistrationAfterPayment();
  }, [navigate]);

  return null; // no UI needed, only logic
};

export default StripeSuccess;
