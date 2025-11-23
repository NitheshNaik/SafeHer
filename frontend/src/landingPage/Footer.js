import React from "react";
import "./Footer.css"; // Import the custom CSS file

function SafeHerFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="safeher-footer mt-5 pt-5 pb-3">
      <div className="container">
        
        {/* Top Section: Navigation Links and Logo */}
        <div className="row mb-4">
          <div className="col-md-4 mb-4">
            <h5 className="footer-logo">SafeHer</h5>
            <p className="footer-tagline">Empowering safety, wellness, and peace of mind.</p>
          </div>
          
          <div className="col-6 col-md-2">
            <h6 className="footer-heading">Features</h6>
            <ul className="list-unstyled">
              <li><a href="bmi" className="footer-link">BMI Tracker</a></li>
              <li><a href="safety" className="footer-link">Safety Settings</a></li>
              <li><a href="legal" className="footer-link">Legal Resources</a></li>
            </ul>
          </div>
          
          <div className="col-6 col-md-2">
            <h6 className="footer-heading">Company</h6>
            <ul className="list-unstyled">
              <li><a href="about" className="footer-link">About Us</a></li>
              <li><a href="about" className="footer-link">Our Mission</a></li>
              <li><a href="contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          <div className="col-md-4">
             {/* Placeholder for Social Media Icons */}
             <h6 className="footer-heading">Connect</h6>
             <div className="social-icons">
                <a href="#" className="social-link me-3"><i className="bi bi-facebook"></i></a>
                <a href="#" className="social-link me-3"><i class="fa-brands fa-instagram"></i></a>
                <a href="https://www.linkedin.com/in/nithesh-naik-a75621291/" target="_blank" className="social-link"><i class="fa-brands fa-linkedin"></i></a>
             </div>
          </div>
        </div>

        
        
        {/* Bottom Section: Copyright and Legal */}
        <div className="row pt-2">
          <div className="col-md-6">
            <p className="copyright-text">
              &copy; {currentYear} SafeHer. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
             <a href="#" className="legal-link me-3">Privacy Policy</a>
             <a href="#" className="legal-link">Terms of Service</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}

export default SafeHerFooter;