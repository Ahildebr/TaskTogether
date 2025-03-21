import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login_user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",  
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const userData = await response.json();
      login_user(userData);  
      navigate("/"); 
    } else {
      alert("Signup failed. Try a different username.");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;