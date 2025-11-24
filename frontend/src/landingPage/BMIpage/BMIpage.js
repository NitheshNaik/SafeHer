import React, { useState } from "react";
import "./BMIpage.css"; 
import Navbar from '../Navbar';
import Chatbot from "../chatBot/Chatbot";

// Helper function to calculate BMI (unchanged)
const calculateBMI = (height, weight, unit) => {
  if (!height || !weight) return null;

  let bmi;
  if (unit === 'metric') {
    const heightInMeters = height / 100;
    bmi = weight / (heightInMeters * heightInMeters);
  } else {
    const heightInInches = height; 
    bmi = (weight / (heightInInches * heightInInches)) * 703;
  }
  return bmi ? parseFloat(bmi.toFixed(1)) : null;
};

// Helper function to determine the BMI category (unchanged)
const getBMICategory = (bmi) => {
  if (bmi === null) return '';
  if (bmi < 18.5) return 'Underweight';
  if (bmi >= 18.5 && bmi <= 24.9) return 'Healthy Weight';
  if (bmi >= 25.0 && bmi <= 29.9) return 'Overweight';
  if (bmi >= 30.0) return 'Obese';
  return '';
};

// NEW Helper function to determine the CSS class based on category
const getResultClass = (category) => {
    switch (category) {
        case 'Healthy Weight':
            return 'bmi-healthy';
        case 'Underweight':
        case 'Overweight':
        case 'Obese':
            return 'bmi-risk';
        default:
            return '';
    }
};

function BMICalculator() {
  const [unit, setUnit] = useState('metric'); 
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('68'); 
  const [bmiResult, setBmiResult] = useState(null);
  const [category, setCategory] = useState('');

  const handleCalculate = () => {
    const bmi = calculateBMI(parseFloat(height), parseFloat(weight), unit);
    setBmiResult(bmi);
    setCategory(getBMICategory(bmi));
  };

  const unitLabels = unit === 'metric' ? { height: 'cm', weight: 'kg' } : { height: 'in', weight: 'lbs' };

  const bmiCategories = [
    { name: 'Underweight', range: 'Below 18.5' },
    { name: 'Healthy Weight', range: '18.5 - 24.9' },
    { name: 'Overweight', range: '25.0 - 29.9' },
    { name: 'Obese', range: '30.0 and above' },
  ];

  const resultClass = getResultClass(category); // Get the dynamic class here

  return (
    <>
    <Navbar/>
    <Chatbot/>
    <div className="bmi-page-container pb-5">
      <div className="container">
        
        {/* Header Section (unchanged) */}
        <div className="bmi-header-wrapper d-flex align-items-center justify-content-center mb-4">
            <div className="bmi-header-icon-container me-3">
                <i class="fa-solid fa-heart-pulse"></i>
            </div>
            <h4 className="bmi-header-title mb-0">BMI Calculator</h4>
        </div>
        
        {/* Main Content Card (unchanged inputs) */}
        <div className="bmi-card-main p-4 p-md-5 mx-auto">
          <h5 className="text-center mb-4 card-section-title">Calculate Your Body Mass Index</h5>

          {/* Unit Toggle (unchanged) */}
          <div className="d-flex justify-content-center mb-4">
            <button
              className={`unit-toggle-btn ${unit === 'imperial' ? 'active' : ''}`}
              onClick={() => setUnit('imperial')}
            >
              Imperial (ft/lbs)
            </button>
            <button
              className={`unit-toggle-btn ${unit === 'metric' ? 'active' : ''}`}
              onClick={() => setUnit('metric')}
            >
              Metric (cm/kg)
            </button>
          </div>

          {/* Input Fields (unchanged) */}
          <div className="input-group-bmi mb-4">
            <label className="input-label">Height</label>
            <div className="input-with-unit">
              <input 
                type="number" 
                className="form-control bmi-input" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === 'metric' ? 'e.g., 170' : 'e.g., 68'}
              />
              <span className="input-unit-label">{unitLabels.height}</span>
            </div>
          </div>

          <div className="input-group-bmi mb-5">
            <label className="input-label">Weight</label>
            <div className="input-with-unit">
              <input 
                type="number" 
                className="form-control bmi-input" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === 'metric' ? 'e.g., 68' : 'e.g., 150'}
              />
              <span className="input-unit-label">{unitLabels.weight}</span>
            </div>
          </div>
          
          {/* Calculate Button (unchanged) */}
          <button 
            className="btn-calculate-bmi"
            onClick={handleCalculate}
          >
            Calculate My BMI
          </button>
          
          {/* BMI Result Display - CLASS UPDATED HERE */}
          {bmiResult !== null && (
            <div className={`bmi-result-display p-3 mt-4 text-center ${resultClass}`}>
              Your BMI: <span className="bmi-value">{bmiResult}</span> 
              <span className="bmi-category">({category})</span>
            </div>
          )}

        </div>
        
        {/* Understanding BMI Card (unchanged) */}
        <div className="bmi-card-info p-4 p-md-5 mt-4 mx-auto">
          <h5 className="card-section-title mb-3">Understanding Your BMI</h5>
          <p className="bmi-info-text mb-4">
            Body Mass Index (BMI) is a screening tool that uses your height and weight to estimate body fat. It provides a general indication of whether your weight falls within a healthy range.
          </p>

          <h6 className="mb-3 info-subsection-title">BMI Categories</h6>
          <ul className="list-unstyled bmi-category-list">
            {bmiCategories.map(cat => (
              <li key={cat.name} className={`bmi-category-item ${cat.name === category ? 'active-category' : ''}`}>
                <span className="category-name">{cat.name}</span>
                <span className="category-range">{cat.range}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Limitations Card (unchanged) */}
        <div className="bmi-card-info p-4 p-md-5 mt-4 mx-auto">
          <h5 className="card-section-title mb-3">Important Limitations of BMI</h5>
          <ul className="limitations-list">
            <li>BMI doesn't distinguish between muscle mass and fat mass</li>
            <li>It doesn't account for body composition, bone density, or distribution of fat</li>
            <li>Individual health factors like age, ethnicity, and overall fitness aren't considered</li>
            <li>Athletes and very active individuals may have a higher BMI due to muscle mass</li>
          </ul>
        </div>

        {/* Critical Disclaimer (Red Box) (unchanged) */}
        <div className="disclaimer-bmi-box p-3 mt-4 mx-auto">
          <p className="disclaimer-text-bmi mb-0">
            **Disclaimer:** BMI is a general screening tool and should not be used as a diagnostic tool. It provides an estimate but doesn't directly measure body fat or overall health. Always consult with a **qualified healthcare professional** for personalized medical advice, diagnosis, and treatment recommendations.
          </p>
        </div>

      </div>
    </div>
    </>
  );
}

export default BMICalculator;