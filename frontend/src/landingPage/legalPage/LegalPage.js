import React from "react";
import "./LegalPage.css"; // Import the custom CSS file
import Navbar from '../Navbar';
import Chatbot from "../chatBot/Chatbot";

// Data structure for the legal resources
const legalResources = {
  emergencyNumbers: [
    { name: "Police Emergency", number: "100" },
    { name: "Women Helpline (All India)", number: "1091" },
    { name: "Domestic Abuse/Violence", number: "181" },
  ],
  ngoContacts: [
    { name: "National Commission for Women (NCW)", link: "https://www.ncw.gov.in/", helpline: "011-26942369" },
    { name: "Childline India", link: "https://childlineindia.org/a/about/childline-india", helpline: "1098" },
  ],
  keyLaws: [
    {
      title: "The Hindu Succession Act, 1956 (Amended 2005)",
      description: "Grants daughters equal rights as sons in inheriting ancestral and self-acquired property of the father.",
      icon: "bi-house-fill",
    },
    {
      title: "The Protection of Women from Domestic Violence Act, 2005 (PWDVA)",
      description: "Provides civil remedies like protection orders, residence orders, and monetary relief against various forms of domestic abuse.",
      icon: "bi-heart-half",
    },
    {
      title: "Dowry Prohibition Act, 1961",
      description: "Prohibits the giving or taking of dowry and prescribes severe penalties for non-compliance.",
      icon: "bi-cash-coin",
    },
    {
      title: "Sexual Harassment of Women at Workplace Act (POSH Act), 2013",
      description: "Ensures a safe working environment for women by providing mechanisms for prevention, prohibition, and redressal of sexual harassment.",
      icon: "bi-briefcase-fill",
    },
  ],
};

function LegalResources() {
  return (
    <>
    <Navbar/>
    <Chatbot/>
    <div className="legal-page-container pt-4 pb-5">
      <div className="container">
        
        {/* Header: Legal & Rights Resource Center */}
        <div className="d-flex align-items-center justify-content-center mb-5">
            <div className="legal-header-icon-container me-3">
                <i class="fa-solid fa-scale-unbalanced-flip"></i>
            </div>
            <h4 className="legal-header-title mb-0">Legal & Rights Resource Center</h4>
        </div>

        {/* --- 1. Emergency & NGO Contacts --- */}
        <div className="legal-card-main p-4 p-md-5 mb-4 mx-auto">
          <h5 className="card-section-title mb-4"><i className="bi bi-telephone-fill me-2"></i> Immediate Assistance & Helplines (India)</h5>

          <div className="row g-3 mb-4">
            {legalResources.emergencyNumbers.map((item, index) => (
              <div key={index} className="col-md-4">
                <a href={`tel:${item.number}`} className="emergency-box d-block p-3 text-center">
                  <h6 className="emergency-name mb-1">{item.name}</h6>
                  <p className="emergency-number mb-0">{item.number}</p>
                </a>
              </div>
            ))}
          </div>

          <h6 className="sub-section-title mt-4 mb-3">National & NGO Resources</h6>
          {legalResources.ngoContacts.map((item, index) => (
            <div key={index} className="ngo-item d-flex justify-content-between align-items-center p-3 mb-2">
              <div>
                <strong className="ngo-name">{item.name}</strong>
                <span className="d-block ngo-phone">Helpline: {item.helpline}</span>
              </div>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn-view-ngo">
                Visit Site <i className="bi bi-box-arrow-up-right"></i>
              </a>
            </div>
          ))}
        </div>

        {/* --- 2. Key Legal Rights & Property/Inheritance --- */}
        <div className="legal-card-main p-4 p-md-5 mx-auto">
          <h5 className="card-section-title mb-4"><i className="bi bi-shield-fill-check me-2"></i> Key Indian Laws for Women</h5>

          <p className="intro-text mb-4">
            Understanding your legal rights is the first step toward empowerment. Below are key Indian laws related to property, marriage, and personal safety.
          </p>

          <div className="row g-4">
            {legalResources.keyLaws.map((law, index) => (
              <div key={index} className="col-md-6">
                <div className="law-card p-3 h-100">
                  <div className="law-icon-container mb-2">
                    <i className={`bi ${law.icon}`}></i>
                  </div>
                  <h6 className="law-title">{law.title}</h6>
                  <p className="law-description">{law.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 3. Legal Disclaimer --- */}
        <div className="legal-disclaimer-box p-3 mt-4 mx-auto">
          <p className="disclaimer-text-legal mb-0">
            **General Legal Disclaimer:** The information on this page is for general awareness only and does not constitute legal advice. Laws change frequently, and interpretation varies. For specific legal counsel regarding inheritance, domestic issues, or any other matter, please consult a qualified legal professional or advocate.
          </p>
        </div>

      </div>
    </div>
    </>
  );
}

export default LegalResources;