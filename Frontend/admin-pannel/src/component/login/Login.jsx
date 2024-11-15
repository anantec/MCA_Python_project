// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const loginUser = async (event) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    // Clear previous error message
    setErrorMessage("");

    const apiURL = "http://127.0.0.1:8000/api/login/";

    try {
      // Send POST request to login API
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      // Check if login was successful
      if (response.ok) {
        const data = await response.json();
        alert("Login successful!");

        // Redirect to admin page
        navigate("/admin"); // Use navigate() instead of history.push()
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={loginUser}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <div>
            <button type="submit" className="login-btn">Login</button>
          </div>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
      
      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f7fc;
        }

        .login-form {
          background-color: #fff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        h2 {
          margin-bottom: 20px;
          font-size: 24px;
          color: #333;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          font-size: 14px;
          color: #555;
          margin-bottom: 8px;
        }

        input {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-sizing: border-box;
        }

        input:focus {
          border-color: #007bff;
          outline: none;
        }

        .login-btn {
          width: 100%;
          padding: 14px;
          font-size: 16px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .login-btn:hover {
          background-color: #0056b3;
        }

        .error {
          margin-top: 15px;
          color: red;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}

export default Login;
