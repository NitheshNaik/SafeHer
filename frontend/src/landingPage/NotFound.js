import React from "react";
import "./NotFound.css"; // Import the custom CSS file

function NotFoundPage() {
  return (
    <div className="not-found-container d-flex flex-column justify-content-center align-items-center min-vh-100 py-5">
      <div className="not-found-content text-center p-4">
        
        {/* Large 404 Error Text */}
        <h1 className="error-code mb-3">404</h1>
        
        {/* Main Message */}
        <h2 className="error-title mb-4">Page Not Found</h2>
        
        {/* Description */}
        <p className="error-description mb-5">
          Oops! It looks like you've wandered off the path. The page you're looking for might have been moved, deleted, or never existed.
        </p>
        
        {/* Home Button (using the soft blue primary color) */}
        <a href="/" className="btn-home-safeher shadow-sm">
          <i className="bi bi-house-door-fill me-2"></i> Go Back Home
        </a>
      </div>
    </div>
  );
}

export default NotFoundPage;