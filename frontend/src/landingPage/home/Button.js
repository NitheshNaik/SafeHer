import React, { useState } from 'react';

const App = () => {
  const [isAlertActive, setIsAlertActive] = useState(false);

  // Function to handle the SOS click event
  const handleSosClick = () => {
    if (isAlertActive) return;

    setIsAlertActive(true);
    setTimeout(() => {
      setIsAlertActive(false);
    }, 5000);
    
    console.log("Emergency SOS signal initiated.");
  };

  return (
    <>
      <div 
        className="min-h-screen w-full flex flex-col items-center justify-center p-4"
        style={{
          fontFamily: 'Inter, sans-serif',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8F8 100%)' 
        }}
      >

        
        {/* --- Centered Content Area --- */}
        {/* FIX: Using a negative margin to shift the entire content block upward, forcing larger whitespace below the button */}
        <div className="flex flex-col items-center text-center -mt-20"> 


          <button
            onClick={handleSosClick}
            className="shadow-2xl font-extrabold text-white uppercase transition-transform duration-300 active:scale-95 hover:shadow-xl"
            style={{
              width: "280px",
              height: "280px",
              fontSize: "64px", 
              backgroundColor: '#FF004F', 
              boxShadow: "0 10px 40px rgba(255, 0, 79, 0.6)",
              borderRadius: '50%',
              border: 'none',
              marginTop:"28px"
            }}
            disabled={isAlertActive}
            
          >
            {isAlertActive ? (
              <svg className="animate-spin h-10 w-10 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'SOS'
            )}
            
          </button>      
        </div>
      </div>
    </>
  );
};

export default App;