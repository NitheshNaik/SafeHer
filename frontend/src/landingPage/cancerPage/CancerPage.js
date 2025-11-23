import React, { useState } from "react";
import "./CancerPage.css"; 
import Navbar from '../Navbar';

// Mock Data for educational content
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

// Mock function to simulate AI detection (using an API call structure)
const mockImageScan = async (base64Image) => {
    // In a real application, this would send the image to a specialized model (e.g., Gemini-2.5-Flash or a custom model)
    // Here, we simulate a delay and a random result for demonstration purposes.
    console.log("Simulating image scan for detection...");
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay

    const results = [
        { risk: 'High Risk', message: 'Detection scan indicates several areas requiring professional follow-up. Please consult a doctor immediately.', colorClass: 'result-high' },
        { risk: 'Moderate Risk', message: 'Scan suggests minor irregularities. While likely benign, professional screening is recommended.', colorClass: 'result-moderate' },
        { risk: 'Low Risk', message: 'No significant irregularities detected by the AI. Continue regular self-checks.', colorClass: 'result-low' },
    ];

    // Select a random result
    const mockResult = results[Math.floor(Math.random() * results.length)];

    return mockResult;
};

function BreastCheck() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResult(null); // Clear previous results
    }
  };

  const handleScan = async () => {
    if (!file) return;

    setLoading(true);
    setResult(null);

    // Convert file to Base64 to simulate API transmission
    const reader = new FileReader();
    reader.onloadend = async () => {
        const base64Data = reader.result.split(',')[1];
        
        try {
            // Mock the AI call
            const scanResult = await mockImageScan(base64Data);
            setResult(scanResult);
        } catch (error) {
            console.error("AI Scan Error:", error);
            setResult({ risk: 'Error', message: 'Could not process image. Please try again.', colorClass: 'result-error' });
        } finally {
            setLoading(false);
        }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
    <Navbar/>
    <div className="breast-page-container pt-4 pb-5">
      <div className="container">
        
        {/* Header: Breast Check & Detection */}
        <div className="d-flex align-items-center justify-content-center mb-5">
            <div className="check-header-icon-container me-3">
                <i class="fa-solid fa-ribbon"></i>
            </div>
            <h4 className="check-header-title mb-0">AI Breast Check & Guidance</h4>
        </div>

        {/* --- 1. Image Upload and Results --- */}
        <div className="check-card-main p-4 p-md-5 mb-4 mx-auto">
          <h5 className="card-section-title mb-4"><i className="bi bi-cloud-arrow-up-fill me-2"></i> Upload for Detection Scan</h5>

          <div className="upload-area p-4 mb-4 text-center">
             <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="imageUpload" className="upload-label d-block p-4">
                  {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="img-preview mb-3" />
                  ) : (
                      <>
                        <i className="bi bi-image-fill upload-icon mb-2"></i>
                        <p className="mb-0">Click here to upload a scan or image</p>
                        <small className="text-muted">JPEG or PNG accepted</small>
                      </>
                  )}
              </label>
              
              <button 
                  onClick={handleScan}
                  disabled={!file || loading}
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

export default BreastCheck;