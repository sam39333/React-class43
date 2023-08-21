import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/name");
  };

  return (
    <div className="home-page">
      <div className="logo">
        <span className="logo-text">Todo</span>
        <span className="dot">.</span>
        <span className="logo-text">list</span>
      </div>
      <div className="content">
        <h1 className="app-title">A to-do list you’d actually use.</h1>
        <p className="app-description">
          the to-do list you would actually stick to. Designed to help you get
          organized, achieve your goals, and never forget a thing.
        </p>
        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
      <img
        className="home-image"
        src="https://www.any.do/v4/images/translations/en/to-do-list/main-image@2x.jpg"
        height="762"
        width="457"
        alt="Any.do to-do list app for iPhone"
      />
    </div>
  );
};

export default HomePage;
