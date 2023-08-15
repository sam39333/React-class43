
import React from "react";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/name"); 
  };
  

  return (
    <div className="home-page">
      <h1 className="app-title">Todo App</h1>
      
      <p className="app-description">
        Stay organized and efficient.
      </p>
      <button className="get-started-button" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
