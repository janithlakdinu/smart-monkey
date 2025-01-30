import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import logo from "./assets/logo.png";

// Mock user data
const users = [
  { username: "nethra", password: "123456" },
  { username: "monkey", password: "55555" },
];

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check if the username and password are valid
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Navigate to the main app if login is successful
      navigate("/app");
    } else {
      // Show error message if login fails
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <header className="header">
        <img className="logo" src={logo} alt="Smart Monkey Logo" />
      </header>
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Username..."
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password..."
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <p className="sign-up-text">
          <a href="#" className="sign-up-link">
            Sign Up...
          </a>
        </p>
      </div>
      <footer className="footer">
        <h4 className="txt">Smart Monkey Reppelent System</h4>
      </footer>
    </div>
  );
}

export default Login;
