import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import UserDashboard from './components/UserDashboard';
import UserProfile from './components/UserProfile';
import ComplaintForm from './components/ComplaintForm';
import AdminDashboard from './components/AdminDashboard';
import ViewComplaints from './components/viewcomplaint';
import MyComplaints from './components/mycomplaints';
import PrivateRoute from './components/PrivateRoute';
import VerifyOtpPage from './components/VerifyOtpPage';
import './App.css';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="708393782819-1l21rgnggpvli3gp1h08b1nn2b1foi1n.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/dashboard" element={<PrivateRoute allowedRole="user"><UserDashboard /></PrivateRoute>} />
          <Route path="/user-profile" element={<PrivateRoute allowedRole="user"><UserProfile /></PrivateRoute>} />
          <Route path="/complaint" element={<PrivateRoute allowedRole="user"><ComplaintForm /></PrivateRoute>} />
          <Route path="/my-complaints" element={<PrivateRoute allowedRole="user"><MyComplaints /></PrivateRoute>} />
          <Route path="/AdminDashboard" element={<PrivateRoute allowedRole="admin"><AdminDashboard /></PrivateRoute>} />
          <Route path="/view-complaints" element={<PrivateRoute allowedRole="admin"><ViewComplaints /></PrivateRoute>} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
