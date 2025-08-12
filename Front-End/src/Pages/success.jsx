// Success.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Success = () => {
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState(null);
  const query = new URLSearchParams(useLocation().search);
  const sessionId = query.get('session_id');

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) return;
      try {
        // Optional: fetch session details from your backend (create API for this)
        // const res = await axios.get(`/api/stripe/session/${sessionId}`);
        // setSessionData(res.data);
        setSessionData({ sessionId }); // or set your own success data
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Payment Success!</h1>
      <p>Your payment session ID: {sessionData?.sessionId}</p>
      {/* Show other info or navigate */}
    </div>
  );
};

export default Success;
