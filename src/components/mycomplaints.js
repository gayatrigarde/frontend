import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './mycomplaints.css';
import { useNavigate } from 'react-router-dom';
import { MY_COMPLAINTS_API, DELETE_COMPLAINT_API, IMAGE_BASE_URL } from '../config/api';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(MY_COMPLAINTS_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaints(res.data.complaints);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching complaints');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this complaint?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${DELETE_COMPLAINT_API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Complaint deleted successfully");
      fetchComplaints();
    } catch (err) {
      alert("Failed to delete complaint");
    }
  };

  return (
    <div className="my-complaints">
      <div className="header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>⬅Back</button>
        <h2>📋 My Complaints</h2>
      </div>

      {error && <p className="error-msg">{error}</p>}

      {complaints.length === 0 ? (
        <p className="no-data">No complaints found.</p>
      ) : (
        <div className="complaint-list">
          {complaints.map((complaint) => (
            <div className="complaint-card" key={complaint._id}>
              {complaint.imageUrl && (
                <img
                  src={`${IMAGE_BASE_URL}${complaint.imageUrl}`}
                  alt="complaint"
                  className="complaint-img"
                />
              )}
              <p><strong>Complaint Type:</strong> {complaint.complaintType}</p>
              <p><strong>Address:</strong> {complaint.Address}</p>
              <p><strong>Ward Number:</strong> {complaint.wardNumber}</p>
              <p><strong>Description:</strong> {complaint.complaintDescription}</p>
              <p><strong>Status:</strong> {complaint.status}</p>
              <p><strong>User ID:</strong> {complaint.user}</p>
              <p><strong>Submitted At:</strong> {new Date(complaint.submittedAt).toLocaleString()}</p>

              <button className="delete-btn" onClick={() => handleDelete(complaint._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyComplaints;
