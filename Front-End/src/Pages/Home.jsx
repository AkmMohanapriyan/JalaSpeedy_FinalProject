import React, { useEffect, useRef, useState } from 'react';
import '../assets/Css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundVideo from '../assets/BG-VDO.mp4';
// import AboutImg from '../assets/Bg.png'
import 'bootstrap-icons/font/bootstrap-icons.css';
import LoginModal from './Login';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import HomeAnimation from './HomeAnimation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder";
import MarqueeFeedback from '../Pages/MarqueeFeedback';
import AboutImg from '../assets/Bg.jpg'


const HomeSection = () => {

  const features = [
    {
      icon: 'bi-graph-up',
      title: 'Real-Time Monitoring',
      desc: 'Track live water distribution and usage across all areas in real-time.',
    },
    {
      icon: 'bi-layout-text-window',
      title: 'Customizable Dashboard',
      desc: 'Personalize your dashboard with widgets, usage stats, and alerts.',
    },
    {
      icon: 'bi-bell',
      title: 'Role-Based Notification',
      desc: 'Send tailored alerts to users, admins, or service providers.',
    },
    {
      icon: 'bi-headset',
      title: 'Customer Support Portal',
      desc: '24/7 support system for handling service queries and complaints.',
    },
    {
      icon: 'bi-exclamation-triangle',
      title: 'Emergency Alerts',
      desc: 'Automatically notify affected areas during breakdowns or shortages.',
    },
    {
      icon: 'bi-person-badge',
      title: 'Role-Based Access Control',
      desc: 'Assign permissions based on user roles to ensure secure access.',
    },
    {
      icon: 'bi-shield-lock',
      title: 'Secure Access',
      desc: 'All data is encrypted and access-controlled using modern security.',
    },
    {
      icon: 'bi-bar-chart',
      title: 'Usage Analytics',
      desc: 'Visual reports and metrics to analyze water usage patterns.',
    },
    {
      icon: 'bi-droplet',
      title: 'Water Request System',
      desc: 'Users can easily request water deliveries with scheduling options.',
    },
  ];


  const services = [
    {
      title: 'Purified Drinking Water Delivery',
      desc: 'Enjoy clean, purified drinking water delivered directly to your home or office via bowser truck.',
      icon: 'bi-droplet-half'
    },
    {
      title: 'Emergency Drinking Water Supply',
      desc: 'Instant access to safe drinking water during shortages, outages, or crises—delivered fast when you need it most.',
      icon: 'bi-truck'
    },
    {
      title: 'Scheduled Water Delivery',
      desc: 'Get water delivered to your doorstep at your preferred time with our reliable scheduling system.',
      icon: 'bi bi-droplet'
    },
    {
      title: 'On-Demand Emergency Supply',
      desc: 'Need urgent water? Request a bowser truck anytime for immediate delivery during water outages or emergencies.',
      icon: 'bi-exclamation-octagon'
    },
    {
      title: 'Usage Monitoring',
      desc: 'Track your daily, weekly, and monthly water consumption from your dashboard.',
      icon: 'bi-graph-up-arrow'
    },
    {
      title: 'Swimming Pool Filling',
      desc: 'Fast and efficient bowser truck delivery for initial pool fills or refills.',
      icon: 'bi-truck'
    },
    {
      title: 'Bulk Water Supply for Events',
      desc: 'Perfect for weddings, festivals, or public gatherings—our trucks can supply large volumes on short notice.',
      icon: 'bi-lightning-fill'
    },
    {
      title: 'Agricultural Water Support',
      desc: 'Bowser supply for farms, irrigation, livestock, and greenhouse needs.',
      icon: 'bi-droplet-half'
    },
    {
      title: 'Report Water Quality Issues',
      desc: 'Notice unusual color, odor, or taste? Submit a report so we can inspect and take corrective action promptly.',
      icon: 'bi bi-flag-fill'
    },
  ];


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    setIsLoggedIn(!!user);
  }, []);

  // Water Request
  const [purpose, setPurpose] = useState("Drinking");
  const [amount, setAmount] = useState("");
  const [location, setLocation] = useState("");
  const [dateNeeded, setDateNeeded] = useState("");


  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const modalEl = document.getElementById('emergencyRequestModal');
    if (showModal) {
      const modal = new window.bootstrap.Modal(modalEl);
      modal.show();
      modalEl.addEventListener('hidden.bs.modal', () => {
        setShowModal(false); // close on backdrop or X
      });
    }
  }, [showModal, setShowModal]);


  // Submit Water Request
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('auth_token');
      if (!token || token === "undefined" || token === "null") {
        toast.error("Invalid or missing token.");
        return;
      }


      await axios.post("http://localhost:5000/api/requests", {
        purpose,
        amount,
        location,
        dateNeeded,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      toast.success("Request submitted successfully!");
      setPurpose("Drinking");
      setAmount("");
      setLocation("");
      setDateNeeded("");
    } catch (error) {
      console.error("Error submitting request:", error);
      const msg = error?.response?.data?.message || "Unknown error";
      toast.error("Submission failed: " + msg);
    }
  };


  // Submit Reports
  const handleReportSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('auth_token');
      if (!token || token === "undefined" || token === "null") {
        toast.error("Invalid or missing token.");
        return;
      }


      const res = await axios.post("http://localhost:5000/api/reports", report, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Report submitted successfully!");
      setReport({ type: '', location: '', dateOfIssue: '', description: '' });
    } catch (error) {
      console.error("Report submission error:", error.response?.data || error.message);
      toast.error("Failed to submit report.");
    }
  };

  // Handle Service Click
  const handleServiceClick = (index) => {
    if (!isLoggedIn) {
      toast.warning('Please log in to use this service!');
      return;
    }

    if (index === 0) {
      const modal = new window.bootstrap.Modal(document.getElementById('waterRequestModal'));
      modal.show();
    } else if (index === 8) {
      const modal = new window.bootstrap.Modal(document.getElementById('reportIssueModal'));
      modal.show();
    }
  };


  const [report, setReport] = useState({
    type: '',
    location: '',
    dateOfIssue: '',
    description: '',
  });

  const handleReportChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };


  // Contact Section
  const [user, setUser] = useState(null);

  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userData = JSON.parse(localStorage.getItem("user"));
    if (token) {
      setUser({ token, ...userData });
    }
  }, []);

  const submitContactForm = async (data) => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      toast.error("Please login to send a message");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/contact', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed");
    }
  };


  const handleContactSubmit = (e) => {
    e.preventDefault();

    if (!user || !user.token) {
      toast.error("Please login to send a message");
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message
    };

    submitContactForm(data, user.token);
  };


  // Feedback Section 

  const [feedbackData, setFeedbackData] = useState({
    fullName: "",
    email: "",
    serviceUsed: "",
    message: "",
  });

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData({ ...feedbackData, [name]: value });
  };


  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        toast.error("Please login before submitting feedback.");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/feedback", feedbackData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Feedback submitted successfully!");
      setFeedbackData({ fullName: "", email: "", serviceUsed: "", message: "" });
    } catch (error) {
      console.error("Error submitting feedback:", error.response?.data || error.message);
      toast.error("Failed to submit feedback.");
    }
  };



  return (
    <>

      <Navbar />

      <HomeAnimation />

      {/* Home Section */}

      {/* <section id="home" className="text-center home-section">

        <video autoPlay loop muted playsInline className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

        <div className="container-fluid">
          <div className='hero-section'>
          <h1 className="mb-3">JalaSpeedy Trusted Water Supply Partner</h1>

          <p className='text-justify'>Welcome to JalaSpeedy, the modern solution for fast and dependable water delivery services. In an age where every drop counts, we ensure that your home, business, or community never goes without the water it needs. At JalaSpeedy, we’re not just a water supply company — we are a mission-driven team committed to making water accessible, affordable, and timely for everyone. Whether you're facing a shortage, planning ahead, or responding to an emergency, our platform is designed to connect you with verified water suppliers in just a few clicks.</p>
          <p className="mb-4">
            Efficiently manage water distribution, track usage and equitable access to clean water for all communities with our advanced water supply management platform.
          </p>
          <a href={LoginModal} className="btn btn-get-started mb-5" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#loginModal">Get Started</a>
          </div>

          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div className="feature-box">
                <div className="icon fs-2">💧</div>
                <h5>Water Request System</h5>
                <p>Users can easily submit water requests with specific details about quantity, date, and location.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-box">
                <div className="icon fs-2">📊</div>
                <h5>Real-Time Monitoring</h5>
                <p>Administrators can track all water requests and manage distribution efficiently.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-box">
                <div className="icon fs-2">🔒</div>
                <h5>Secure Access</h5>
                <p>Role-based access control ensures proper authorization for users and admins.</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}


      {/* About Section */}

      <section id="about">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* <!-- Text Column --> */}
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="about-title" style={{ color: "#000428" }}>Who We Are?</h2>
              <div className='about-main d-flex flex-column flex-md-row gap-3 p-3 rounded'>
                <div className='first-div flex-fill p-3 rounded w-100 mb-3' style={{
                  backgroundColor: "#004e92",
                  color: "#ffffff",
                }}>
                  <p className="about-text m-0">
                    {/* JalaSpeedy is a smart and efficient water supply management platform designed to improve how communities, municipalities,
                    and organizations manage water distribution. It enables real-time tracking, intelligent scheduling, and ensures
                    fair and sustainable access to clean water. */}
                    JalaSpeedy – Smart water delivery, tracked in real-time. Fair, efficient, sustainable. 💧🚚
                  </p>
                </div>
                <div className='second-div flex-fill p-3 rounded w-100' style={{
                  backgroundColor: "#004e92",
                  color: "#ffffff",
                }}>
                  <p className="about-text m-0">
                    {/* With user-friendly tools and secure access for all roles—citizens, providers, and admins—JalaSpeedy transforms the traditional
                    water supply system into a modern digital solution. */}
                    JalaSpeedy – A digital water platform for everyone. Easy, secure, and modern. 💧🌐 Smart. Fair. Connected.
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- Image Column --> */}
            <div className="col-md-6">
              <img
                src={AboutImg}
                alt="About JalaSpeedy"
                className="about-image"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}

      <section id="features" className="feature-section py-1">
        <div className="container-fluid">
          <div className="text-center mb-5">
            <h2 className="fw-bold feature-title" style={{ color: "#000428" }}>Features</h2>
            <p className="">Discover what makes JalaSpeedy reliable and powerful</p>
          </div>

          <div className="row g-4">
            {features.map((feature, index) => (
              <div className="col-12 col-md-4 col-lg-4" key={index}>
                <div className="feature-card text-center p-4 h-100 shadow-sm rounded">
                  <div className="feature-icon mb-3" style={{ color: "#000428" }}>
                    <i className={`bi ${feature.icon} fs-1`}></i>
                  </div>
                  <h5 className="fw-semibold" style={{ color: "#000428" }}>{feature.title}</h5>
                  <p className="text-dark">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



    <section>
      <MarqueeFeedback />
    </section>

      {/* Feedback Section (only if user is logged in) */}
      {isLoggedIn && (
        <section
          className="feedback-section pb-5"
          style={{
            backgroundColor: "#f6f6f6",
          }}
        >
          <div className="container-fluid">
            <div className="row mt-5 pt-5 pb-5">
              {/* Left Column: Feedback-related Content */}
              <div className="col-md-6">
                <h2 className="mb-4 pt-5 pb-3 text-center" style={{ color: "#000428" }}>Why Your Feedback Matters</h2>

                {/* Card 1 */}
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Improve Our Services</h5>
                    <p className="card-text">
                      We continuously enhance JalaSpeedy based on your suggestions
                      to provide better water delivery experiences.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Report Issues Easily</h5>
                    <p className="card-text">
                      Facing any delay or problem? Let us know immediately to
                      resolve them quickly and improve service quality.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Stay Connected</h5>
                    <p className="card-text">
                      Through your feedback, we build a stronger connection and
                      serve your local water needs better.
                    </p>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Easy & Quick</h5>
                    <p className="card-text">
                      Just fill the form—takes less than a minute to help us grow
                      and serve you better!
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Feedback Form */}
              <div className="col-md-6 pt-3 pb-2">
                <h2 className="mb-4 text-center" style={{ color: "#000428" }}>Submit Your Feedback</h2>
                <div
                  className="feedback-form"
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                >

                  <form onSubmit={handleFeedbackSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="fullName"
                        value={feedbackData.fullName}
                        onChange={handleFeedbackChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={feedbackData.email}
                        onChange={handleFeedbackChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="service" className="form-label">Service Used</label>
                      <select
                        className="form-select"
                        id="service"
                        name="serviceUsed"
                        value={feedbackData.serviceUsed}
                        onChange={handleFeedbackChange}
                        required
                      >
                        <option value="" disabled>Select a service</option>
                        <option value="drinking">Drinking Water Supply</option>
                        <option value="cleaning">Water for Cleaning</option>
                        <option value="construction">Construction Use</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="feedback" className="form-label">Your Feedback</label>
                      <textarea
                        className="form-control"
                        id="feedback"
                        name="message"
                        rows="4"
                        value={feedbackData.message}
                        onChange={handleFeedbackChange}
                        placeholder="Write your feedback here..."
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn-send w-100 p-2"
                      style={{ backgroundColor: "#000428", color: "white", borderRadius: "10px" }}
                    >
                      Submit Feedback
                    </button>
                  </form>


                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}

      <section id="services" className="service-section py-1 bg-white">
        <div className="container-fluid">
          <div className="text-center mb-5">
            <h2 className="fw-bold service-title" style={{ color: "#000428" }}>Our Services</h2>
            <p className="">JalaSpeedy provides a range of services to make water supply smarter and accessible</p>
          </div>

          <div className="row g-4">
            {services.map((service, index) => (
              <div className="col-md-4" key={index}>
                <div className="service-card h-100 text-center p-4 shadow-sm bg-light rounded"
                  style={{ cursor: isLoggedIn && (index === 0 || index === 8) ? 'pointer' : 'not-allowed' }}
                  onClick={() => handleServiceClick(index)}>
                  <div className="service-icon mb-3" style={{ color: "#000428" }}>
                    <i className={`bi ${service.icon} fs-1`}></i>
                  </div>
                  <h5 className="fw-semibold" style={{ color: "#000428" }}>{service.title}</h5>
                  <p className="">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*Water Request Modal */}
      <div
        className="modal fade"
        id="waterRequestModal"
        tabIndex="-1"
        aria-labelledby="waterRequestModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="waterRequestModalLabel">
                Water Request Form
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Purpose</label>
                    <select
                      className="form-select"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      required
                    >
                      <option value="">Select Purpose</option>
                      <option value="Drinking">Drinking</option>
                      <option value="Irrigation">Irrigation</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Amount (Liters)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g. 1000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Date Needed</label>
                    <input
                      type="date"
                      className="form-control"
                      value={dateNeeded}
                      onChange={(e) => setDateNeeded(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn-submit w-100 p-2"
                  style={{ backgroundColor: "#000428", color: "white", borderRadius: "10px" }}
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>


      {/* Report Modal */}
      {/* Modal */}
      <div
        className="modal fade"
        id="reportIssueModal"
        tabIndex="-1"
        aria-labelledby="reportIssueModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h5 className="modal-title" id="reportIssueModalLabel">Report Water Issue</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form className="mt-2" onSubmit={handleReportSubmit}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Report Type</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Leakage, Contamination"
                      name="type"
                      value={report.type}
                      onChange={handleReportChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter location"
                      name="location"
                      value={report.location}
                      onChange={handleReportChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Date of Issue</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dateOfIssue"
                      value={report.dateOfIssue}
                      onChange={handleReportChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Describe the issue..."
                      name="description"
                      value={report.description}
                      onChange={handleReportChange}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn-submit p-2 w-100"
                  style={{ backgroundColor: "#000428", color: "white", borderRadius: "10px" }}
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>




      {/* Contact Section */}

      <section id="contact" className="contact-section py-1">
        <div className="container-fluid">
          {/* Row 1 */}
          <div className="row gy-5">
            {/* Contact Details */}
            <div className="col-md-6">
              <h3 className="mb-4" style={{ color: "#000428" }}>GetIn Touch</h3>
              <p>Ready to start your next project? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="bi bi-envelope-fill me-2" style={{ color: "#000428" }}></i>
                  Email Us: <a href="mailto:info@jalaspeedy.lk">info@jalaspeedy.lk</a>
                </li>
                <li className="mb-3">
                  <i className="bi bi-telephone-fill me-2" style={{ color: "#000428" }}></i>
                  Call Us: <a href="tel:+94761989195">+94 76 198 9195</a>
                </li>
                <li className="mb-3">
                  <i className="bi bi-geo-alt-fill me-2" style={{ color: "#000428" }}></i>
                  Visit Us: No. 123, Water Street, Colombo, Sri Lanka
                </li>
                <li className="mb-4">
                  <i className="bi bi-clock-fill me-2" style={{ color: "#000428" }}></i>
                  Working Hours: 24/7 Support Available
                </li>
              </ul>

              {/* Social Media Icons */}
              <div className="d-flex gap-3 fs-4 social">
                <a href="#" className="text-primary"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-success"><i className="bi bi-whatsapp"></i></a>
                <a href="#" className="text-info"><i className="bi bi-telegram"></i></a>
                <a href="#" className="text-danger"><i className="bi bi-instagram"></i></a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-md-6">
              <h3 className="mb-4" style={{ color: "#000428" }}>Send Us a Message</h3>
              <form onSubmit={handleContactSubmit}>
                <div className="row mb-3">
                  <div className="col">
                    <input type="text" className="form-control" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="tel" className="form-control" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" rows="4" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
                <button type="submit" className="btn-sendMsg">Send Message</button>
              </form>
            </div>
          </div>

          {/* Row 2 - Google Map */}
          <div className="row mt-5">
            <div className="col">
              <div className="map-responsive">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.6998624333014!2d79.86267917547579!3d9.706636978012943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe4dd58cc450c3%3A0x94ed257173d6e40!2sKarainagar%20Jetty!5e0!3m2!1sen!2slk!4v1751308785009!5m2!1sen!2slk" width="600" height="450" allowFullScreen="" loading="lazy"></iframe>
              </div>
            </div>
          </div>

          {/* Row 3 - Emergency Info */}
          <div className="row mt-5">
            <div className="col emergency-box p-4 rounded bg-white shadow-sm">
              <h4 className="text-danger">Emergency Water Supply System</h4>
              <p className="mb-1">
                For urgent water supply needs outside regular business hours, please contact our
                emergency response team immediately.
              </p>
              <p className="fw-bold">📞 +94 76 198 9195</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />


      <style>
        {
          `
  @media (max-width: 768px) {
    .about-main {
      display: block !important;
    }

    .about-main .first-div,
    .about-main .second-div {
      margin-bottom: 3px; /* adjust as needed */
    }
  }

  /* Above 768px – default layout */
  @media (min-width: 769px) {
    .about-main {
      display: flex !important;
      gap: 3px;
    }

    .about-main .first-div,
    .about-main .second-div {
      margin-bottom: 0 !important;
    }
  }

@media (max-width: 978px) {
  .about-main {
    display: block !important;
  }

  .about-main .first-div,
  .about-main .second-div {
    display: block !important;
    width: 100% !important;
    margin-bottom: 3px;
  }
}

@media (min-width: 979px) {
  .about-main {
    display: flex !important;
    gap: 3px;
  }

  .about-main .first-div,
  .about-main .second-div {
    margin-bottom: 0 !important;
  }
}




  @media (max-width: 1240px) {
    .about-main {
      display: block !important;
      width: 100% !important;
    }

    .about-main .first-div,
    .about-main .second-div {
      display: block !important;
      width: 100% !important;
      margin-bottom: 1rem;
    }
  }

  @media (min-width: 1241px) {
    .about-main {
      display: flex !important;
      gap: 1rem;
    }

    .about-main .first-div,
    .about-main .second-div {
      margin-bottom: 0 !important;
    }
  }
  
                `
        }
      </style>


    </>
  );
};

export default HomeSection;

