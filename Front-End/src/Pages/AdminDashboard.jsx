import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterModal from "./Register";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/axios"; // adjust path if needed


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const [users, setUsers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [reports, setReports] = useState([]);

  const [searchUser, setSearchUser] = useState("");
  const [searchSupplier, setSearchSupplier] = useState("");
  const [searchWaterRequest, setSearchWaterRequest] = useState("");
  const [searchReport, setSearchReport] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");


  const [showViewModal, setShowViewModal] = useState(false);

  // User Management
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Supplier Management
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showSupplierViewModal, setShowSupplierViewModal] = useState(false);
  const [showSupplierEditModal, setShowSupplierEditModal] = useState(false);
  const [showSupplierDeleteModal, setShowSupplierDeleteModal] = useState(false);
  const [selectedSupplierIdToDelete, setSelectedSupplierIdToDelete] = useState(null);

  // Request Management
  const [showRequestEdit, setShowRequestEdit] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showViewRequestModal, setShowViewRequestModal] = useState(false);
  const [showEditRequestModal, setShowEditRequestModal] = useState(false);

  // Report Management
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportView, setShowReportView] = useState(false);
  const [viewReport, setViewReport] = useState(null);
  const [editReport, setEditReport] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReportDeleteModal, setShowReportDeleteModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);


  // Payment Management
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentView, setShowPaymentView] = useState(false);
  const [showPaymentEdit, setShowPaymentEdit] = useState(false);

  const [searchPayment, setSearchPayment] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");



  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalRequests: 0,
    totalReports: 0,
    pendingRequests: 0,
    totalDeliveredLiters: 0,
  });

  const fetchDashboardStats = async () => {
    try {
      const res = await axiosInstance.get("/admin/dashboard-stats");
      setDashboardStats(res.data);
    } catch (err) {
      console.error("Dashboard stats fetch error:", err);
    }
  };


  useEffect(() => {
    fetchDashboardStats();
  }, []);



  // Authentication
  const token = localStorage.getItem("auth_token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const navigate = useNavigate();

  // logout
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  // Slidebar Toggle
  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (activeTab === "userManagement") {
      axios.get("/api/users", config).then((res) => setUsers(res.data)).catch(console.error);
    }

    if (activeTab === "supplierManagement") {
      axios.get("/api/suppliers", config).then((res) => setSuppliers(res.data)).catch(console.error);
    }

    if (activeTab === "paymentManagement") {
      axios.get("/subscriptions/admin/all").then((res) => setPayments(res.data)).catch(console.error);
    }

    if (activeTab === "waterRequest") {
      axios.get("/api/requests", config).then((res) => setRequests(res.data)).catch(console.error);
    }

    if (activeTab === "reportManagement") {
      axios.get("/api/reports", config).then((res) => setReports(res.data)).catch(console.error);
    }
  }, [activeTab]);


  // User Management

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users", config);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  // Delete User
  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    const token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`/api/users/${userId}`, config);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete user");
    }
  };

  // Edit User
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.put(`/api/users/${selectedUser._id}`, selectedUser, config);
      toast.success("User updated successfully");
      setShowEditModal(false);
      fetchUsers();
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update user");
    }
  };

  // Handle Delete Click
  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  // Confirm Delete User
  const confirmDeleteUser = async () => {
    const token = localStorage.getItem('auth_token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`/api/users/${userToDelete}`, config);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (err) {
      console.error('Delete failed', err);
      toast.error('Failed to delete user');
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };



  // Supplier Management

  // Fetch Suppliers
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (activeTab === "supplierManagement") {
      axios.get("/api/users", config)
        .then((res) => {
          const supplierUsers = res.data.filter(user => user.role === "supplier");
          setSuppliers(supplierUsers);
        })
        .catch((err) => console.error("Failed to fetch suppliers", err));
    }
  }, [activeTab]);

  // Delete Supplier
  const handleSupplierDeleteConfirm = async () => {
    if (!selectedSupplierIdToDelete) return;

    const token = localStorage.getItem("auth_token");

    try {
      await axios.delete(`/api/users/${selectedSupplierIdToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Supplier deleted successfully");

      // Remove from UI
      setSuppliers((prev) =>
        prev.filter((s) => s._id !== selectedSupplierIdToDelete)
      );
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete supplier");
    } finally {
      setShowSupplierDeleteModal(false);
      setSelectedSupplierIdToDelete(null);
    }
  };

  // Edit Supplier
  const handleSupplierEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("auth_token");

      // Update supplier
      await axios.put(`/api/users/${selectedSupplier._id}`, selectedSupplier, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Supplier updated successfully");
      setShowSupplierEditModal(false);

      // Refresh supplier list
      const res = await axios.get("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const supplierUsers = res.data.filter(user => user.role === "supplier");
      setSuppliers(supplierUsers);

    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update supplier");
    }
  };




  // Payment Management

  useEffect(() => {
    if (activeTab === "paymentManagement") {
      fetchPayments();
    }
  }, [activeTab]);

  // Fetch All Payments
  const fetchPayments = async () => {
    try {
      const res = await axiosInstance.get("/subscriptions/admin/all");
      setPayments(res.data);
    } catch (err) {
      console.error("Failed to fetch payments:", err);
    }
  };

  // Delete Payment
  const handleDeletePayment = async (id) => {
    try {
      await axiosInstance.delete(`/subscriptions/${id}`);
      setPayments((prev) => prev.filter((p) => p._id !== id));
      toast.success("Payment deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete payment");
    }
  };



  // Water Request Management

  // Fetch Requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get("/api/requests", config);
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch requests", err);
    }
  };

  // Delete Request
  const handleDeleteRequest = async (id) => {
    if (!window.confirm("Delete this request?")) return;
    try {
      await axios.delete(`/api/requests/${id}`, config);
      alert("Request deleted successfully");
      fetchRequests();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete request");
    }
  };

  // Update Request
  const handleRequestUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("auth_token");
      const { _id, purpose, amount, location, dateNeeded, status } = selectedRequest;

      const res = await axios.put(
        `/api/requests/${_id}`,
        { purpose, amount, location, dateNeeded, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Request updated successfully');
      setShowRequestEdit(false);
      fetchRequests(); // re-fetch after update
    } catch (err) {
      console.error("Failed to update request:", err);
      toast.error("Update failed");
    }
  };



  // Report Management

  // Fetch Reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const res = await axios.get("http://localhost:5000/api/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(res.data);
      } catch (err) {
        console.error("Failed to fetch reports", err);
      }
    };

    if (activeTab === "reportManagement") {
      fetchReports();
    }
  }, [activeTab]);

  // Report Delete
  const handleConfirmReportDelete = async () => {
    if (!reportToDelete) return;

    const token = localStorage.getItem("auth_token");

    try {
      await axios.delete(`http://localhost:5000/api/reports/${reportToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReports((prev) => prev.filter((r) => r._id !== reportToDelete));
      toast.success("Report deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete report");
    } finally {
      setShowReportDeleteModal(false);
      setReportToDelete(null);
    }
  };

  // Update Report
  const handleUpdateReport = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");

    try {
      const res = await axios.put(
        `http://localhost:5000/api/reports/${editReport._id}`,
        editReport,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setReports((prev) =>
        prev.map((r) => (r._id === editReport._id ? res.data.report : r))
      );
      setShowEditModal(false);
      toast.success("Report updated successfully.");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update report.");
    }
  };


  // Fetch Admin Info
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      axios.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          setAdminName(res.data.username || "Admin");
        })
        .catch(err => {
          console.error("Failed to fetch admin info", err);
          setAdminName("Admin");
        });
    }
  }, []);



  {/* Pagination for Users */ }

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const filteredUsers = Array.isArray(users)
    ? users.filter(
      (user) =>
        user.role === "user" &&
        (user.username.toLowerCase().includes(searchUser.toLowerCase()) ||
          user.email.toLowerCase().includes(searchUser.toLowerCase()))
    )
    : [];

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  {/*Pagination for Reports*/ }

  const [currentReportPage, setCurrentReportPage] = useState(1);
  const reportsPerPage = 10;

  // Filter and paginate reports
  const filteredReports = Array.isArray(reports)
    ? reports.filter((report) =>
      (report.type?.toLowerCase() || "").includes(searchReport.toLowerCase()) ||
      (report.description?.toLowerCase() || "").includes(searchReport.toLowerCase()) ||
      (report.role?.toLowerCase() || "").includes(searchReport.toLowerCase()) ||
      (report.dateOfIssue?.toLowerCase() || "").includes(searchReport.toLowerCase())
    )
    : [];

  const indexOfLastReport = currentReportPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalReportPages = Math.ceil(filteredReports.length / reportsPerPage);

  const paginateReports = (pageNumber) => setCurrentReportPage(pageNumber);


  {/* Pagination for Requests */ }
  const [currentRequestPage, setCurrentRequestPage] = useState(1);
  const requestsPerPage = 10;

  // Filtered Water Requests
  const filteredRequests = Array.isArray(requests)
    ? requests
      .filter((req) =>
        (req.purpose?.toLowerCase() || "").includes(searchWaterRequest.toLowerCase()) ||
        (req.location?.toLowerCase() || "").includes(searchWaterRequest.toLowerCase()) ||
        (req.user?.email?.toLowerCase() || "").includes(searchWaterRequest.toLowerCase())
      )
      .filter((req) => (filterStatus ? req.status === filterStatus : true))
      .filter((req) => (filterDate ? req.dateNeeded?.split("T")[0] === filterDate : true))
    : [];

  const indexOfLastRequest = currentRequestPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalRequestPages = Math.ceil(filteredRequests.length / requestsPerPage);

  const paginateRequests = (pageNumber) => setCurrentRequestPage(pageNumber);


  useEffect(() => {
    setCurrentRequestPage(1);
  }, [searchWaterRequest, filterStatus, filterDate]);



  {/* Pagination for Payment */ }
  const [currentPaymentPage, setCurrentPaymentPage] = useState(1);
  const paymentsPerPage = 10;

  const filteredPayments = Array.isArray(payments)
    ? payments.filter((payment) => {
      const searchTerm = searchPayment.toLowerCase();
      const matchesSearch =
        (payment.userName?.toLowerCase() || "").includes(searchTerm) ||
        (payment.paymentId?.toLowerCase() || "").includes(searchTerm);

      const matchesRole =
        !roleFilter || payment.role?.toLowerCase() === roleFilter;

      const paymentDate = new Date(payment.date);
      const matchesStart = !startDate || paymentDate >= new Date(startDate);
      const matchesEnd = !endDate || paymentDate <= new Date(endDate);

      return matchesSearch && matchesRole && matchesStart && matchesEnd;
    })
    : [];

  const indexOfLastPayment = currentPaymentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
  const totalPaymentPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  const paginatePayments = (pageNumber) => setCurrentPaymentPage(pageNumber);


  useEffect(() => {
    setCurrentPaymentPage(1);
  }, [searchPayment, roleFilter, startDate, endDate]);



  const [showForwardModal, setShowForwardModal] = useState(false);
  const [forwardSupplierEmail, setForwardSupplierEmail] = useState("");
  const [forwardMessage, setForwardMessage] = useState("");



  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div
        className={`sidebar bg-primary text-white p-3 ${sidebarOpen ? "d-block" : "d-none d-md-block"}`}
        style={{ width: "250px" }}
      >
        <h4 className="mb-5 text-center mt-3">JalaSpeedy</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button
              className={`btn w-100 text-start ${activeTab === "dashboard" ? "btn-light" : "btn-outline-light"}`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className={`btn w-100 text-start ${activeTab === "userManagement" ? "btn-light" : "btn-outline-light"}`}
              onClick={() => setActiveTab("userManagement")}
            >
              Users
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className={`btn w-100 text-start ${activeTab === "supplierManagement" ? "btn-light" : "btn-outline-light"}`}
              onClick={() => setActiveTab("supplierManagement")}
            >
              Suppliers
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className={`btn w-100 text-start ${activeTab === "paymentManagement" ? "btn-light" : "btn-outline-light"}`}
              onClick={() => setActiveTab("paymentManagement")}
            >
              Payments
            </button>
          </li>
          <li className="nav-item mb-2">
            <button className={`btn w-100 text-start ${activeTab === "waterRequest" ? "btn-light" : "btn-outline-light"}`} onClick={() => setActiveTab("waterRequest")}>Water Request</button>
          </li>
          <li className="nav-item mb-5">
            <button
              className={`btn w-100 text-start ${activeTab === "reportManagement" ? "btn-light" : "btn-outline-light"}`}
              onClick={() => setActiveTab("reportManagement")}
            >
              User Reports
            </button>
          </li>
        </ul>

        {/* Close Button for Mobile */}
        <div className="d-md-none mt-3">
          <button className="btn-outline-light w-100 logout p-3" style={{ backgroundColor: "#000428", color: "white", borderRadius: "10px" }} onClick={() => setSidebarOpen(false)}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f6f6f6" }}>
        {/* Mobile Menu Toggle */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3 px-md-4 py-3 mb-3 rounded">
          <div className="container-fluid">

            {/* First Row: Logo and toggle */}
            <div className="d-flex justify-content-between w-100 align-items-center">
              {/* Sidebar toggle (mobile only) */}
              <button className="btn d-lg-none me-2" onClick={() => setSidebarOpen(true)}>
                <i className="bi bi-list fs-4"></i>
              </button>

              {/* Logo */}
              <span className="navbar-brand fw-bold fs-4 text-primary m-0">
                JalaSpeedy
              </span>
            </div>

            {/* Second Row: Profile + Logout */}
            <div className="d-flex flex-wrap justify-content-between justify-content-lg-end align-items-center w-100 mt-3 mt-lg-0 gap-3">

              {/* Profile (non-clickable) */}
              <div
                className="d-flex align-items-center gap-2"
                style={{ pointerEvents: "none", opacity: 0.9 }}
                title="Admin profile (disabled)"
              >
                <i className="bi bi-person-circle fs-4 text-secondary"></i>
                <span className="fw-semibold text-truncate" style={{ maxWidth: "160px" }}>
                  {adminName}
                </span>
              </div>

              {/* Logout Button */}
              <button
                className="btn btn-sm"
                style={{
                  backgroundColor: "#000428",
                  color: "white",
                  borderRadius: "10px",
                  minWidth: "90px",
                }}
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </button>
            </div>
          </div>
        </nav>



        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div>
            <h3 className="mb-4">Admin Dashboard Overview</h3>
            <div className="row g-4">
              <div className="col-md-4 col-12">
                <div className="card shadow-sm border-0 p-3">
                  <h5 className="text-muted">Total Users</h5>
                  <h3>{dashboardStats.totalUsers}</h3>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="card shadow-sm border-0 p-3">
                  <h5 className="text-muted">Total Water Requests</h5>
                  <h3>{dashboardStats.totalRequests}</h3>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="card shadow-sm border-0 p-3">
                  <h5 className="text-muted">Total Reports</h5>
                  <h3>{dashboardStats.totalReports}</h3>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="card shadow-sm border-0 p-3">
                  <h5 className="text-muted">Pending Requests</h5>
                  <h3>{dashboardStats.pendingRequests}</h3>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="card shadow-sm border-0 p-3">
                  <h5 className="text-muted">Supplied Water (Liters)</h5>
                  <h3>{dashboardStats.totalDeliveredLiters}L</h3>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* User Management Tab */}
        {/* {activeTab === "userManagement" && (
          <div>
            <h3>User Management (Users Only)</h3>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search User by name or email"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
            <div className="table-responsive mt-3">
              <table className="table table-bordered table-striped">
                <thead className="table-primary">
                  <tr className="text-center">
                    <th>#</th>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(users) && users
                    .filter(user =>
                      user.role === "user" &&
                      (user.username.toLowerCase().includes(searchUser.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchUser.toLowerCase()))
                    )
                    .map((user, i) => (
                      <tr key={user._id} className="text-center">
                        <td>{i + 1}</td>
                        <td>{user._id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td><span className="badge bg-secondary">{user.role}</span></td>
                        <td className="text-center">
                          <button className="btn-sm btn-info me-2" onClick={() => { setSelectedUser(user); setShowViewModal(true); }}>
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn-sm btn-warning me-2" onClick={() => { setSelectedUser(user); setShowEditModal(true); }}>
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn-sm btn-danger" onClick={() => handleDeleteClick(user._id)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>



        )} */}


        {activeTab === "userManagement" && (
          <div>
            <h3>User Management (Users Only)</h3>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search User by name or email"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />

            <div className="table-responsive mt-3">
              <table className="table table-bordered table-striped">
                <thead className="table-primary">
                  <tr className="text-center">
                    <th>#</th>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user, i) => (
                      <tr key={user._id} className="text-center">
                        <td>{indexOfFirstUser + i + 1}</td>
                        <td>{user._id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td><span className="badge bg-secondary">{user.role}</span></td>
                        <td className="text-center">
                          <button className="btn-sm btn-info me-2" onClick={() => { setSelectedUser(user); setShowViewModal(true); }}>
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn-sm btn-warning me-2" onClick={() => { setSelectedUser(user); setShowEditModal(true); }}>
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn-sm btn-danger" onClick={() => handleDeleteClick(user._id)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <nav className="d-flex justify-content-center mt-3">
                <ul className="pagination">
                  {[...Array(totalPages)].map((_, idx) => (
                    <li key={idx + 1} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => paginate(idx + 1)}>
                        {idx + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        )}



        {/* View user Modal */}
        {showViewModal && selectedUser && (
          <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">User Details</h5>
                  <button className="btn-close" onClick={() => setShowViewModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p><strong>ID:</strong> {selectedUser._id}</p>
                  <p><strong>Name:</strong> {selectedUser.username}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Role:</strong> {selectedUser.role}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditModal && selectedUser && (
          <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <form className="modal-content" onSubmit={handleEditSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit User</h5>
                  <button className="btn-close" onClick={() => setShowEditModal(false)} type="button"></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedUser.username}
                      onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={selectedUser.email}
                      onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      value={selectedUser.role}
                      onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                    >
                      <option value="user">User</option>
                      <option value="supplier">Supplier</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="p-2" style={{ backgroundColor: '#0d6efd', color: '#fff', borderRadius: '10px', padding: "3" }}>Save Changes</button>
                  <button type="button" className="btn-secondary p-2" onClick={() => setShowEditModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete User Modal */}
        {showDeleteModal && (
          <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-center">Confirm Deletion</h5>
                  <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                </div>
                <div className="modal-body text-center">
                  <p>Are you sure you want to delete this user?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn-cancel" style={{ backgroundColor: '#6c757d', color: '#fff', borderRadius: '10px', padding: "3px 12px" }} onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  <button className="btn-delete" style={{ backgroundColor: '#dc3545', color: '#fff', borderRadius: '10px', padding: "3px 12px" }} onClick={confirmDeleteUser}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}





        {/* Supplier Management Tab */}
        {activeTab === "supplierManagement" && (
          <div>
            <h3>Supplier Management</h3>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search Supplier"
              value={searchSupplier}
              onChange={(e) => setSearchSupplier(e.target.value)}
            />
            <div className="table-responsive mt-3">
              <table className="table table-bordered table-striped">
                <thead className="table-primary">
                  <tr className="text-center">
                    <th>#</th>
                    <th>Supplier ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers
                    .filter(s =>
                      s.username?.toLowerCase().includes(searchSupplier.toLowerCase()) ||
                      s.email?.toLowerCase().includes(searchSupplier.toLowerCase())
                    )
                    .map((supplier, i) => (
                      <tr key={supplier._id} className="text-center">
                        <td>{i + 1}</td>
                        <td>{supplier._id}</td>
                        <td>{supplier.username}</td>
                        <td>{supplier.email}</td>
                        <td><span className="badge bg-success">{supplier.role}</span></td>
                        <td>
                          <button className="btn-sm btn-info me-2" onClick={() => { setSelectedSupplier(supplier); setShowSupplierViewModal(true); }}>
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn-sm btn-warning me-2" onClick={() => { setSelectedSupplier(supplier); setShowSupplierEditModal(true); }}>
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn-sm btn-danger" onClick={() => {
                            setSelectedSupplierIdToDelete(supplier._id);
                            setShowSupplierDeleteModal(true);
                          }}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View Supplier Model */}
        {showSupplierViewModal && selectedSupplier && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Supplier Details</h5>
                  <button className="btn-close" onClick={() => setShowSupplierViewModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p><strong>ID:</strong> {selectedSupplier._id}</p>
                  <p><strong>Name:</strong> {selectedSupplier.username}</p>
                  <p><strong>Email:</strong> {selectedSupplier.email}</p>
                  <p><strong>Role:</strong> {selectedSupplier.role}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Supplier Model */}
        {showSupplierEditModal && selectedSupplier && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <form className="modal-content" onSubmit={handleSupplierEditSubmit}>
                <div className="modal-header">
                  <h5>Edit Supplier</h5>
                  <button className="btn-close" onClick={() => setShowSupplierEditModal(false)} type="button"></button>
                </div>
                <div className="modal-body">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={selectedSupplier.username}
                    onChange={(e) => setSelectedSupplier({ ...selectedSupplier, username: e.target.value })}
                    required
                  />
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control mb-2"
                    value={selectedSupplier.email}
                    onChange={(e) => setSelectedSupplier({ ...selectedSupplier, email: e.target.value })}
                    required
                  />
                  <label>Role</label>
                  <select
                    className="form-select"
                    value={selectedSupplier.role}
                    onChange={(e) => setSelectedSupplier({ ...selectedSupplier, role: e.target.value })}
                  >
                    <option value="user">User</option>
                    <option value="supplier">Supplier</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="p-2  btn-primary" style={{ borderRadius: "10px", width: "100px" }}>Save</button>
                  <button type="button" className="p-2 btn-secondary" style={{ borderRadius: "10px", width: "100px" }} onClick={() => setShowSupplierEditModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Supplier Modal */}
        {showSupplierDeleteModal && (
          <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Supplier Deletion</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowSupplierDeleteModal(false)}
                  ></button>
                </div>
                <div className="modal-body text-center">Are you sure you want to delete this supplier?</div>
                <div className="modal-footer">
                  <button className="btn-cancel" style={{ backgroundColor: '#6c757d', color: '#fff', borderRadius: '10px', padding: "3px 12px" }} onClick={() => setShowSupplierDeleteModal(false)}>
                    Cancel
                  </button>
                  <button className="btn-delete" style={{ backgroundColor: '#dc3545', color: '#fff', borderRadius: '10px', padding: "3px 12px" }} onClick={handleSupplierDeleteConfirm}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}




        {/* Payment Management Tab */}
        {activeTab === "paymentManagement" && (
          <div>
            <h3>Payment Management</h3>


            {/* Filter Controls */}
            <div className="row g-3 mb-3">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Username or Payment ID"
                  value={searchPayment}
                  onChange={(e) => setSearchPayment(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-3">
                <select
                  className="form-select p-2"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="">All Roles</option>
                  <option value="user">User</option>
                  <option value="supplier">Supplier</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="col-12 col-md-2">
                <input
                  type="date"
                  className="form-control p-2"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-2">
                <input
                  type="date"
                  className="form-control p-2"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-2 d-grid">
                <button
                  className="btn-secondary w-100 p-2"
                  style={{ backgroundColor: "#000428", border: "1px solid #ccc", color: "white", padding: "5px 3px", borderRadius: "10px" }}
                  onClick={() => {
                    setSearchPayment("");
                    setRoleFilter("");
                    setStartDate("");
                    setEndDate("");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>

            <div className="table-responsive mt-3">
              <table className="table table-bordered table-striped">
                <thead className="table-primary">
                  <tr>
                    <th>User ID</th>
                    <th>User Name</th>
                    <th>Payment ID</th>
                    <th>Amount</th>
                    <th>Role</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPayments.length > 0 ? (
                    currentPayments.map(payment => (
                      <tr key={payment._id}>
                        <td>{payment.userId}</td>
                        <td>{payment.userName}</td>
                        <td>{payment.paymentId}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.role}</td>
                        <td>{payment.date}</td>
                        <td className="text-center">
                          <button className="btn-sm btn-info me-2" onClick={() => {
                            setSelectedPayment(payment);
                            setShowPaymentView(true);
                          }}><i className="bi bi-eye"></i></button>
                          <button className="btn-sm btn-warning me-2" onClick={() => {
                            setSelectedPayment(payment);
                            setShowPaymentEdit(true);
                          }}><i className="bi bi-pencil"></i></button>
                          <button className="btn-sm btn-danger" onClick={() => handleDeletePayment(payment._id)}><i className="bi bi-trash"></i></button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-muted">No payments found.</td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>
        )}


        {/* Payment View Modal  */}

        {showPaymentView && selectedPayment && (
          <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Payment Details</h5>
                  <button className="btn-close" onClick={() => setShowPaymentView(false)}></button>
                </div>
                <div className="modal-body">
                  <table className="table table-bordered">
                    <tbody>
                      <tr><th>User</th><td>{selectedPayment.userName}</td></tr>
                      <tr><th>Email</th><td>{selectedPayment.email}</td></tr>
                      <tr><th>Plan</th><td>{selectedPayment.plan}</td></tr>
                      <tr><th>Amount</th><td>${selectedPayment.amount}</td></tr>
                      <tr><th>Status</th><td>{selectedPayment.status}</td></tr>
                      <tr><th>Date</th><td>{selectedPayment.date}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Edit Modal */}

        {showPaymentEdit && selectedPayment && (
          <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
              <form
                className="modal-content"
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const res = await axiosInstance.put(`/subscriptions/${selectedPayment._id}`, selectedPayment);
                    setPayments((prev) =>
                      prev.map((p) => (p._id === selectedPayment._id ? res.data : p))
                    );
                    toast.success("Payment updated successfully");
                    setShowPaymentEdit(false);
                  } catch (err) {
                    console.error("Update error:", err);
                    toast.error("Failed to update payment");
                  }
                }}
              >
                <div className="modal-header">
                  <h5 className="modal-title">Edit Payment</h5>
                  <button className="btn-close" onClick={() => setShowPaymentEdit(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-2">
                    <label className="form-label">Plan</label>
                    <select
                      className="form-select"
                      value={selectedPayment.plan}
                      onChange={(e) =>
                        setSelectedPayment({ ...selectedPayment, plan: e.target.value })
                      }
                    >
                      <option value="basic">Basic</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      value={selectedPayment.status}
                      onChange={(e) =>
                        setSelectedPayment({ ...selectedPayment, status: e.target.value })
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Success">Success</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn-primary p-2" style={{ borderRadius: "10px" }} type="submit">Update</button>
                  <button
                    type="button"
                    className="btn-secondary p-2"
                    style={{ borderRadius: "10px" }}
                    onClick={() => setShowPaymentEdit(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Pagination pages */}
        {totalPaymentPages > 1 && (
          <nav className="d-flex justify-content-center mt-3">
            <ul className="pagination">
              {[...Array(totalPaymentPages)].map((_, idx) => (
                <li key={idx} className={`page-item ${currentPaymentPage === idx + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginatePayments(idx + 1)}>
                    {idx + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}



        {/* Water Request Management */}

        {/* Water Request Tab */}
        {activeTab === "waterRequest" && (
          <div>
            <h3>Water Request Management</h3>

            {/* Filter Section */}
            <div className="row g-2 mb-3">
              <div className="col-12 col-md-4">
                <input
                  type="text"
                  className="form-control p-2"

                  placeholder="Search by purpose, location or email"
                  value={searchWaterRequest}
                  onChange={(e) => setSearchWaterRequest(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-3">
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
              <div className="col-12 col-md-3">
                <input
                  type="date"
                  className="form-control p-2"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-2 d-grid">
                <button
                  className="btn-clear w-100 p-2"
                  style={{ backgroundColor: "#000428", border: "1px solid #ccc", color: "white", padding: "5px 3px", borderRadius: "10px" }}
                  onClick={() => {
                    setSearchWaterRequest("");
                    setFilterStatus("");
                    setFilterDate("");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>

            <div className="table-responsive mt-3">
              <table className="table table-bordered table-striped align-middle">
                <thead className="table-primary">
                  <tr className="text-center">
                    <th>#</th>
                    <th>User ID</th>
                    <th>Email</th>
                    <th>Purpose</th>
                    <th>Amount (L)</th>
                    <th>Location</th>
                    <th>Date Needed</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRequests.length > 0 ? (
                    currentRequests.map((req, i) => (
                      <tr key={req._id} className="text-center">
                        <td>{indexOfFirstRequest + i + 1}</td>
                        <td>{req.user?._id || "N/A"}</td>
                        <td>{req.user?.email || "N/A"}</td>
                        <td>{req.purpose}</td>
                        <td>{req.amount}</td>
                        <td>{req.location}</td>
                        <td>{req.dateNeeded}</td>
                        <td>
                          <span className={`badge bg-${req.status === "Completed" ? "success" : req.status === "Rejected" ? "danger" : "warning"} text-dark`}>
                            {req.status || "Pending"}
                          </span>
                        </td>
                        <td className="text-center">
                          <button className="btn-sm btn-info me-2" onClick={() => { setSelectedRequest(req); setShowRequestEdit(true); }}>
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn-sm btn-warning me-2" onClick={() => { setSelectedRequest(req); setShowRequestEdit(true); }}>
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn-sm btn-danger" onClick={() => handleDeleteRequest(req._id)}>
                            <i className="bi bi-trash"></i>
                          </button>

                          {/* Forward Message */}
                          <button
                            className="btn-sm btn-dark me-2"
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
                      <td colSpan="9" className="text-center text-muted">No water requests found.</td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>

            {/* View Modal */}
            {showRequestEdit && selectedRequest && (
              <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog">
                  <form className="modal-content" onSubmit={handleRequestUpdate}>
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Water Request</h5>
                      <button type="button" className="btn-close" onClick={() => setShowRequestEdit(false)}></button>
                    </div>
                    <div className="modal-body">
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Edit Modal */}
            {showRequestEdit && selectedRequest && (
              <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                  <form className="modal-content" onSubmit={handleRequestUpdate}>
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Water Request</h5>
                      <button className="btn-close" type="button" onClick={() => setShowRequestEdit(false)}></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-2">
                        <label>Purpose</label>
                        <input className="form-control" value={selectedRequest.purpose} onChange={(e) => setSelectedRequest({ ...selectedRequest, purpose: e.target.value })} />
                      </div>
                      <div className="mb-2">
                        <label>Amount (L)</label>
                        <input className="form-control" type="number" value={selectedRequest.amount} onChange={(e) => setSelectedRequest({ ...selectedRequest, amount: e.target.value })} />
                      </div>
                      <div className="mb-2">
                        <label>Location</label>
                        <input className="form-control" value={selectedRequest.location} onChange={(e) => setSelectedRequest({ ...selectedRequest, location: e.target.value })} />
                      </div>
                      <div className="mb-2">
                        <label>Date Needed</label>
                        <input className="form-control" type="date" value={selectedRequest.dateNeeded} onChange={(e) => setSelectedRequest({ ...selectedRequest, dateNeeded: e.target.value })} />
                      </div>
                      <div className="mb-2">
                        <label>Status</label>
                        <select className="form-select" value={selectedRequest.status} onChange={(e) => setSelectedRequest({ ...selectedRequest, status: e.target.value })}>
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="p-2 btn-primary" style={{ borderRadius: "10px", width: "100px" }}>Update</button>
                      <button type="button" className="p-2 btn-secondary" style={{ borderRadius: "10px", width: "100px" }} onClick={() => setShowRequestEdit(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Pagination Pages */}
            {totalRequestPages > 1 && (
              <nav className="d-flex justify-content-center mt-3">
                <ul className="pagination">
                  {[...Array(totalRequestPages)].map((_, idx) => (
                    <li key={idx} className={`page-item ${currentRequestPage === idx + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => paginateRequests(idx + 1)}>
                        {idx + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}


            {/* forward message model */}
            {showForwardModal && selectedRequest && (
              <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog">
                  <form
                    className="modal-content"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const token = localStorage.getItem("auth_token");

                      try {
                        await axios.post(
                          "http://localhost:5000/api/requests/admin-forward",
                          {
                            supplierEmail: forwardSupplierEmail,
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

                        toast.success("Request forwarded successfully");
                        setShowForwardModal(false);
                        setForwardSupplierEmail("");
                        setForwardMessage("");
                      } catch (error) {
                        console.error("Forward failed", error);
                        toast.error("Failed to forward request");
                      }
                    }}
                  >
                    <div className="modal-header">
                      <h5 className="modal-title">Forward Water Request to Supplier</h5>
                      <button type="button" className="btn-close" onClick={() => setShowForwardModal(false)}></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-2">
                        <label>Supplier Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={forwardSupplierEmail}
                          onChange={(e) => setForwardSupplierEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label>Message to Supplier</label>
                        <textarea
                          className="form-control"
                          rows="4"
                          value={forwardMessage}
                          onChange={(e) => setForwardMessage(e.target.value)}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">Send</button>
                      <button type="button" className="btn btn-secondary" onClick={() => setShowForwardModal(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}


          </div>
        )}


        {/* Report Management */}

        {/* Reports Tab */}
        {activeTab === "reportManagement" && (
          <div>
            <h3>Reports Management</h3>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search Report"
              value={searchReport}
              onChange={(e) => setSearchReport(e.target.value)}
            />
            <div className="table-responsive mt-3">
              <table className="table table-bordered table-striped">
                <thead className="table-primary">
                  <tr className="text-center">
                    <th>Report ID</th>
                    <th>Report Type</th>
                    <th>Description</th>
                    <th>Role</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentReports.length > 0 ? (
                    currentReports.map((report) => (
                      <tr key={report._id} className="text-center">
                        <td>{report._id}</td>
                        <td>{report.type || "Not specified"}</td>
                        <td>{report.description || "Unknown"}</td>
                        <td>{report.role || "User"}</td>
                        <td>{report.dateOfIssue || "N/A"}</td>
                        <td>
                          <button
                            className="btn-sm btn-info me-2"
                            onClick={() => {
                              setViewReport(report);
                              setShowViewModal(true);
                            }}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button
                            className="btn-sm btn-warning me-2"
                            onClick={() => {
                              setEditReport({ ...report });
                              setShowEditModal(true);
                            }}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn-sm btn-danger"
                            onClick={() => {
                              setReportToDelete(report._id);
                              setShowReportDeleteModal(true);
                            }}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">No reports found.</td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>
        )}

        {/* Pagination Pages */}
        {totalReportPages > 1 && (
          <nav className="d-flex justify-content-center mt-3">
            <ul className="pagination">
              {[...Array(totalReportPages)].map((_, idx) => (
                <li key={idx} className={`page-item ${currentReportPage === idx + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginateReports(idx + 1)}>
                    {idx + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}


        {/* Report View Modal */}
        {showViewModal && viewReport && (
          <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">User Report</h5>
                  <button className="btn-close" onClick={() => setShowViewModal(false)}></button>
                </div>
                <div className="modal-body">
                  <table className="table table-bordered">
                    <tbody>
                      <tr><th>Report ID</th><td>{viewReport._id}</td></tr>
                      <tr><th>Type</th><td>{viewReport.type}</td></tr>
                      <tr><th>Descripion</th><td>{viewReport.description}</td></tr>
                      <tr><th>Date</th><td>{viewReport.dateOfIssue}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report Edit Modal */}
        {showEditModal && editReport && (
          <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit User Report</h5>
                  <button className="btn-close" onClick={() => setShowEditModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleUpdateReport}>
                    <input type="hidden" value={editReport._id} />
                    <div className="mb-3">
                      <label className="form-label">User Name</label>
                      <input className="form-control" value={editReport.userName} onChange={(e) => setEditReport({ ...editReport, userName: e.target.value })} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Report Type</label>
                      <input className="form-control" value={editReport.reportType} onChange={(e) => setEditReport({ ...editReport, reportType: e.target.value })} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Date</label>
                      <input type="date" className="form-control" value={editReport.date?.split("T")[0]} onChange={(e) => setEditReport({ ...editReport, date: e.target.value })} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" rows="3" value={editReport.description} onChange={(e) => setEditReport({ ...editReport, description: e.target.value })}></textarea>
                    </div>
                    <button className="p-2 btn-primary w-100" type="submit" style={{ borderRadius: "10px", width: "100px" }}>Update Report</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Report Modal */}
        {showReportDeleteModal && (
          <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Report Deletion</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowReportDeleteModal(false)}
                  ></button>
                </div>
                <div className="modal-body">Are you sure you want to delete this report?</div>
                <div className="modal-footer">
                  <button
                    className="btn-cancel"
                    style={{ backgroundColor: '#6c757d', color: '#fff', borderRadius: '10px', padding: "3px 12px" }}
                    onClick={() => setShowReportDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn-delete" style={{ backgroundColor: '#dc3545', color: '#fff', borderRadius: '10px', padding: "3px 12px" }} onClick={handleConfirmReportDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


      </div>


      {/* Internal CSS */}

      <style>{`

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
        }
        .sidebar .nav-link {
            color: #fff;
        }

      .animate-fade {
        animation: fadeIn 0.6s ease-in-out;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (max-width: 576px) {
        .navbar-brand {
          font-size: 1.3rem;
        }
        .btn-sm {
          font-size: 0.8rem;
        }
    }
      `}</style>
    </div>

  );
};

export default AdminDashboard;