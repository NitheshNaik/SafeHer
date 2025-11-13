import React from "react";
import "./Cards.css"; 

const Card = ({ title, description, iconClass, iconBgColor, cardBgColor, link }) => (
  <div className="col-12 col-md-6 mb-4">
    <div className={`modern-card-v2 p-4 h-100`} style={{ backgroundColor: cardBgColor }}>
      {/* Icon Placeholder */}
      <div className="icon-container-v2 mb-4" style={{ background: iconBgColor }}>
        <i class={`${iconClass}`}></i>
      </div>
      
      <h5 className="card-title-v2">{title}</h5>
      <p className="card-text-v2">{description}</p>
      
      {/* The explore link, now always rendered but hidden/revealed by CSS */}
      <a href={link} className="explore-link mt-2">
        Explore <i className="bi bi-chevron-right"></i>
      </a>
    </div>
  </div>
);

function Cards() {
  // Define card data with unique styles based on the images
  const cardData = [
    {
      title: "Wellness & BMI Tracker",
      description: "Monitor your health metrics and track your wellness journey with personalized insights.",
      // <i class="fa-solid fa-heart-pulse"></i>
      iconClass: "fa-solid fa-heart-pulse", // Heartbeat icon
      iconBgColor: "linear-gradient(135deg, #a855f7, #ec4899)", // Purple/Pink Gradient
      cardBgColor: "rgb(250, 248, 252)", // Light Lavender background
      link:"/bmi",
    },
    {
      title: "Breast Cancer Self-Check Guide",
      description: "Step-by-step guidance for self-examination and early detection awareness.",
      iconClass: "fa-solid fa-ribbon", // Ribbon icon
      iconBgColor: "linear-gradient(135deg, #f43f5e, #f97316)", // Hot Pink/Orange Gradient
      cardBgColor: "rgb(255, 245, 250)", // Light Pink background
      link:"/cancer",
    },
    {
      title: "Safety Overview",
      description: "Manage your emergency contacts and configure safety settings for quick access.",
      iconClass: "fa-solid fa-user-shield", // People/Group icon
      iconBgColor: "linear-gradient(135deg, #3b82f6, #06b6d4)", // Blue/Cyan Gradient
      cardBgColor: "rgb(245, 249, 253)", // Light Blue background
      link:"/safety",
    },
    {
      title: "Legal & Rights Resource Center",
      description: "Access comprehensive legal information and know your rights.",
      iconClass: "fa-solid fa-scale-unbalanced-flip", // Scale of Justice icon
      iconBgColor: "linear-gradient(135deg, #10b981, #059669)", // Green Gradient
      cardBgColor: "rgb(245, 255, 250)", // Light Green background
      link:"/legal",
    },
  ];

  return (
    <>
      <div className="text-center mt-3 p-5">
        <h2>Your Wellness & Safety Hub</h2>
        <p>Comprehensive tools and resources designed to support your health, safety, and well-being</p>
    </div>  
    <div className="container py-5">
      <div className="row justify-content-center">
        {cardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
    </>
  );
}

export default Cards;