// frontend/src/components/BreastScanUpload.jsx

import React, { useState } from "react";
import "./CancerPage.css"; // Assuming you have a CSS file for the styles
import Navbar from '../Navbar'; // Assuming Navbar component is available
import Chatbot from "../chatBot/Chatbot";

// --- 1. Mock Data (Retained from Old .js for Educational Content) ---
const educationalContent = {
  selfCheck: [
    "Know what is normal for your breasts. Familiarize yourself with how your breasts look and feel.",
    "Perform self-examinations monthly, typically a few days after your period ends.",
    "Look for changes in shape, size, color, or dimpling while standing in front of a mirror.",
    "Feel for lumps, thickening, or hard knots using the pads of your fingers in a circular motion.",
  ],
  riskFactors: [
    "Age: Risk increases after age 50.",
    "Family history of breast cancer.",
    "Obesity and lack of physical activity.",
    "Dense breast tissue.",
    "Radiation exposure to the chest.",
  ],
};

// --- 2. Main Component (Uses State and Handlers from the new .jsx) ---
export default function BreastScanUpload() {
  // State variables adapted from the new .jsx file
  const [selectedImage, setSelectedImage] = useState(null);
  const [rawFile, setRawFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Helper to open file dialog (from new .jsx, but not used in the final JSX structure)
  // const triggerUpload = () => {
  //   document.getElementById("imageUpload").click();
  // };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setRawFile(file); // This is the actual file object
    setSelectedImage(URL.createObjectURL(file)); // This is the preview URL
    setResult(null); // Clear previous results
  };

  // --- 3. Core AI Scan Logic (Adapted from the new .jsx file) ---
  async function uploadAndScan() {
    if (!rawFile) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);
    const fd = new FormData();
    // The key 'file' must match what the backend expects
    fd.append("file", rawFile);

    try {
      // Use the live backend endpoint we configured
      const res = await fetch("http://localhost:4000/api/ai/scan", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const errorBody = await res.text();
        console.error("Backend Error Response (Body):", errorBody);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      
      // We assume the data format is: { label: '...', confidence: 0.XX }
      // We adapt the old component's result structure to display the AI data
      const resultRisk = data.label.includes('Negative') ? 'Low Risk' : 'High Risk';
      const resultColor = data.label.includes('Negative') ? 'result-low' : 'result-high';
      const message = `AI prediction: ${data.label} with ${Math.round(data.confidence * 100)}% confidence.`;

      setResult({ 
          risk: resultRisk, 
          message: message, 
          colorClass: resultColor 
      });

    } catch (err) {
      console.error("Full Scan Error:", err);
      setResult({ risk: 'Error', message: 'Could not process image. Check your console.', colorClass: 'result-error' });
    } finally {
      setLoading(false);
    }
  }

  // --- 4. Render (Uses the rich HTML structure and classes from the old .js) ---
  return (
    <>
      <Navbar/>
      <Chatbot/>
      <div className="breast-page-container pt-4 pb-5">
        <div className="container">
          
          {/* Header: Breast Check & Detection */}
          <div className="d-flex align-items-center justify-content-center mb-5">
              <div className="check-header-icon-container me-3">
                  <i className="fa-solid fa-ribbon"></i>
              </div>
              <h4 className="check-header-title mb-0">AI Breast Check & Guidance</h4>
          </div>

          {/* --- 1. Image Upload and Results --- */}
          <div className="check-card-main p-4 p-md-5 mb-4 mx-auto">
            <h5 className="card-section-title mb-4"><i className="bi bi-cloud-arrow-up-fill me-2"></i> Upload for Detection Scan</h5>

            <div className="upload-area p-4 mb-4 text-center">
              {/* Input for File Selection */}
              <input
                  type="file"
                  id="imageUpload" // ID retained from old .js
                  accept="image/png,image/jpeg" // Use more specific accepts
                  onChange={handleFileSelect} // Use handler from new .jsx
                  style={{ display: 'none' }}
              />
              <label htmlFor="imageUpload" className="upload-label d-block p-4">
                  {/* Preview Logic */}
                  {selectedImage ? (
                      <img src={selectedImage} alt="Preview" className="img-preview mb-3" />
                  ) : (
                      <>
                        <i className="bi bi-image-fill upload-icon mb-2"></i>
                        <p className="mb-0">Click here to upload a scan or image</p>
                        <small className="text-muted">JPEG or PNG accepted</small>
                      </>
                  )}
              </label>
              
              {/* Scan Button */}
              <button 
                  onClick={uploadAndScan} // Use function from new .jsx
                  disabled={!rawFile || loading}
                  className="btn-scan-image mt-3"
              >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Scanning...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-search me-1"></i> Run AI Scan
                    </>
                  )}
              </button>
            </div>
            
            {/* Result Display */}
            {result && (
                <div className={`scan-result-box p-4 mt-4 ${result.colorClass}`}>
                    <h6 className="result-heading mb-2">AI Assessment: <span className="result-risk">{result.risk}</span></h6>
                    <p className="result-message mb-0">{result.message}</p>
                </div>
            )}
          </div>

          {/* --- 2. Educational Content --- */}
          <div className="check-card-info p-4 p-md-5 mx-auto">
              <h5 className="card-section-title mb-4"><i className="bi bi-clipboard-check-fill me-2"></i> How to Perform a Self-Check</h5>
              <ul className="info-list">
                  {educationalContent.selfCheck.map((item, index) => (
                      <li key={index}>{item}</li>
                  ))}
              </ul>

              <h5 className="card-section-title mt-4 mb-3"><i className="bi bi-exclamation-octagon-fill me-2"></i> Know Your Risk Factors</h5>
              <ul className="info-list risk-factors-list">
                  {educationalContent.riskFactors.map((item, index) => (
                      <li key={index}>{item}</li>
                  ))}
              </ul>
          </div>

          {/* --- 3. Critical Health Disclaimer --- */}
          <div className="check-disclaimer-box p-3 mt-4 mx-auto">
            <p className="disclaimer-text-check mb-0">
              <i className="bi bi-x-octagon-fill me-2"></i> **AI Diagnostic Warning:** This AI tool is for **INFORMATIONAL and AWARENESS** purposes only. It is not a licensed medical device and **CANNOT provide a definitive diagnosis**. AI models can make mistakes, and the quality of the image uploaded directly impacts the result. **Always consult a qualified doctor or specialized radiologist for professional screening, diagnosis, and treatment.**
            </p>
          </div>

        </div>
      </div>
    </>
  );
}