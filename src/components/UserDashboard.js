import React from 'react';
import './UserDashboard.css';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleComplaintClick = () => {
    navigate('/complaint');
  };

  const handleProfileClick = () => {
    navigate('/user-profile');
  };

  const handleViewComplaintClick = () => {
    navigate('/my-complaints');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Smart Nagar Nigam Complaint</h2>
        <img 
          src="/images/logo.webp" 
          alt="Smart Nagar Nigam Logo" 
          className="header-logo"
        />
      </header>

      <main className="dashboard-body">
        <div
          className="dashboard-card"
          onClick={handleComplaintClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleComplaintClick()}
        >
          <img src="/images/complaint.png" alt="Raise Complaint Icon" />
          <div className="card-text">
            <h3>Nagar Nigam Complaint</h3>
            <p>Raise your complaint directly from here</p>
          </div>
          <div className="card-arrow">{'>'}</div>
        </div>

        <div
          className="dashboard-card"
          onClick={handleViewComplaintClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleViewComplaintClick()}
        >
          <img src="/images/cc.jpg" alt="View Complaint Icon" />
          <div className="card-text">
            <h3>View My Complaints</h3>
            <p>Check status of complaints submitted</p>
          </div>
          <div className="card-arrow">{'>'}</div>
        </div>
      </main>

      <footer
        className="dashboard-footer"
        onClick={handleProfileClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleProfileClick()}
      >
        <img src="/images/profile.webp" alt="User Profile Icon" />
        <span>User Profile</span>
      </footer>
    </div>
  );
};

export default UserDashboard;
