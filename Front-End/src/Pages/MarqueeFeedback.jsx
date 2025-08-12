import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./MarqueeFeedback.css"; // import the styles
import "../assets/Css/MarqueeFeedback.css"

const MarqueeFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const { data } = await axios.get("/api/feedback");
        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    };

    fetchFeedbacks();
  }, []);

  if (feedbacks.length === 0) return null;

  return (
    <section className="feedback-marquee-section py-5" style={{backgroundColor : "#004e92"}}>
      <div className="container-fluid">
        <h4 className="text-center fw-bold mb-4" style={{ color: "#000428" }}>
          💬 What Our Users Say
        </h4>
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {feedbacks.map((fb, index) => (
              <div className="marquee-item" key={index}>
                <p className="feedback-text text-justify text-dark">"{fb.message}"</p>
                <p className="feedback-user">- {fb.fullName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarqueeFeedback;