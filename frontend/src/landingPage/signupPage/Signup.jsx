import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../loginPage/Login.css"; // Ensure path points to the common CSS

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError("Signup failed due to a server or network error.");
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="login-page-container d-flex justify-content-center align-items-center min-vh-100 py-5">
      <div className="login-card p-4 p-md-5 mx-auto">
        
        {/* Header: Logo and Title */}
        <div className="text-center mb-5">
          <div className="login-logo-icon mx-auto mb-2" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
            <i className="bi bi-person-plus-fill"></i>
          </div>
          <h2 className="login-title mb-1">Create Your SafeHer Account</h2>
          <p className="login-subtitle text-muted">Join SafeHer for peace of mind and personalized support.</p>
        </div>
        
        {/* --- Sign Up Form --- */}
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label htmlFor="username" className="form-label login-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control login-input"
              value={username}
              placeholder="Choose a username"
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="form-label login-label">Email / Gmail</label>
            <input
              type="email"
              name="email"
              className="form-control login-input"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
              required
            />
          </div>
          
          <div className="mb-5">
            <label htmlFor="password" className="form-label login-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control login-input"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
              required
            />
          </div>
          
          <button type="submit" className="btn-login w-100 mb-3">
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <span className="text-muted">
            Already have an account? 
            <Link to={"/login"} className="toggle-link ms-1">
              Login
            </Link>
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;