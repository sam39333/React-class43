import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userActions";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const NamePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState(""); 

   const registerUser = async (userName, password) => {
     try {
       const response = await fetch("http://localhost:5000/api/register", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ userName, password })
       });

       const data = await response.json();
       console.log(data.message); 
     } catch (error) {
       console.error("Error registering user:", error);
     }
   };

  const handleContinue = async () => {
  
    const hashedPassword = await bcrypt.hash(password, 10);


    dispatch(setUser(userName, hashedPassword));

    registerUser(userName, password);

   
    navigate("/kanban-view");
  };

  return (
    <div className="name-page">
      <h2>Welcome to the Todo App!</h2>
      <p>Please enter your name and password to continue:</p>
      <input
        className="name-input"
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        className="password-input"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="continue-button" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

export default NamePage;
