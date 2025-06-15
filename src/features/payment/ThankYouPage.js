import React from "react";
//import FireworksCanvas from "./FireworksCanvas"; // Import the custom fireworks effect
import "./ThankYouPage.css"; // Import CSS for styling
import FireworksCanvas from "./FireworksCanvas";

const ThankYouPage = () => {
  return (
    <div className="thank-you-page">
      {/* Fireworks animation in background */}
      <FireworksCanvas />

      <div className="thank-you-content">
        <h1>🎉 Thank You for Your Payment! 🎉</h1>
        <p>Your order has been successfully processed and is on its way!</p>

        {/* Home Button */}
        <button
          className="home-button"
          onClick={() => (window.location.href = "/")}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;