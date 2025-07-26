import React from 'react';
import './HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
const navigate = useNavigate(); 
  return (
    <div
      className="homepage"
      style={{ backgroundImage: `url(/images/rajwada.jpg)` }}
    >
      <div className="overlay d-flex flex-column justify-content-center align-items-center text-white text-center px-3">
        <img src="/images/logo.webp" alt="Logo" className="logo mb-3" />
        <h2 className="homepage-title">Smart Nagar Nigam Complaint</h2>
        <button className="btn btn-primary mt-4 px-4 py-2" onClick={() => navigate('/signup')}>Create your Account</button>
      </div>
    </div>
  );
};

export default HomePage;