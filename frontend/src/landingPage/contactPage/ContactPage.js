import React, { useState } from "react";
import "./ContactPage.css"; 
import Navbar from '../Navbar';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // In a real application, you would send this data to a backend API
    setIsSubmitted(true);
    // Optionally reset form after submission: setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
    <Navbar/>
    <div className="contact-page-container d-flex justify-content-center align-items-center py-5">
      <div className="container contact-max-width">
        
        {/* Header: Get In Touch */}
        <div className="text-center mb-5">
          <div className="contact-logo-icon mx-auto mb-2">
            <i class="fa-solid fa-envelope"></i>
          </div>
          <h2 className="contact-title mb-1">Get In Touch</h2>
          <p className="contact-subtitle text-muted">We're here to answer your questions and hear your feedback.</p>
        </div>

        {/* --- Main Content Row --- */}
        <div className="row g-4 justify-content-center">
            
            {/* Contact Form Card (Left/Center) */}
            <div className="col-lg-7">
                <div className="contact-card p-4 p-md-5 h-100">
                    <h4 className="card-section-title mb-4">Send Us a Message</h4>
                    
                    {isSubmitted ? (
                        <div className="alert-success p-4 text-center">
                            <i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. We will respond shortly.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="form-label contact-label">Your Name</label>
                                <input 
                                    type="text" 
                                    className="form-control contact-input" 
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Jane Doe"
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label contact-label">Your Email</label>
                                <input 
                                    type="email" 
                                    className="form-control contact-input" 
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="subject" className="form-label contact-label">Subject</label>
                                <input 
                                    type="text" 
                                    className="form-control contact-input" 
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Regarding partnership, feedback, or support"
                                    required
                                />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="message" className="form-label contact-label">Message</label>
                                <textarea
                                    className="form-control contact-input"
                                    id="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Type your message here..."
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-contact-submit w-100">
                                Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Contact Info Sidebar (Right) */}
            <div className="col-lg-4">
                <div className="info-card p-4 p-md-4 h-100">
                    <h4 className="card-section-title mb-4">Contact Info</h4>
                    
                    <div className="info-item mb-4">
                        <i className="bi bi-geo-alt-fill me-3"></i>
                        <div>
                            <p className="info-title mb-0">Our Location</p>
                            <p className="info-detail mb-0">SafeHer Headquarters, Bangalore, India</p>
                        </div>
                    </div>

                    <div className="info-item mb-4">
                        <i className="bi bi-telephone-fill me-3"></i>
                        <div>
                            <p className="info-title mb-0">Phone</p>
                            <p className="info-detail mb-0">+91 (0) 123 456 7890</p>
                        </div>
                    </div>

                    <div className="info-item mb-4">
                        <i className="bi bi-clock-fill me-3"></i>
                        <div>
                            <p className="info-title mb-0">Support Hours</p>
                            <p className="info-detail mb-0">Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                        </div>
                    </div>
                    
                    <div className="info-item">
                        <i className="bi bi-envelope-open-fill me-3"></i>
                        <div>
                            <p className="info-title mb-0">Email</p>
                            <p className="info-detail mb-0">support@safeher.in</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
      </div>
    </div>
    </>
  );
}

export default ContactPage;