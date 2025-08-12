import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Css/LoadingScreen.css';

const LoadingScreen = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 100);
    const navTimer = setTimeout(() => navigate("/home"), 400);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className={`loading-container ${fadeOut ? "fade-out" : ""}`}>
      <div className="logo-container">
        <h1 className="flip-in-text neon-text">JALASPEEDY</h1>
        <div className="shimmer-bar"></div>
      </div>

      <div className="dots mt-4">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingScreen;