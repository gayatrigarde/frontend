import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';
import { API } from '../config/api';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, phone, address } = formData;

    if (!name || !email || !password || !phone || !address) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await fetch(API.SIGNUP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        await fetch(API.SEND_OTP, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        alert("OTP sent to your email");
        navigate(`/verify-otp?email=${email}`);
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-panel">
        <h2 className="panel-title">Smart Nagar Nigam Complaint</h2>
        <div className="curve-section">
          <img src="/images/profile.webp" alt="user icon" className="user-icon" />
          <h3 className="form-heading">Create Your Account</h3>
        </div>

        <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} autoComplete="new-password" />
          <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />

          <button type="submit" className="signup-button">Sign Up</button>
        </form>

        <div className="signin-link">
          Already have an account? <a href="/signin">Sign In</a>
        </div>

        <div className="bottom-logo">
          <img src="/images/logo.webp" alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
