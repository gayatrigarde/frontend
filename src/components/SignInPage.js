import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { LOGIN_API } from '../config/api'; 
import './SignInPage.css';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(LOGIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        dispatch(setToken(data.token));
        dispatch(setUser({ email, role }));
        navigate(role === "user" ? "/dashboard" : "/AdminDashboard");
      } else {
        alert(data.message || "Invalid email or password");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential); 
      const res = await fetch(`${LOGIN_API.replace('/login', '/google-login')}`, {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: decoded.email,
          name: decoded.name,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token); 
        dispatch(setToken(data.token));
        dispatch(setUser({ email: decoded.email, role: 'user' }));
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google login failed");
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-panel">
        <div className="single-box">
          <h1 className="title">Smart Nagar Nigam Complaint</h1>
          <img src="/images/profile.webp" alt="User Icon" className="user-icon" />
          <h2>Sign In</h2>

          <form onSubmit={handleLogin} autoComplete="off">
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="role-section">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={() => setRole("user")}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                />
                Admin
              </label>
            </div>

            <a href="/forgot" className="forgot-link">Forgot Password?</a>
            <button type="submit">Submit</button>
          </form>

          <div style={{ margin: "20px auto" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => alert("Google Login Failed")}
            />
          </div>

          <div className="bottom-logo">
            <img src="/images/logo.webp" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
