import React, { useState } from "react";
import "./LoginPage.css"; 
// Import the custom CSS file for this page

function LoginPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Attempting Login:", { email, password });
    } else {
      console.log("Attempting Sign Up:", { username, email, password });
    }
    // Add real authentication logic here (e.g., API call)
  };

  const pageTitle = isLogin ? "Welcome Back to SafeHer" : "Create Your SafeHer Account";
  const buttonText = isLogin ? "Sign In" : "Sign Up";
  const toggleText = isLogin ? "New user? Create an account" : "Already a member? Sign In";

  return (
    <div className="login-page-container d-flex justify-content-center align-items-center min-vh-100 py-5">
      <div className="login-card p-4 p-md-5 mx-auto">
        
        {/* Header: Logo and Title */}
        <div className="text-center mb-5">
          <div className="login-logo-icon mx-auto mb-2">
            <i class="fa-solid fa-arrow-right-to-bracket"></i>
          </div>
          <h2 className="login-title mb-1">{pageTitle}</h2>
          <p className="login-subtitle text-muted">{isLogin ? "Access your personal wellness and safety dashboard." : "Join SafeHer for peace of mind and personalized support."}</p>
        </div>
        
        {/* --- Login/Sign Up Form --- */}
        <form onSubmit={handleSubmit}>
          
          {/* Username (Only for Sign Up) */}
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="username" className="form-label login-label">Username</label>
              <input 
                type="text" 
                className="form-control login-input" 
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                required={!isLogin}
              />
            </div>
          )}
          
          {/* Email/Gmail */}
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

          {/* Password */}
          <div className="mb-5">
            <label htmlFor="password" className="form-label login-label">Password</label>
            <input 
              type="password" 
              className="form-control login-input" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-login w-100 mb-3">
            {buttonText}
          </button>
        </form>

        {/* Forgot Password / Toggle Link */}
        <div className="text-center">
            {isLogin && <a href="/forgot-password" className="forgot-link mb-2 d-block">Forgot Password?</a>}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }}
              className="toggle-link mt-2 d-inline-block"
            >
              {toggleText}
            </a>
        </div>
        
      </div>
    </div>
  );
}

export default LoginPage;