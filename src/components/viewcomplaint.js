import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ALL_COMPLAINTS_API,
  FILTER_COMPLAINTS_API,
  USER_DETAILS_API,
  SEND_EMAIL_API,
  IMAGE_BASE_URL
} from "../config/api"; 
import "./viewcomplaint.css";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const handleUserDetails = async (userId) => {
    try {
      const res = await axios.get(`${USER_DETAILS_API}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = res.data;
      setSelectedUser(user);
      alert(`👤 User Details:
Name: ${user.name}
Email: ${user.email}
Phone: ${user.phone}
Address: ${user.address}`);
    } catch (error) {
      console.error("Error fetching user details:", error.response?.data || error.message);
      alert("Unable to fetch user details.");
    }
  };

  const fetchComplaints = useCallback(async () => {
    try {
      const url = statusFilter
        ? `${FILTER_COMPLAINTS_API}?status=${statusFilter}`
        : ALL_COMPLAINTS_API;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  }, [statusFilter, token]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  return (
    <div
      className="viewcomplaint-wrapper"
      style={{
        backgroundImage: 'url("/images/rajwada.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="overlay" />
      <div className="container">
        <h2>📘 Complaints Book</h2>

        <div className="back-button-wrapper">
          <button className="back-button" onClick={() => navigate("/AdminDashboard")}>
            ⬅️Back
          </button>
        </div>

        <div className="filter-bar">
          <label htmlFor="status">Filter by Status: </label>
          <select
            id="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="cards-grid">
          {complaints.length === 0 ? (
            <p>No complaints found for selected status.</p>
          ) : (
            complaints.map((item) => (
              <div key={item._id} className="complaint-card">
                <img
                  src={`${IMAGE_BASE_URL}${item.imageUrl}`}
                  alt="issue"
                  className="complaint-image"
                />
                <div className="complaint-content">
                  <h3>{item.complaintType}</h3>
                  <p>{item.complaintDescription}</p>
                  <p>{item.Address}</p>
                  <p>Ward Number: {item.wardNumber}</p>
                  <p><strong>Complaint ID:</strong> {item._id}</p>
                  <p><strong>User ID:</strong> {item.user}</p>
                  <p><strong>Submitted:</strong> {new Date(item.submittedAt).toLocaleString()}</p>
                  <p><strong>Status:</strong> {item.status}</p>

                  <button
                    className="verify-button"
                    onClick={() => handleUserDetails(item.user)}
                  >
                     User Details
                  </button>

                  <button
                    className="send-email-button"
                    onClick={async () => {
                      if (!selectedUser || !selectedUser.email) {
                        alert("Please click on 'User Details' first to load user email.");
                        return;
                      }

                      try {
                        await axios.post(SEND_EMAIL_API, {
                          name: selectedUser.name,
                          email: selectedUser.email,
                          complaintType: item.complaintType,
                          assignedTo: "Smart Nagar Nigam Team",
                        });

                        alert("📨 Email sent successfully!");
                      } catch (err) {
                        console.error("Send email error:", err.response?.data || err.message);
                        alert("Failed to send email.");
                      }
                    }}
                  >
                    📩 Send Email
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintList;
