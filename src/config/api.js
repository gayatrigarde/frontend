const BASE_URL = 'http://localhost:3000/api'; // ✅ backend port

// Complaint APIs
export const MY_COMPLAINTS_API = `${BASE_URL}/complaints/my-complaints`;
export const DELETE_COMPLAINT_API = `${BASE_URL}/complaints/delete`;
export const CREATE_COMPLAINT_API = `${BASE_URL}/complaints/submit-complaint`; // ✅ fixed

// Admin APIs
export const ALL_COMPLAINTS_API = `${BASE_URL}/admin/all`;
export const FILTER_COMPLAINTS_API = `${BASE_URL}/admin/filter`;

// User APIs
export const PROFILE_API = `${BASE_URL}/profile`;
export const USER_DETAILS_API = `${BASE_URL}/complaints/user`;

// Auth APIs
export const LOGIN_API = `${BASE_URL}/auth/login`;
export const API = {
  SIGNUP: `${BASE_URL}/auth/signup`,
  SEND_OTP: `${BASE_URL}/otp/send-otp`,
};

// Email
export const SEND_EMAIL_API = `${BASE_URL}/email/send-email`;

// For Images
export const IMAGE_BASE_URL = 'http://localhost:3000';  

export default BASE_URL;
