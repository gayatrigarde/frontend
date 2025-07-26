import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-left">
          <img src="/images/logo.webp" alt="Nagar Nigam Logo" className="admin-logo" />
          <h2>Smart Nagar Nigam Complaint</h2>
        </div>
        <div className="admin-header-right">
          <a href="/logout" className="header-link logout-link">Logout</a>
        </div>
      </div>

      <div className="admin-card-section">
        {/* Wrap poora card in Link */}
        <Link to="/view-complaints" className="admin-card-link">
          <div className="admin-card">
            <img src="/images/complaint.png" alt="Admin Icon" className="admin-icon" />
            <div className="admin-card-text">
              <h3>View Complaints</h3>
              <p>Check and manage complaints received</p>
            </div>
            <span className="admin-next-button">{'>'}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
