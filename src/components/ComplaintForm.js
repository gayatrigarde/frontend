import React, { useState } from 'react';
import axios from 'axios';
import './ComplaintForm.css';
import { useNavigate } from 'react-router-dom';
import { CREATE_COMPLAINT_API } from '../config/api';


const ComplaintForm = () => {
  const navigate = useNavigate();
  const [wardNumber, setWardNumber] = useState('');
  const [address, setAddress] = useState('');
  const [complaintType, setComplaintType] = useState('Garbage');
  const [complaintDescription, setComplaintDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      setMessage('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('wardNumber', wardNumber);
    formData.append('Address', address);
    formData.append('complaintType', complaintType);
    formData.append('complaintDescription', complaintDescription);
    formData.append('image', selectedImage);

    try {
      const token = localStorage.getItem('token');
      await axios.post(
       CREATE_COMPLAINT_API,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      alert('Your complaint is submitted successfully!');
      navigate('/dashboard');

      setWardNumber('');
      setAddress('');
      setComplaintType('Garbage');
      setComplaintDescription('');
      setSelectedImage(null);
      setMessage('');
    } catch (err) {
      console.error('Submit Error:', err.response?.data || err.message);
      setMessage(' Failed to submit complaint. Please try again.');
    }
  };

  return (
    <div
      className="complaint-container"
      style={{
        backgroundImage: 'url("/images/rajwada.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <div className="overlay"></div>
      <form className="complaint-card" onSubmit={handleSubmit}>
        <h2>Raise Nagar Nigam Complaint</h2>

        <label htmlFor="image">Upload Image:</label>
        <input
          type="file"
          id="image"
          onChange={(e) => setSelectedImage(e.target.files[0])}
          required
        />

        <label htmlFor="type">Complaint Type:</label>
        <select
          id="type"
          value={complaintType}
          onChange={(e) => setComplaintType(e.target.value)}
        >
          <option>Garbage</option>
          <option>Street Light</option>
          <option>Water</option>
          <option>Drainage</option>
          <option>Other</option>
        </select>

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <label htmlFor="ward">Ward Number:</label>
        <input
          type="text"
          id="ward"
          value={wardNumber}
          onChange={(e) => setWardNumber(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={complaintDescription}
          onChange={(e) => setComplaintDescription(e.target.value)}
          required
        ></textarea>

        <button type="submit">Submit Complaint</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default ComplaintForm;
