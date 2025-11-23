import React, { useState } from 'react';
import axios from 'axios';

// Component for the Emergency SOS button that sends location via SMS
const SOSButton = () => {
  // State to track the current status message shown to the user
  const [status, setStatus] = useState(" ");
  
  // State to track if the operation (location fetching + API call) is in progress
  const [isSending, setIsSending] = useState(false);

  // Function that combines location fetching and SMS API call
  const sendLocationSMS = () => {
    // Prevent multiple clicks while an operation is already running
    if (isSending) return;

    // Check for Geolocation support
    if (!navigator.geolocation) {
      setStatus("Error: Geolocation is not supported by your browser ❌");
      return;
    }

    // 1. Start the sending process
    setIsSending(true);
    setStatus("Finding your location... 🧭");
    console.log("Emergency SOS signal initiated.");

    // 2. Get current position
    navigator.geolocation.getCurrentPosition(
      // Success callback
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setStatus("Location found. Sending SMS... 📤");

        try {
          // 3. CORRECTED API Call: Using port 4000 as specified
          const response = await axios.post("http://localhost:4000/api/send-sms", {
            lat,
            lng,
          });

          // 4. Update status based on API response
          if (response.data.success) {
            setStatus("SMS Sent Successfully! 🚀 Safety contacts notified.");
          } else {
            // Handle specific backend error message
            setStatus("Failed: " + (response.data.message || "Unknown server error."));
          }
        } catch (error) {
          // Handle network or connection errors
          console.error("SMS API Error:", error);
          setStatus("Error: Unable to send SMS or connect to server ❌");
        }
        // 5. End the sending process
        setIsSending(false);
      },
      // Error callback for geolocation failure
      (error) => {
        console.error("Geolocation Error:", error);
        setStatus("Failed to get location ❌. Please check your browser permissions.");
        setIsSending(false);
      },
      // Geolocation options (e.g., enable high accuracy, set timeout)
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
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
        <div className="flex flex-col items-center text-center -mt-20"> 
          
          {/* The SOS Button */}
          <button
            onClick={sendLocationSMS}
            // Use isSending to apply the spinning effect and disable the button
            disabled={isSending} 
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
          >
            {/* Conditional content: Spinner when sending, 'SOS' text otherwise */}
            {isSending ? (
              <svg className="animate-spin h-10 w-10 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'SOS'
            )}
          </button>
          
          {/* Status Message Display */}
          <p className={`mt-20 text-lg font-semibold px-4 max-w-sm ${isSending ? 'text-blue-600' : 'text-gray-700'}`}>
            {status}
          </p>
          
         
        </div>
      </div>
    </>
  );
};

export default SOSButton;