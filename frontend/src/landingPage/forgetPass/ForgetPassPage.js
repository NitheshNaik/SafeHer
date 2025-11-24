import React, { useState } from "react";
import "./ForgetPassPage.css"; // Reuse the existing LoginPage.css for consistent styling
import Navbar from '../Navbar';
import Chatbot from "../chatBot/Chatbot";

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate API call for password reset
    console.log("Password reset requested for:", email);
    
    // Display a confirmation message
    setMessage(`If an account with ${email} exists, a password reset link has been sent.`);
    setEmail(''); // Clear the input
  };

  return (
    <>
    <Navbar/>
    <Chatbot/>
    <div className="login-page-container d-flex justify-content-center align-items-center min-vh-100 py-5">
      <div className="login-card p-4 p-md-5 mx-auto">
        
        {/* Header: Logo and Title */}
        <div className="text-center mb-5">
          <div className="login-logo-icon mx-auto mb-2">
            <i className="bi bi-key-fill"></i> {/* Key icon for password reset */}
          </div>
          <h2 className="login-title mb-1">Forgot Password?</h2>
          <p className="login-subtitle text-muted">Enter your email to receive a password reset link.</p>
        </div>
        
        {/* --- Reset Form --- */}
        <form onSubmit={handleSubmit}>
          
          {/* Email/Gmail Input */}
          <div className="mb-4">
            <label htmlFor="email" className="form-label login-label">Email / Gmail</label>
            <input 
              type="email" 
              className="form-control login-input" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          {/* Confirmation Message */}
          {message && (
            <div className="alert alert-info text-center mb-4" role="alert">
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn-login w-100 mb-4">
            Send Reset Link
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="text-center">
            <a href="/login" className="toggle-link d-inline-block">
              <i className="bi bi-arrow-left me-1"></i> Back to Login
            </a>
        </div>
        
      </div>
    </div>
    </>
  );
}

export default ForgotPasswordPage;