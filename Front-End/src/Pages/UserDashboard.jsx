import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import EmergencyRequest from './EmergencyRequest';
import '../assets/Css/UserDashboard.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from '../Pages/Login';



const UserDashboard = () => {

  const navigate = useNavigate();

  // Logout 
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const handleNavigateHome = () => {
    navigate('/');
  };


  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [myRequests, setMyRequests] = useState([]);



  // Fetch All their Request As User
  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const token = localStorage.getItem("auth_token");

        if (!token) {
          console.error("No token found");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/requests/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMyRequests(res.data);
      } catch (error) {
        console.error("Error fetching requests:", error.response?.data || error.message);
      }
    };

    fetchMyRequests();
  }, []);


  // Water Request
  const [purpose, setPurpose] = useState("Drinking");
  const [amount, setAmount] = useState("");
  const [location, setLocation] = useState("");
  const [dateNeeded, setDateNeeded] = useState("");

  // View Requests
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // View Reports
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);


  // Water Request Submit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const token = localStorage.getItem('auth_token');

  //     if (!token) {
  //       toast.error("You are not logged in.");
  //       return;
  //     }

  //     await axios.post("http://localhost:5000/api/requests", {
  //       purpose,
  //       amount,
  //       location,
  //       dateNeeded,
  //     }, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       }
  //     });

  //     toast.success("Request submitted successfully!");
  //     setPurpose("Drinking");
  //     setAmount("");
  //     setLocation("");
  //     setDateNeeded("");
  //   } catch (error) {
  //     console.error("Error submitting request:", error);
  //     const msg = error?.response?.data?.message || "Unknown error";
  //     toast.error("Submission failed: " + msg);
  //   }
  // };

  const [hasRequestedToday, setHasRequestedToday] = useState(false);

  const user = JSON.parse(localStorage.getItem("auth_user")); // <-- Fix here
  const userId = user?._id;

  // useEffect(() => {
  //   const checkTodayRequest = async () => {
  //     try {
  //       const today = new Date().toISOString().split("T")[0];
  //       const res = await axios.get(`http://localhost:5000/api/water-requests/check-today/${userId}?date=${today}`);
  //       setHasRequestedToday(res.data.exists);
  //     } catch (error) {
  //       console.error("Error checking today's request:", error);
  //     }
  //   };

  //   if (userId) checkTodayRequest();
  // }, [userId]);

  useEffect(() => {
    const checkTodayRequest = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) return;

      try {
        const today = new Date().toISOString().split("T")[0];
        const res = await axios.get(`http://localhost:5000/api/water-requests/check-today?date=${today}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.exists) {
          setHasRequestedToday(true);
          toast.info("You have already submitted a water request today.");
        } else {
          setHasRequestedToday(false);
        }
      } catch (error) {
        console.error("Error checking today's request:", error);
      }
    };

    checkTodayRequest();
  }, []);

  //   const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const token = localStorage.getItem("auth_token");

  //   if (!token) {
  //     toast.error("You are not logged in.");
  //     return;
  //   }

  //   if (hasRequestedToday) {
  //     toast.warning("You can only submit one water request per day.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/requests",
  //       {
  //         purpose,
  //         amount,
  //         location,
  //         dateNeeded,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     toast.success("Request submitted successfully!");
  //     setPurpose("Drinking");
  //     setAmount("");
  //     setLocation("");
  //     setDateNeeded("");
  //     setHasRequestedToday(true); // block further submission
  //   } catch (error) {
  //     console.error("Error submitting request:", error);
  //     const msg = error?.response?.data?.message || "Unknown error";
  //     toast.error("Submission failed: " + msg);
  //   }
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("auth_token");
    if (!token) {
      toast.error("You are not logged in.");
      return;
    }

    if (hasRequestedToday) {
      toast.warning("You can only submit one water request per day.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/requests",
        {
          purpose,
          amount,
          location,
          dateNeeded,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Request submitted successfully!");
      setPurpose("Drinking");
      setAmount("");
      setLocation("");
      setDateNeeded("");
      setHasRequestedToday(true); // prevent further submission
    } catch (error) {
      console.error("Error submitting request:", error);
      const msg = error?.response?.data?.message || "Unknown error";
      toast.error("Submission failed: " + msg);
    }
  };


  // Repot Submiion
  const [report, setReport] = useState({
    type: '',
    location: '',
    dateOfIssue: '',
    description: '',
  });

  const handleReportChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  100
  // User Report Submit
  const handleReportSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        toast.error("User not authenticated");
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


  // Fetch User Reports
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) return alert("User not logged in");

      setLoading(true);

      const res = await axios.get("http://localhost:5000/api/reports/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReports(res.data);
    } catch (err) {
      console.error("Error fetching reports:", err.response?.data || err.message);
      alert("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "myreports") {
      fetchReports();
    }
  }, [activeTab]);


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsername(res.data.username || "User");
      } catch (err) {
        console.error("Failed to fetch user info:", err.response?.data || err.message);
        setUsername("User");
      }
    };

    fetchUserInfo();
  }, []);


  return (
    <>
      <EmergencyRequest />

      <div className="d-flex min-vh-100 userDashboard">
        {/* Sidebar */}
        <div
          className={`sidebar text-white p-3 ${sidebarOpen ? "d-block" : "d-none d-md-block"
            }`}
          style={{ width: "250px" }}
        >
          <h4 className="mb-4 mt-4 text-center" onClick={() => handleNavigateHome()} style={{ cursor: "pointer" }}>Jalaspeedy</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button
                className={`dashboard p-2 w-100 text-center ${activeTab === "dashboard"
                  ? "btn-light text-primary"
                  : "btn-outline-light"
                  }`}
                onClick={() => setActiveTab("dashboard")}
              >
                Dashboard
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className={`p-2 w-100 text-center ${activeTab === "request"
                  ? "btn-light text-primary"
                  : "btn-outline-light"
                  }`}
                onClick={() => setActiveTab("request")}
              >
                Water Request
              </button>
            </li>

            <li className="nav-item mb-2">
              <button className={`p-2 w-100 text-center ${activeTab === "myWaterRequest" ? "btn-light text-primary" : "btn-outline-light"}`} onClick={() => setActiveTab("myWaterRequest")}>My Water Request</button>
            </li>

            <li className="nav-item mb-2">
              <button
                className={`p-2 w-100 text-center ${activeTab === "report"
                  ? "btn-light text-primary"
                  : "btn-outline-light"
                  }`}
                onClick={() => setActiveTab("report")}
              >
                Report
              </button>
            </li>
            <li className="nav-item mb-5">
              <button
                className={`p-2 w-100 text-center ${activeTab === "myreports"
                  ? "btn-light text-primary"
                  : "btn-outline-light"
                  }`}
                onClick={() => setActiveTab("myreports")}
              >
                My Reports
              </button>
            </li>
          </ul>

          {/* Close Button (Mobile only) */}
          <div className="d-md-none mb-3">
            <button
              className="p-2 btn-outline-light p-2 w-100 close"
              onClick={() => setSidebarOpen(false)}
              style={{ backgroundColor: "#000428", borderRadius: "10px" }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f6f6f6" }}>
          {/* Top bar (Toggle & Username) */}

          {/* Top Navbar */}
          <div className="navbar navbar-expand-lg bg-white shadow-sm rounded px-3 px-md-4 py-2 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-center">

            {/* Top row: Logo and toggle button (for mobile) */}
            <div className="d-flex justify-content-between w-100 mb-2 mb-md-0">
              {/* Logo */}
              <div className="fw-bold fs-4 text-primary d-flex align-items-center">
                JalaSpeedy
              </div>

              {/* Sidebar toggle (only for small screens) */}
              <div className="d-md-none">
                <button
                  className="btn-outline-secondary p-2"

                  onClick={() => setSidebarOpen(true)}
                >
                  <i className="bi bi-list"></i>
                </button>
              </div>
            </div>

            {/* Bottom row: User & Logout (stacks on mobile, inline on desktop) */}
            <div className="d-flex align-items-center gap-3 flex-column flex-sm-row">
              {/* View-only user profile */}
              <div className="d-flex align-items-center" style={{ cursor: "default" }}>
                <i className="bi bi-person-circle fs-4 me-2 text-secondary"></i>
                <span className="fw-semibold">{username}</span>
              </div>

              {/* Logout Button */}
              <button className="btn-logout p-2 btn-sm" style={{ backgroundColor: "#000428", color: "white", borderRadius: "10px" }} onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i>
              </button>
            </div>
          </div>


          {/* Tab Content */}
          {activeTab === "dashboard" && (
            <div className="intro-text">
              <h3>Welcome to Jalaspeedy</h3>
              <p className="fw-bold">Pure Water Delivery Your Door Step</p>
              <p className="">
                Our water supply service ensures that you never run out of clean drinking water. Schedule a delivery today and experience hassle-free service.
                <br></br>
                This is your central dashboard to request water supply, report
                water issues, and view your past reports. Stay hydrated, stay
                safe!
              </p>

              <br></br>

              <hr />

              <br></br>

              <p className="">
                🚀 Whether you're requesting clean water for drinking, irrigation, or industrial use, Jalaspeedy is here to serve you quickly and efficiently.
              </p>

              <p>
                💧 Use the <strong>Water Request</strong> tab to place your request in just a few clicks. Provide your purpose, required amount, and location—our team will do the rest.
              </p>

              <p>
                🛠️ Noticed a leakage, contamination, or any other issue? Submit it through the <strong>Report</strong> tab and help us ensure water quality for everyone.
              </p>

              <p>
                📋 You can track all your past submissions in the <strong>My Reports</strong> tab. Stay informed, stay empowered!
              </p>

              <p className="fst-italic fw-bold">
                Thank you for helping us build a safer, cleaner water future.
              </p>
            </div>
          )}


          {/* Water Request */}
          {activeTab === "request" && (
            // <div>
            //   <h3>Water Request Form</h3>
            //   <form className="mt-4" onSubmit={handleSubmit}>
            //     <div className="mb-3">
            //       <label className="form-label">Purpose</label>
            //       <select className="form-select" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
            //         <option value="Drinking">Drinking</option>
            //         <option value="Irrigation">Irrigation</option>
            //         <option value="Industrial">Industrial</option>
            //       </select>
            //     </div>
            //     <div className="mb-3">
            //       <label className="form-label">Amount (Liters)</label>
            //       <input
            //         type="number"
            //         className="form-control"
            //         placeholder="e.g. 1000"
            //         value={amount}
            //         onChange={(e) => setAmount(e.target.value)}
            //         required
            //       />
            //     </div>
            //     <div className="mb-3">
            //       <label className="form-label">Location</label>
            //       <input
            //         type="text"
            //         className="form-control"
            //         placeholder="Enter location"
            //         value={location}
            //         onChange={(e) => setLocation(e.target.value)}
            //         required
            //       />
            //     </div>
            //     <div className="mb-3">
            //       <label className="form-label">Date Needed</label>
            //       <input type="date" className="form-control" value={dateNeeded} onChange={(e) => setDateNeeded(e.target.value)} required />
            //     </div>
            //     <button type="submit" className="btn-primary" style={{ width: "20%", padding: "10px", borderRadius: "10px" }}>
            //       Submit Request
            //     </button>
            //   </form>

            //   {/* Toast Container */}
            //   <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover />
            // </div>



            <div>
              <h3>Water Request Form</h3>
              <p>You can only submit one water request per day.</p>
              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Purpose</label>
                  <select className="form-select" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
                    <option value="Drinking">Drinking</option>
                    <option value="Irrigation">Irrigation</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>

                <div className="mb-3">
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

                <div className="mb-3">
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

                <div className="mb-3">
                  <label className="form-label">Date Needed</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dateNeeded}
                    onChange={(e) => setDateNeeded(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: "20%", padding: "10px", borderRadius: "10px" }}
                  disabled={hasRequestedToday}
                >
                  {hasRequestedToday ? "Already Submitted" : "Submit Request"}
                </button>
              </form>

              <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover />
            </div>
          )}


          {/* My Water Request */}
          {activeTab === "myWaterRequest" && (
            <div>
              <h3>My Water Request Summary</h3>
              <div className="table-responsive mt-3">
                <table className="table table-bordered table-striped align-middle">
                  <thead className="table-primary">
                    <tr className="text-center">
                      <th>#</th>
                      <th>Purpose</th>
                      <th>Amount (L)</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(myRequests) && myRequests.map((req, i) => (
                      <tr key={i} className="text-center">
                        <td>{i + 1}</td>
                        <td>{req.purpose}</td>
                        <td>{req.amount}</td>
                        <td>{req.dateNeeded}</td>
                        <td>{req.status || "Pending"}</td>
                        <td>
                          <button className="btn-sm btn-info p-2" style={{ borderRadius: "10px", width: "30%" }} onClick={() => { setSelectedRequest(req); setShowModal(true); }}>
                            <i className="bi bi-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>


              {/* View Popup Model */}

              {showModal && selectedRequest && (
                <div
                  className="modal show fade d-block"
                  tabIndex="-1"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content shadow-lg rounded-3">
                      <div className="modal-header">
                        <h5 className="modal-title">Water Request Details</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setShowModal(false)}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p><strong>Purpose:</strong> {selectedRequest.purpose}</p>
                        <p><strong>Amount:</strong> {selectedRequest.amount} Liters</p>
                        <p><strong>Date Needed:</strong> {selectedRequest.dateNeeded}</p>
                        <p><strong>Status:</strong> {selectedRequest.status || 'Pending'}</p>
                        <p><strong>Location:</strong> {selectedRequest.location || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}


            </div>
          )}


          {/* Report */}
          {activeTab === "report" && (
            <div>
              <h3>Report Water Issue</h3>
              <form className="mt-4" onSubmit={handleReportSubmit}>
                <div className="mb-3">
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
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    placeholder="Enter location"
                    onChange={handleReportChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date of Issue</label>
                  <input type="date" className="form-control" name="dateOfIssue" value={report.dateOfIssue} onChange={handleReportChange} required />
                </div>
                <div className="mb-3">
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
                <button type="submit" className="btn-primary" style={{ width: "20%", padding: "10px", borderRadius: "10px" }}>
                  Submit Report
                </button>
              </form>
            </div>
          )}

          {/* My Reports */}
          {activeTab === "myreports" && (
            <div>
              <h3>My Reports</h3>
              <div className="table-responsive mt-3">
                <table className="table table-bordered table-striped align-middle">
                  <thead className="table-primary">
                    <tr>
                      <th>Date</th>
                      <th>Issue Type</th>
                      <th>Description</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((rep, i) => (
                      <tr key={i}>
                        <td>{new Date(rep.dateOfIssue).toLocaleDateString()}</td>
                        <td>{rep.type}</td>
                        <td>{rep.description}</td>
                        <td className="text-center">
                          <button className="btn-sm btn-info me-2 p-2" style={{ borderRadius: "10px", width: "30%" }} onClick={() => { setSelectedReport(rep); setShowReportModal(true); }}>
                            <i className="bi bi-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {reports.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center text-muted">
                          No reports submitted yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* View Reports Popup */}
              {showReportModal && selectedReport && (
                <div
                  className="modal show fade d-block"
                  tabIndex="-1"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content shadow-lg rounded-3">
                      <div className="modal-header">
                        <h5 className="modal-title">Report Details</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setShowReportModal(false)}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p><strong>Report Type:</strong> {selectedReport.type}</p>
                        <p><strong>Location:</strong> {selectedReport.location || 'N/A'}</p>
                        <p><strong>Date of Issue:</strong> {new Date(selectedReport.dateOfIssue).toLocaleDateString()}</p>
                        <p><strong>Description:</strong> {selectedReport.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}


            </div>
          )}
        </div>

        {/* Internal CSS */}
        <style>{`
        .sidebar {
          min-height: 100vh;
        }

        .intro-text {
          background-color : #ffffff;
          color : black;
          border-radius : 10px;
          padding : 50px;
        }

        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
            height: 100%;
            width: 250px;
            transition: all 0.3s ease-in-out;
            text-align : justify;
          }

        }

          @media (max-width: 576px) {
    .navbar .btn-outline-danger {
      width: 100%;
    }
    .navbar .fw-semibold {
      font-size: 1rem;
    }
  }
        
      `}</style>
      </div>
    </>
  );
};

export default UserDashboard;