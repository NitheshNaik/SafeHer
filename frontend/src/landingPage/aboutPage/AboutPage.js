import React from "react";
import "./AboutPage.css"; // Import the custom CSS file
import Navbar from '../Navbar';

// Helper component for the Feature Grid items
const FeatureIcon = ({ title, description, iconClass, iconBgColor }) => (
  <div className="col-lg-3 col-md-6 text-center feature-item mb-5">
    {/* Icon Container with Gradient Background */}
    <div className="icon-container-feature mx-auto mb-3" style={{ background: iconBgColor }}>
      <i className={`${iconClass}`}></i>
    </div>
    
    <h6 className="feature-title">{title}</h6>
    <p className="feature-description">{description}</p>
  </div>
);

function AboutSafeHer() {
  const featureData = [
    {
      title: "Safety First",
      description: "Your security is our top priority with instant emergency response",
      iconClass: "fa-solid fa-shield", // Shield icon
      iconBgColor: "linear-gradient(135deg, #f43f5e, #f97316)", // Red/Orange Gradient
    },
    {
      title: "Wellness Focus",
      description: "Comprehensive health tracking and self-care resources",
      iconClass: "fa-solid fa-heart", // Heart icon
      iconBgColor: "linear-gradient(135deg, #a855f7, #ec4899)", // Purple/Pink Gradient
    },
    {
      title: "Community Support",
      description: "24/7 support and connection with trusted resources",
      iconClass: "fa-solid fa-users", // People/Group icon
      iconBgColor: "linear-gradient(135deg, #3b82f6, #06b6d4)", // Blue/Cyan Gradient
    },
    {
      title: "AI Powered",
      description: "Smart technology designed with empathy and care",
      iconClass: "fa-solid fa-gears", // Star icon
      iconBgColor: "linear-gradient(135deg, #10b981, #059669)", // Green Gradient
    },
  ];

  return (
    <>
    {/* <Navbar/> */}
    <div className="safeher-page-container">
      
      
      {/* 1. About SafeHer (Intro) - Changed py-5 to py-3 */}
      <section className="container py-3">
        <h2 className="section-heading text-center mb-5">About SafeHer</h2>
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center mb-5">
            <p className="lead-text">
              SafeHer is dedicated to empowering women with tools and resources for safety, wellness, and peace of mind. Our mission is to provide accessible, **AI-powered support** that prioritizes your well-being every step of the way.
            </p>
          </div>
        </div>

        {/* Feature Grid (Icon Row) */}
        <div className="row justify-content-center pt-4">
          {featureData.map((feature, index) => (
            <FeatureIcon key={index} {...feature} />
          ))}
        </div>
      </section>
      
      {/* 2. Our Commitment (Large Text Block with Soft Background) - Changed py-5 to py-3 */}
      <section className="container py-3"> 
        <div className="commitment-block mx-auto p-5">
          <h3 className="commitment-title text-center mb-4">Our Commitment</h3>
          <p className="commitment-text text-center mx-auto">
            We believe every woman deserves to feel safe, supported, and empowered. SafeHer combines cutting-edge technology with compassionate design to provide a comprehensive platform for personal safety and wellness. Whether you need immediate emergency assistance, health guidance, or access to legal resources, we’re here for you—anytime, anywhere.
          </p>
        </div>
      </section>

    </div>
    </>
  );
}

export default AboutSafeHer;