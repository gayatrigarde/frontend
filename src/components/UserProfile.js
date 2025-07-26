import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROFILE_API } from '../config/api';
import './UserProfile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert('Unauthorized access. Please sign in.');
      navigate('/signin');
      return;
    }

    fetch(PROFILE_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
        alert('Unable to load profile. Please try again.');
        navigate('/signin');
      });
  }, [navigate, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    fetch(PROFILE_API, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      })
      .then((data) => {
        alert('Profile updated successfully!');
        setUserData(data.user);
        setIsEditing(false);
      })
      .catch((err) => {
        console.error('Update error:', err);
        alert('Failed to update profile. Please try again.');
      });
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      navigate('/signin');
    }
  };

  const goToDashboard = () => navigate('/dashboard');

  if (loading) {
    return (
      <div className="user-profile-container">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div
      className="user-profile-container"
      style={{
        backgroundImage: 'url("/images/rajwada.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="overlay" />
      <div className="user-profile-form">
        <h2 className="center-heading">👤 {userData.name || 'User Profile'}</h2>

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={userData.email} disabled />
        </label>

        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label>
          Address:
          <textarea
            name="address"
            value={userData.address}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <div className="user-profile-buttons">
          {isEditing ? (
            <>
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
          <button onClick={goToDashboard} className="back-button">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
