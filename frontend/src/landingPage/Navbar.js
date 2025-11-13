import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import custom styles

function Navbar() {
  return (
    <nav className="safeher-navbar navbar navbar-expand-lg border-bottom p-3">
      <div className="container-fluid container-xl">
        
        {/* Brand/Logo Section */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="navbar-logo-icon me-2">
            <i class="fa-solid fa-venus"></i> {/* Using a health/safety icon */}
          </div>
          <h4 className="navbar-brand-text mb-0">SafeHer</h4>
        </Link>
        
        {/* Toggler Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#safeHerNavbarContent"
          aria-controls="safeHerNavbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navigation Links and Profile Section */}
        <div className="collapse navbar-collapse" id="safeHerNavbarContent">
          
          {/* Main Navigation Links (pushed to the right using ms-auto) */}
          <ul className="navbar-nav ms-auto me-lg-4 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link safeher-nav-link" to='/' >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link safeher-nav-link" to='/services' >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link safeher-nav-link" to='/about' >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link safeher-nav-link" to='/contact' >
                Contact
              </Link>
            </li>
          </ul>
          
          {/* Profile Section */}
          <div className="d-flex align-items-center">
            <Link to="/profile" className="nav-link profile-link">
              <div className="profile-icon-wrapper">
                <i className="bi bi-person-circle"></i>
              </div>
              <span className="d-lg-none ms-2">Profile</span>
            </Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;