import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css"; // Import the custom CSS for styling

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

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
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
          navigate("/");    
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError("Login failed due to a server or network error.");
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="login-page-container d-flex justify-content-center align-items-center min-vh-100 py-5">
      <div className="login-card p-4 p-md-5 mx-auto">
        
        {/* Header: Logo and Title */}
        <div className="text-center mb-5">
          <div className="login-logo-icon mx-auto mb-2">
            <i className="bi bi-shield-lock-fill"></i>
          </div>
          <h2 className="login-title mb-1">Welcome Back to SafeHer</h2>
          <p className="login-subtitle text-muted">Access your personal wellness and safety dashboard.</p>
        </div>
        
        {/* --- Login Form --- */}
        <form onSubmit={handleSubmit}>
          
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
            Sign In
          </button>
        </form>

        {/* Links */}
        <div className="text-center">
            <a href="/forgot-password" className="forgot-link mb-2 d-block">Forgot Password?</a>
            <span className="text-muted">
                Don't have an account? 
                <Link to={"/signup"} className="toggle-link ms-1">
                    Sign Up
                </Link>
            </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;