import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BASE_URL from '../config/api'; 
import './VerifyOtpPage.css';

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email');

  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!email) {
      setMessage('Email not found. Please go back to SignUp.');
    }
  }, [email]);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/otp/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp })
      });

      const result = await response.json();

      if (response.ok) {
        alert('OTP verified successfully!');
        navigate('/signin');
      } else {
        alert(result.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Server error. Please try again later.');
    }
  };

  const handleResend = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/otp/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();

      if (response.ok) {
        alert('OTP resent successfully!');
      } else {
        alert(result.message || 'Failed to resend OTP.');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      alert('Error resending OTP.');
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-panel">
        <h2 className="otp-title">Verify OTP</h2>
        <p className="otp-instruction">
          Please enter the OTP sent to your email: <strong>{email}</strong>
        </p>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="otp-input"
            required
          />

          <button type="submit" className="otp-button">Verify OTP</button>
        </form>

        <button className="resend-button" onClick={handleResend}>Resend OTP</button>

        {message && <p className="error-message">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyOtpPage;
