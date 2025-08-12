import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SupplierDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [requests, setRequests] = useState([]);
    const [users, setUsers] = useState([]);
    const [reports, setReports] = useState([]);

    const [supplierInfo, setSupplierInfo] = useState(null);

    // Request Filter Section
    const [searchLocation, setSearchLocation] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterDate, setFilterDate] = useState("");


    const handleClearFilters = () => {
        setSearchLocation("");
        setFilterStatus("");
        setFilterDate("");
    };

    const filteredRequests = requests.filter((req) => {
        const matchesLocation = searchLocation
            ? req.location?.toLowerCase().includes(searchLocation.toLowerCase())
            : true;
        const matchesStatus = filterStatus ? req.status === filterStatus : true;
        const matchesDate = filterDate
            ? req.dateNeeded?.split("T")[0] === filterDate
            : true;
        return matchesLocation && matchesStatus && matchesDate;
    });

    // User Filter Section
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("");

    const handleClearUserFilters = () => {
        setSearchTerm("");
        setFilterRole("");
    };

    const filteredUsers = Array.isArray(users)
        ? users.filter((user) => {
            const matchesSearch =
                searchTerm === "" ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.location?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = filterRole === "" || user.role === filterRole;
            return matchesSearch && matchesRole;
        })
        : [];


    // Report Filter Section
    const [reportSearchTerm, setReportSearchTerm] = useState("");
    const [reportDateFilter, setReportDateFilter] = useState("");

    const handleClearReportFilters = () => {
        setReportSearchTerm("");
        setReportDateFilter("");
    };

    const filteredReports = Array.isArray(reports)
        ? reports.filter((rep) => {
            const matchesSearch =
                reportSearchTerm === "" ||
                rep.location?.toLowerCase().includes(reportSearchTerm.toLowerCase()) ||
                rep.type?.toLowerCase().includes(reportSearchTerm.toLowerCase());
            const matchesDate =
                reportDateFilter === "" ||
                rep.dateOfIssue?.split("T")[0] === reportDateFilter;
            return matchesSearch && matchesDate;
        })
        : [];




    useEffect(() => {
        const fetchSupplierInfo = async () => {
            try {
                const token = localStorage.getItem("auth_token");

                const res = await axios.get("http://localhost:5000/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setSupplierInfo(res.data);
            } catch (err) {
                console.error("Failed to fetch supplier info", err);
            }
        };

        fetchSupplierInfo();
    }, []);


    // Logout
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    };


    // View / Edit Reports
    const [viewRequest, setViewRequest] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);

    // Fetch Data
    useEffect(() => {
        const token = localStorage.getItem("auth_token");

        if (activeTab === "requests") {
            axios.get("http://localhost:5000/api/requests/supplier/requests", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => setRequests(res.data))
                .catch(err => console.error("Failed to fetch requests", err));
        }

        if (activeTab === "users") {
            axios.get("http://localhost:5000/api/users", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((res) => setUsers(res.data))
                .catch((err) => console.error("Failed to fetch users", err));
        }

        if (activeTab === "reports") {
            axios.get("http://localhost:5000/api/reports", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((res) => setReports(res.data))
                .catch((err) => console.error("Failed to fetch reports", err));
        }
    }, [activeTab]);


    // Delete Request
    const handleDeleteRequest = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this request?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("auth_token");

            await axios.delete(`http://localhost:5000/api/requests/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Refresh request list
            setRequests((prev) => prev.filter((r) => r._id !== id));
            alert("Request deleted successfully!");
        } catch (err) {
            console.error("Delete failed:", err.response?.data || err.message);
            alert("Failed to delete request.");
        }
    };

    // update Requests
    const handleUpdateRequest = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("auth_token");

            const res = await axios.put(
                `http://localhost:5000/api/requests/${viewRequest._id}`,
                viewRequest,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            toast.success("Request updated successfully!");
            setShowViewModal(false);

            // Refresh requests table
            setRequests((prev) =>
                prev.map((r) => (r._id === viewRequest._id ? res.data : r))
            );
        } catch (err) {
            console.error("Update error:", err.response?.data || err.message);
            toast.error(
                err.response?.data?.message || "Failed to update request. Please try again."
            );
        }
    };



    const [currentPage, setCurrentPage] = useState(1);
    const [requestsPerPage] = useState(5);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

    // Get current page items
    const currentRequests = filteredRequests.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );



    const [currentUserPage, setCurrentUserPage] = useState(1);
    const usersPerPage = 10; // You can adjust this to 10 or more

    // Get current users for this page
    const indexOfLastUser = currentUserPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalUserPages = Math.ceil(filteredUsers.length / usersPerPage);

    useEffect(() => {
        setCurrentUserPage(1);
    }, [searchTerm, filterRole]);


    const [currentReportPage, setCurrentReportPage] = useState(1);
    const reportsPerPage = 10; // You can change this to 10 or more

    const indexOfLastReport = currentReportPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
    const totalReportPages = Math.ceil(filteredReports.length / reportsPerPage);

    useEffect(() => {
        setCurrentReportPage(1);
    }, [reportSearchTerm, reportDateFilter]);



    // report model

    // State to manage view modal
    const [showReportModal, setShowReportModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);



    // forward Message

    const [showForwardModal, setShowForwardModal] = useState(false);
    const [forwardMessage, setForwardMessage] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [supplierEmail, setSupplierEmail] = useState('');


    // const handleForwardEmail = async (e) => {
    //   e.preventDefault();

    //   const token = localStorage.getItem("auth_token");

    //   const emailData = {
    //     to: supplierEmail,
    //     subject: "Forwarded Water Request from JalaSpeedy",
    //     message: `
    //       Dear Supplier,

    //       A new water request has been forwarded to you with the following details:

    //       User ID: ${forwardRequest.user}
    //       Purpose: ${forwardRequest.purpose}
    //       Amount: ${forwardRequest.amount} Liters
    //       Location: ${forwardRequest.location}
    //       Date Needed: ${forwardRequest.dateNeeded.split("T")[0]}
    //       Status: ${forwardRequest.status}

    //       Message from Admin/Sender:
    //       ${forwardMessage}

    //       Please respond to this request accordingly.

    //       Best regards,
    //       JalaSpeedy Team
    //     `,
    //   };

    //   try {
    //     await axios.post("http://localhost:5000/api/utils/send-email", emailData, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });

    //     alert("Email sent successfully!");
    //     setShowForwardModal(false);
    //     setSupplierEmail("");
    //     setForwardMessage("");
    //   } catch (error) {
    //     console.error("Failed to send email", error);
    //     alert("Failed to send email.");
    //   }
    // };


    // const handleForward = async (e) => {
    //   e.preventDefault();

    //   const token = localStorage.getItem("auth_token");

    //   try {
    //     const response = await axios.post(
    //       "http://localhost:5000/api/requests/forward",
    //       {
    //         supplierEmail,
    //         adminEmail: "mohanapriyanpriyan4@gmail.com",
    //         message: forwardMessage,
    //         requestData: selectedRequest,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );

    //     alert("Request forwarded successfully.");
    //     setShowForwardModal(false);
    //     setForwardMessage("");
    //   } catch (error) {
    //     console.error("Failed to forward request:", error);
    //     alert("Failed to send the email.");
    //   }
    // };


    // const handleForward = async (e) => {
    //   e.preventDefault();
    //   const token = localStorage.getItem("auth_token");

    //   try {
    //     const response = await axios.post(
    //       "http://localhost:5000/api/requests/forward",
    //       {
    //         supplierEmail,
    //         adminEmail: "mohanapriyanpriyan4@gmail.com",
    //         message: forwardMessage,
    //         requestData: {
    //           user: selectedRequest.user,
    //           purpose: selectedRequest.purpose,
    //           amount: selectedRequest.amount,
    //           location: selectedRequest.location,
    //           dateNeeded: selectedRequest.dateNeeded,
    //           status: selectedRequest.status,
    //         },
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );

    //     alert("Request forwarded successfully.");
    //     setShowForwardModal(false);
    //     setForwardMessage("");
    //   } catch (error) {
    //     console.error("Failed to forward request:", error);
    //     alert("Failed to send the email.");
    //   }
    // };

    const handleForward = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("auth_token");

        try {
            await axios.post(
                "http://localhost:5000/api/requests/forward",
                {
                    adminEmail: "mohanapriyanpriyan4@gmail.com",
                    message: forwardMessage,
                    requestData: {
                        userId: selectedRequest.user?._id || selectedRequest.user,
                        purpose: selectedRequest.purpose,
                        amount: selectedRequest.amount,
                        location: selectedRequest.location,
                        dateNeeded: selectedRequest.dateNeeded,
                        status: selectedRequest.status,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Water request forwarded to admin successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });

            setShowForwardModal(false);
            setForwardMessage("");
        } catch (error) {
            console.error("Failed to forward request:", error);

            toast.error("Failed to send email to admin.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
    };



    return (
        <div className="d-flex min-vh-100">
            {/* Sidebar */}
            <div className={`sidebar text-white p-3 ${sidebarOpen ? "d-block" : "d-none d-md-block"}`} style={{ width: "250px" }}>
                <h4 className="mb-4 text-center  fw-bold mt-3 mb-5"><span>Jala</span><span>Speedy</span></h4>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <button className={`btn w-100 text-center ${activeTab === "dashboard" ? "btn-light" : "btn-outline-light"}`} onClick={() => setActiveTab("dashboard")}>Dashboard</button>
                    </li>
                    <li className="nav-item mb-2">
                        <button className={`btn w-100 text-center ${activeTab === "requests" ? "btn-light" : "btn-outline-light"}`} onClick={() => setActiveTab("requests")}>Requests</button>
                    </li>
                    <li className="nav-item mb-2">
                        <button className={`btn w-100 text-center ${activeTab === "users" ? "btn-light" : "btn-outline-light"}`} onClick={() => setActiveTab("users")}>Users</button>
                    </li>
                    <li className="nav-item mb-5">
                        <button className={`btn w-100 text-center ${activeTab === "reports" ? "btn-light" : "btn-outline-light"}`} onClick={() => setActiveTab("reports")}>Reports</button>
                    </li>
                </ul>

                {/* Close Button for Mobile */}
                <div className="d-md-none mt-3">
                    <button className="btn-outline-none p-2 w-100 p-2 logout d-block" style={{ backgroundColor: "#000428", color: "white", borderRadius: "10px" }} onClick={() => setSidebarOpen(false)}>
                        <i className="bi bi-x-lg me-2"></i>
                    </button>
                </div>

            </div>

            {/* Main Content */}
            <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f6f6f6" }}>
                {/* Mobile Menu Toggle */}
                <div className="navbar navbar-expand-lg bg-white shadow-sm rounded px-3 px-md-4 py-2 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-center">

                    {/* Top row: Logo and toggle button */}
                    <div className="d-flex justify-content-between align-items-center w-100 mb-2 mb-md-0">
                        {/* Logo */}
                        <div className="fw-bold fs-4 text-primary d-flex align-items-center">
                            JalaSpeedy
                        </div>

                        {/* Sidebar toggle (mobile only) */}
                        <div className="d-md-none">
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <i className="bi bi-list"></i>
                            </button>
                        </div>
                    </div>

                    {/* Profile & Logout section */}
                    <div className="d-flex align-items-center gap-3 flex-column flex-sm-row">
                        {/* View-only profile info */}
                        <div className="d-flex align-items-center" style={{ cursor: "default" }}>
                            <i className="bi bi-person-circle fs-4 me-2 text-secondary"></i>
                            <span className="fw-semibold">
                                {supplierInfo?.username || "Supplier"}
                            </span>
                        </div>

                        {/* Logout Button */}
                        <button
                            className="btn-logout btn-sm p-2"
                            style={{ backgroundColor: "#000428", color: "white", borderRadius: "10px" }}
                            onClick={handleLogout}
                        >
                            <i className="bi bi-box-arrow-right me-1"></i>
                        </button>
                    </div>
                </div>

                {/* Dashboard Tab */}
                {activeTab === "dashboard" && (
                    <div className="intro-text">
                        <h2>Welcome to JalaSpeedy Supplier Dashboard</h2>

                        <p className="fw-bold">Your central hub for managing water requests, user data, and monitoring submitted reports.</p>
                        <p className="">
                            Manage incoming water requests, monitor user activity, and review submitted reports. Keep the water flowing!
                        </p>

                        <br />

                        <hr />

                        <br />

                        <p className="">
                            🚚 As a supplier, you play a crucial role in ensuring water delivery is fast, efficient, and accurate. Welcome to your Supplier Dashboard, where you can manage requests, review user data, and handle submitted reports with ease.
                        </p>

                        <p>
                            📊 The <strong>Requests</strong> tab allows you to track all active water requests that need your attention. Easily see the purpose, amount, and location of each request.
                        </p>

                        <p>
                            👥 In the <strong>Users</strong> section, you can review all registered users, keeping track of their details and ensuring smooth interactions with your service.
                        </p>

                        <p>
                            🛠️ The <strong>Reports</strong> tab lets you view all the reports users have submitted regarding any water-related issues. These reports help us maintain high standards for water safety and delivery.
                        </p>

                        <p className="fst-italic fw-bold">
                            Every drop counts, and with your active participation, we can make sure that no one is left without clean and safe water!
                        </p>

                    </div>
                )}

                {/* Requests Tab */}
                {activeTab === "requests" && (
                    <div>
                        <h3>Water Requests</h3>

                        {/* Filters Section */}
                        <div className="row g-3 align-items-center mb-4">
                            <div className="col-md-3">
                                <input
                                    type="text"
                                    className="form-control p-2"
                                    placeholder="Search by Location"
                                    value={searchLocation}
                                    onChange={(e) => setSearchLocation(e.target.value)}
                                />
                            </div>
                            <div className="col-md-3">
                                <select
                                    className="form-select p-2"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="">Filter by Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="date"
                                    className="form-control p-2"
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                />
                            </div>
                            <div className="col-md-3">
                                <button className="p-2 w-100"
                                    style={{ backgroundColor: "#000428", color: "white", borderRadius: "10px" }}
                                    onClick={handleClearFilters}>
                                    Clear Filters
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="table-responsive mt-3">
                            <table className="table table-bordered table-striped align-middle">
                                <thead className="table-primary">
                                    <tr className="text-center">
                                        <th>No</th>
                                        <th>User ID</th>
                                        <th>Purpose</th>
                                        <th>Amount (L)</th>
                                        <th>Location</th>
                                        <th>Date Needed</th>
                                        <th>Status</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRequests.length > 0 ? (
                                        currentRequests.map((req, i) => (
                                            <tr key={req._id || i} className="text-center">
                                                <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                                                <td>{req._id || "N/A"}</td>
                                                <td>{req.purpose || "N/A"}</td>
                                                <td>{req.amount || "N/A"}</td>
                                                <td>{req.location || "N/A"}</td>
                                                <td>{req.dateNeeded ? req.dateNeeded.split("T")[0] : "N/A"}</td>
                                                <td>
                                                    <span
                                                        className={`badge bg-${req.status === "Delivered"
                                                            ? "success"
                                                            : req.status === "Rejected"
                                                                ? "danger"
                                                                : req.status === "Approved"
                                                                    ? "info"
                                                                    : "warning"
                                                            } text-dark`}
                                                    >
                                                        {req.status || "Pending"}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        className="btn-sm btn-info me-2"
                                                        title="View"
                                                        onClick={() => {
                                                            setViewRequest(req);
                                                            setShowViewModal(true);
                                                        }}
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </button>
                                                    <button
                                                        className="btn-sm btn-warning"
                                                        title="Edit"
                                                        onClick={() => {
                                                            setViewRequest(req);
                                                            setShowViewModal(true);
                                                        }}
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </button>

                                                    {/* forward button */}
                                                    <button
                                                        className="btn-sm btn-dark ms-2"
                                                        title="Forward to Admin"
                                                        onClick={() => {
                                                            setSelectedRequest(req);
                                                            setShowForwardModal(true);
                                                        }}
                                                    >
                                                        <i className="bi bi-send"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center text-muted">
                                                No water requests match the current filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>

                            {totalPages > 1 && (
                                <div className="d-flex justify-content-center mt-3">
                                    <nav>
                                        <ul className="pagination">
                                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={() => setCurrentPage(currentPage - 1)}
                                                >
                                                    Previous
                                                </button>
                                            </li>

                                            {Array.from({ length: totalPages }, (_, idx) => (
                                                <li
                                                    key={idx}
                                                    className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}
                                                >
                                                    <button
                                                        className="page-link"
                                                        onClick={() => setCurrentPage(idx + 1)}
                                                    >
                                                        {idx + 1}
                                                    </button>
                                                </li>
                                            ))}

                                            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={() => setCurrentPage(currentPage + 1)}
                                                >
                                                    Next
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            )}


                        </div>

                        {/* View Modal */}

                        {showViewModal && viewRequest && (
                            <div
                                className="modal show fade d-block"
                                tabIndex="-1"
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                            >
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content shadow-lg rounded-3">
                                        <div className="modal-header">
                                            <h5 className="modal-title">View & Edit Water Request</h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={() => setShowViewModal(false)}
                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={handleUpdateRequest}>
                                                <div className="mb-3">
                                                    <label className="form-label">Purpose</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={viewRequest.purpose}
                                                        onChange={(e) =>
                                                            setViewRequest({ ...viewRequest, purpose: e.target.value })
                                                        }
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Amount (Liters)</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={viewRequest.amount}
                                                        onChange={(e) =>
                                                            setViewRequest({ ...viewRequest, amount: e.target.value })
                                                        }
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Location</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={viewRequest.location}
                                                        onChange={(e) =>
                                                            setViewRequest({ ...viewRequest, location: e.target.value })
                                                        }
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Date Needed</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={viewRequest.dateNeeded?.split("T")[0] || ""}
                                                        onChange={(e) =>
                                                            setViewRequest({ ...viewRequest, dateNeeded: e.target.value })
                                                        }
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Status</label>
                                                    <select
                                                        className="form-select"
                                                        value={viewRequest.status || "Pending"}
                                                        onChange={(e) =>
                                                            setViewRequest({ ...viewRequest, status: e.target.value })
                                                        }
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Approved">Approved</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Rejected">Rejected</option>
                                                        {/* <option value="Cancelled">Cancelled</option> */}
                                                    </select>
                                                </div>

                                                <button type="submit" className="btn w-100" style={{ backgroundColor: "#000", color: "#fff", "button:hover": { backgroundColor: "#fff" } }}>
                                                    Save Changes
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}


                        {/* Forward Message Model */}

                        {/* {showForwardModal && forwardRequest && (
  <div
    className="modal show fade d-block"
    tabIndex="-1"
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
  >
    <div className="modal-dialog">
      <div className="modal-content shadow">
        <div className="modal-header">
          <h5 className="modal-title">Forward Water Request</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowForwardModal(false)}
          ></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleForwardEmail}>
            <div className="mb-3">
              <label className="form-label">Supplier Email</label>
              <input
                type="email"
                className="form-control"
                value={supplierEmail}
                onChange={(e) => setSupplierEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                rows="4"
                value={forwardMessage}
                onChange={(e) => setForwardMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowForwardModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)} */}


                        {showForwardModal && selectedRequest && (
                            <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Forward Request to Admin</h5>
                                            <button type="button" className="btn-close" onClick={() => setShowForwardModal(false)}></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={handleForward}>
                                                <div className="mb-3">
                                                    <label>Email (Admin)</label>
                                                    <input type="email" className="form-control" value="mohanapriyanpriyan4@gmail.com" disabled />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Your Message</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows="4"
                                                        required
                                                        placeholder="Why are you forwarding this request?"
                                                        value={forwardMessage}
                                                        onChange={(e) => setForwardMessage(e.target.value)}
                                                    ></textarea>
                                                </div>
                                                <div className="d-flex justify-content-end gap-2">
                                                    <button type="submit" className="btn btn-primary">Send</button>
                                                    <button type="button" className="btn btn-secondary" onClick={() => setShowForwardModal(false)}>Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                )}

                {/* Users Tab */}
                {activeTab === "users" && (
                    <div>
                        <h3>All Registered Users</h3>


                        {/* Filter Section */}
                        <div className="row g-3 align-items-center mb-4">
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control p-2"
                                    placeholder="Search by Email"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <select
                                    className="form-select p-2"
                                    value={filterRole}
                                    onChange={(e) => setFilterRole(e.target.value)}
                                >
                                    <option value="">Filter by Role</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="supplier">Supplier</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <button
                                    className="p-2 w-100"
                                    style={{ backgroundColor: "#000428", color: "white", borderRadius: "10px" }}
                                    onClick={handleClearUserFilters}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="table-responsive mt-3">
                            <table className="table table-bordered table-striped">
                                <thead className="table-primary">
                                    <tr className="text-center">
                                        <th>No</th>
                                        <th>User ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.length > 0 ? (
                                        currentUsers.map((user, index) => (
                                            <tr key={user._id} className="text-center">
                                                <td>{indexOfFirstUser + index + 1}</td>
                                                <td>{user._id}</td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role || "N/A"}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center text-muted">
                                                {Array.isArray(users)
                                                    ? "No users match current filters."
                                                    : "Failed to load user data."}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {totalUserPages > 1 && (
                                <div className="d-flex justify-content-center mt-3">
                                    <nav>
                                        <ul className="pagination">
                                            <li className={`page-item ${currentUserPage === 1 ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={() => setCurrentUserPage(currentUserPage - 1)}>
                                                    Previous
                                                </button>
                                            </li>

                                            {Array.from({ length: totalUserPages }, (_, idx) => (
                                                <li
                                                    key={idx}
                                                    className={`page-item ${currentUserPage === idx + 1 ? 'active' : ''}`}
                                                >
                                                    <button className="page-link" onClick={() => setCurrentUserPage(idx + 1)}>
                                                        {idx + 1}
                                                    </button>
                                                </li>
                                            ))}

                                            <li className={`page-item ${currentUserPage === totalUserPages ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={() => setCurrentUserPage(currentUserPage + 1)}>
                                                    Next
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            )}


                        </div>
                    </div>
                )}

                {/* Reports Tab */}
                {activeTab === "reports" && (
                    <div>
                        <h3>Users Reports</h3>

                        {/* Report Filter Section */}
                        <div className="row g-3 align-items-center mb-4">
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control p-2"
                                    placeholder="Search by Location or Report Type"
                                    value={reportSearchTerm}
                                    onChange={(e) => setReportSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="date"
                                    className="form-control p-2"
                                    value={reportDateFilter}
                                    onChange={(e) => setReportDateFilter(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <button
                                    className="p-2 w-100"
                                    style={{ backgroundColor: "#000428", color: "white", borderRadius: "10px" }}
                                    onClick={handleClearReportFilters}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="table-responsive mt-3">
                            <table className="table table-bordered table-striped">
                                <thead className="table-primary">
                                    <tr className="text-center">
                                        <th>No</th>
                                        <th>User ID</th>
                                        <th>Report Type</th>
                                        <th>Location</th>
                                        <th>Date of Issue</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReports.length > 0 ? (
                                        currentReports.map((rep, i) => (
                                            <tr key={rep._id || i} className="text-center">
                                                <td>{indexOfFirstReport + i + 1}</td>
                                                <td>{rep.user?._id || rep.user || "N/A"}</td>
                                                <td>{rep.type}</td>
                                                <td>{rep.location}</td>
                                                <td>{rep.dateOfIssue?.split("T")[0]}</td>
                                                <td>{rep.description}</td>
                                                <td>
                                                    <button
                                                        className="btn-sm btn-info"
                                                        title="View"
                                                        onClick={() => {
                                                            setSelectedReport(rep);
                                                            setShowReportModal(true);
                                                        }}
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center text-muted">
                                                {Array.isArray(reports)
                                                    ? "No reports match the current filters."
                                                    : "Unable to load reports."}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {totalReportPages > 1 && (
                                <div className="d-flex justify-content-center mt-3">
                                    <nav>
                                        <ul className="pagination">
                                            <li className={`page-item ${currentReportPage === 1 ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={() => setCurrentReportPage(currentReportPage - 1)}>
                                                    Previous
                                                </button>
                                            </li>

                                            {Array.from({ length: totalReportPages }, (_, idx) => (
                                                <li
                                                    key={idx}
                                                    className={`page-item ${currentReportPage === idx + 1 ? 'active' : ''}`}
                                                >
                                                    <button className="page-link" onClick={() => setCurrentReportPage(idx + 1)}>
                                                        {idx + 1}
                                                    </button>
                                                </li>
                                            ))}

                                            <li className={`page-item ${currentReportPage === totalReportPages ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={() => setCurrentReportPage(currentReportPage + 1)}>
                                                    Next
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            )}


                            {/* View Report Modal */}
                            {showReportModal && selectedReport && (
                                <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content shadow-lg rounded-3">
                                            <div className="modal-header">
                                                <h5 className="modal-title">View Report Details</h5>
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    onClick={() => setShowReportModal(false)}
                                                ></button>
                                            </div>
                                            <div className="modal-body">
                                                <p><strong>User ID:</strong> {selectedReport.user?._id}</p>
                                                <p><strong>Report Type:</strong> {selectedReport.type}</p>
                                                <p><strong>Location:</strong> {selectedReport.location}</p>
                                                <p><strong>Date of Issue:</strong> {selectedReport.dateOfIssue?.split("T")[0]}</p>
                                                <p><strong>Description:</strong> {selectedReport.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>
                )}

            </div>

            {/* Internal CSS */}
            <style>{`

        .intro-text {
            background-color : #ffffff;
            color : black;
            border-radius : 10px;
            padding : 50px;
        }

        .sidebar {
            background: linear-gradient(to bottom,rgb(96, 112, 131),rgb(0, 0, 0));
            min-height: 100vh;
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
            }

            .intro-text {
                text-align : center;
            }

            .intro-text p{
                text-align : justify;
            }
        }

        @media (max-width: 576px) {
            
            .intro-text {
                text-align : center;
            }

            .intro-text p{
                text-align : justify;
            }
        
        }

      `}</style>

        </div>


    );
};

export default SupplierDashboard;